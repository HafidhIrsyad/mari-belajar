import type { Lesson } from '@/content/types'

export const ch05Lesson: Lesson = {
  id: 'lesson-ch-05-infrastructure-as-code',
  estimatedMinutes: 45,
  sections: [
    {
      id: 'sec-05-basic-iac',
      type: 'markdown',
      level: 'basic',
      title: 'Pengantar Infrastructure as Code',
      content: `## Apa itu Infrastructure as Code?

Infrastructure as Code (IaC) adalah praktik mengelola dan menyediakan infrastruktur melalui file definisi, bukan melalui proses manual di konsol cloud. File tersebut dapat disimpan di version control, direview, dan diuji.

## Mengapa IaC?

- **Reproducibility**: infrastruktur dapat dibuat ulang dengan hasil yang sama.
- **Version control**: setiap perubahan tercatat dan dapat dirollback.
- **Collaboration**: tim dapat mereview perubahan infrastruktur seperti mereview kode.
- **Auditability**: jejak perubahan infrastruktur jelas.
- **Scalability**: satu definisi dapat dipakai untuk banyak environment.

## Deklaratif vs Imperatif

**Imperatif** menentukan *bagaimana* mencapai hasil. Contoh: script shell yang menjalankan perintah satu per satu untuk menginstal Nginx.

**Deklaratif** menentukan *apa* yang diinginkan. Contoh: file Terraform yang menyatakan "saya ingin ada VM dengan 2 vCPU dan 4 GiB RAM". Tool IaC yang menangani langkah-langkahnya.

## Idempotensi

Operasi idempoten dapat dijalankan berkali-kali dan menghasilkan hasil yang sama. Jika resource sudah ada, tool IaC tidak akan membuat duplikat. Jika ada perbedaan, tool akan menyesuaikan agar sesuai desired state.

## Contoh Konsep Dasar

Desired state:

\`\`\`yaml
server:
  count: 3
  instance_type: t3.medium
  image: ubuntu-22.04
\`\`\`

Tool IaC akan memastikan jumlah server yang berjalan tepat tiga. Jika hanya dua, satu server baru akan dibuat. Jika ada empat, satu akan dihapus.`,
    },
    {
      id: 'sec-05-js-example',
      type: 'code-example',
      codeExample: {
        id: 'code-05-js',
        filename: 'iac-comparison.js',
        language: 'javascript',
        title: 'JavaScript: Deklaratif vs Imperatif',
        code: `// Imperatif: langkah demi langkah
function ensureServersImperative(desiredCount, currentServers) {
  while (currentServers.length < desiredCount) {
    currentServers.push({ id: crypto.randomUUID(), status: 'running' })
  }
  while (currentServers.length > desiredCount) {
    const removed = currentServers.pop()
    console.log('Menghapus server', removed.id)
  }
  return currentServers
}

// Deklaratif: hanya mendeskripsikan desired state
const desiredState = {
  servers: { count: 3, instanceType: 't3.medium' },
}

const current = [{ id: 's1' }, { id: 's2' }]
ensureServersImperative(desiredState.servers.count, current)
console.log('Total server:', current.length)`,
        explanation:
          'Pendekatan imperatif secara eksplisit menambah atau menghapus server. Tool IaC deklaratif menyembunyikan logika ini dan hanya membandingkan desired state dengan current state.',
      },
    },
    {
      id: 'sec-05-intermediate-terraform',
      type: 'markdown',
      level: 'intermediate',
      title: 'Terraform: Provider, Resource, State, Plan, Apply',
      content: `## Terraform Overview

Terraform adalah tool IaC deklaratif dari HashiCorp. Ia mendukung banyak cloud provider melalui plugin yang disebut provider.

## Komponen Utama

- **Provider**: plugin untuk berinteraksi dengan API cloud seperti AWS, Azure, GCP, Kubernetes.
- **Resource**: komponen infrastruktur yang ingin dikelola, misalnya VM, database, bucket, VPC.
- **Data source**: membaca informasi dari infrastruktur yang sudah ada.
- **Module**: grup resource yang dapat digunakan kembali.
- **State**: file yang mencatat mapping antara konfigurasi Terraform dan resource nyata.

## Siklus Kerja Terraform

1. \`terraform init\`: mengunduh provider dan modul.
2. \`terraform plan\`: membandingkan desired state dengan current state, menampilkan perubahan yang akan dilakukan.
3. \`terraform apply\`: menerapkan perubahan ke provider.
4. \`terraform destroy\`: menghapus semua resource yang dikelola.

## State File

Terraform menyimpan state di \`terraform.tfstate\`. State berisi:

- ID resource di cloud.
- Atribut resource saat ini.
- Dependency graph antar resource.

State file sangat penting dan sensitif. Jika hilang, Terraform tidak tahu resource mana yang sudah dibuat. Gunakan remote state seperti S3, GCS, atau Terraform Cloud.

## HCL

HashiCorp Configuration Language (HCL) adalah bahasa konfigurasi Terraform. Contoh:

\`\`\`hcl
resource "aws_instance" "web" {
  ami           = "ami-12345678"
  instance_type = "t3.micro"

  tags = {
    Name = "web-server"
  }
}
\`\`\`

## Dependency Graph

Terraform membangun graph dependensi antar resource. Jika resource A bergantung pada resource B, Terraform akan membuat B terlebih dahulu. Implicit dependency dibuat melalui referensi atribut, sementara explicit dependency menggunakan \`depends_on\`.`,
    },
    {
      id: 'sec-05-ts-example',
      type: 'code-example',
      codeExample: {
        id: 'code-05-ts',
        filename: 'resource-graph.ts',
        language: 'typescript',
        title: 'TypeScript: Graph Dependensi Resource',
        code: `interface Resource {
  id: string
  type: string
  name: string
  dependsOn: string[]
}

function topologicalSort(resources: Resource[]): Resource[] {
  const sorted: Resource[] = []
  const visited = new Set<string>()
  const temp = new Set<string>()
  const map = new Map(resources.map((r) => [r.id, r]))

  function visit(resource: Resource) {
    if (temp.has(resource.id)) {
      throw new Error(\`Siklus dependensi terdeteksi di \${resource.id}\`)
    }
    if (visited.has(resource.id)) return

    temp.add(resource.id)
    for (const depId of resource.dependsOn) {
      const dep = map.get(depId)
      if (!dep) throw new Error(\`Dependensi tidak ditemukan: \${depId}\`)
      visit(dep)
    }
    temp.delete(resource.id)
    visited.add(resource.id)
    sorted.push(resource)
  }

  for (const resource of resources) {
    visit(resource)
  }

  return sorted
}

const resources: Resource[] = [
  { id: 'vpc', type: 'aws_vpc', name: 'main', dependsOn: [] },
  { id: 'subnet', type: 'aws_subnet', name: 'public', dependsOn: ['vpc'] },
  { id: 'instance', type: 'aws_instance', name: 'web', dependsOn: ['subnet'] },
]

const order = topologicalSort(resources)
console.log('Urutan pembuatan:', order.map((r) => r.name).join(' → '))`,
        explanation:
          'Terraform menggunakan topological sort untuk menentukan urutan pembuatan resource berdasarkan dependensi. Resource tanpa dependensi dibuat terlebih dahulu.',
      },
    },
    {
      id: 'sec-05-advanced-terraform-state',
      type: 'markdown',
      level: 'advanced',
      title: 'Terraform State Internals, Remote State, dan Drift Detection',
      content: `## Terraform State Internals

State file disimpan sebagai JSON dan berisi:

- \`version\`: format state.
- \`terraform_version\`: versi Terraform yang terakhir mengelola state.
- \`serial\`: nomor urut perubahan state untuk mencegah overwrite.
- \`resources\`: daftar resource beserta atribut dan \`instances\`.

Setiap resource instance memiliki \`index_key\` dan \`attributes\`. Terraform menggunakan \`schema_version\` untuk menangani migrasi atribut saat provider berubah.

## Remote State

Remote state menyimpan state di lokasi terpusat:

- **Amazon S3** dengan DynamoDB locking.
- **Google Cloud Storage**.
- **Azure Blob Storage**.
- **Terraform Cloud / Enterprise**.

Remote state memungkinkan kolaborasi tim dan mencegah konflik melalui state locking. Tanpa locking, dua operator dapat apply bersamaan dan merusak state.

## State Locking

State locking memastikan hanya satu \`terraform apply\` yang berjalan pada satu waktu. Jika apply gagal, lock dapat tertinggal dan perlu dibersihkan secara manual.

## Drift Detection

Drift terjadi ketika resource diubah di luar Terraform (misalnya melalui konsol cloud). \`terraform plan\` mendeteksi drift dengan membandingkan state dengan actual resource. Jika ditemukan perbedaan, Terraform menampilkan perubahan yang diperlukan untuk kembali ke desired state.

## Terraform Import

\`terraform import\` memasukkan resource yang sudah ada ke dalam state tanpa membuat resource baru. Ini berguna saat migrasi dari setup manual ke IaC.

## Modules dan Registry

Module adalah unit reusable. Module dapat dipanggil dari local path, Git, atau Terraform Registry. Menggunakan module:

- Mengurangi duplikasi.
- Menyederhanakan konfigurasi kompleks.
- Memungkinkan tim berbagi pola infrastruktur.

## Workspace dan Environment Separation

Terraform workspace memungkinkan satu konfigurasi digunakan untuk banyak environment dengan state terpisah. Alternatifnya, gunakan directory terpisah per environment dengan remote state backend yang berbeda.

## Testing dan Policy

- \`terraform validate\`: memeriksa sintaks dan tipe.
- \`terraform plan\`: preview perubahan.
- Sentinel / OPA: policy as code untuk membatasi resource yang boleh dibuat.
- Terratest: framework pengujian infrastruktur dengan Go.`,
    },
    {
      id: 'sec-05-go-example',
      type: 'code-example',
      codeExample: {
        id: 'code-05-go',
        filename: 'state-diff.go',
        language: 'go',
        title: 'Go: Perbandingan Desired State dan Current State',
        code: `package main

import (
	"fmt"
	"reflect"
)

type Server struct {
	ID           string
	InstanceType string
	Count        int
	Tags         map[string]string
}

func computeDiff(desired, current Server) map[string][2]interface{} {
	diff := make(map[string][2]interface{})
	dv := reflect.ValueOf(desired)
	cv := reflect.ValueOf(current)

	for i := 0; i < dv.NumField(); i++ {
		fieldName := dv.Type().Field(i).Name
		if !reflect.DeepEqual(dv.Field(i).Interface(), cv.Field(i).Interface()) {
			diff[fieldName] = [2]interface{}{
				dv.Field(i).Interface(),
				cv.Field(i).Interface(),
			}
		}
	}
	return diff
}

func main() {
	desired := Server{InstanceType: "t3.medium", Count: 3, Tags: map[string]string{"env": "prod"}}
	current := Server{ID: "i-abc", InstanceType: "t3.small", Count: 2, Tags: map[string]string{"env": "prod"}}

	diff := computeDiff(desired, current)
	for field, values := range diff {
		fmt.Printf("%s: %v -> %v\\n", field, values[1], values[0])
	}
}`,
        explanation:
          'Fungsi ini membandingkan desired state dengan current state. Hasilnya menunjukkan field mana yang perlu diubah, mirip dengan output terraform plan.',
      },
    },
    {
      id: 'sec-05-summary',
      type: 'callout',
      calloutType: 'info',
      content:
        '**Kesimpulan:** IaC mengubah infrastruktur menjadi kode yang dapat diverifikasi. Memahami deklaratif vs imperatif, idempotensi, state, remote state locking, drift detection, dan modul memungkinkan tim mengelola infrastruktur skala besar dengan aman dan kolaboratif.',
    },
  ],
}
