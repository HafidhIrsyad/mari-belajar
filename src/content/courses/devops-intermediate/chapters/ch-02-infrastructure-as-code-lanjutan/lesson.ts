import type { Lesson } from '@/content/types'

export const ch02InfrastructureAsCodeLanjutanLesson: Lesson = {
  id: "lesson-ch-02-infrastructure-as-code-lanjutan",
  estimatedMinutes: 50,
  sections: [
    {
      id: "sec-02-basic-terraform-modules",
      type: 'markdown',
      level: "basic",
      title: "Module, Variables, dan Outputs Terraform",
      content: "## Module Terraform\n\nModule adalah unit reusable yang mengelompokkan resource terkait. Module dapat dipanggil oleh konfigurasi lain menggunakan block `module`. Struktur yang baik memisahkan module umum (networking, database, compute) dari konfigurasi environment (dev, staging, prod).\n\n## Variables dan Outputs\n\n- **Variables**: input ke module. Didefinisikan dengan block `variable`, dapat memiliki tipe, default, validasi, dan deskripsi.\n- **Outputs**: nilai yang diekspos oleh module, seperti endpoint database atau ID VPC. Outputs memungkinkan komposisi antar module.\n\n## Provider dan Version Constraint\n\nSetiap resource bergantung pada provider seperti `aws`, `google`, atau `azurerm`. Version constraint memastikan kompatibilitas dan mencegah perubahan breaking secara tidak sengaja. Gunakan `required_providers` untuk mengunci versi provider.\n\n## Prinsip DRY\n\nDon't Repeat Yourself berarti setiap pola infrastruktur yang berulang dipindahkan ke module. Perubahan pada module dapat dipropagasikan ke semua consumer setelah upgrade versi module.",
    },
    {
      id: "sec-02-js-example",
      type: 'code-example',
      codeExample: {
        id: "code-02-js",
        filename: "infra-graph.js",
        language: "javascript",
        title: "JavaScript: Simulasi Dependency Graph Infrastruktur",
        code: "const resources = [\n  { id: 'vpc', dependsOn: [] },\n  { id: 'subnet', dependsOn: ['vpc'] },\n  { id: 'db', dependsOn: ['subnet'] },\n  { id: 'app', dependsOn: ['db', 'subnet'] },\n]\n\nfunction topoSort(nodes) {\n  const visited = new Set()\n  const result = []\n  function visit(id) {\n    if (visited.has(id)) return\n    const node = nodes.find((n) => n.id === id)\n    for (const dep of node.dependsOn) visit(dep)\n    visited.add(id)\n    result.push(id)\n  }\n  for (const node of nodes) visit(node.id)\n  return result\n}\n\nconsole.log('Urutan provisioning:', topoSort(resources).join(' -> '))",
        explanation: "Terraform membangun dependency graph secara internal sebelum apply. Simulasi ini menunjukkan topological sort, algoritma yang menentukan urutan pembuatan resource agar dependency terpenuhi.",
      },
    },
    {
      id: "sec-02-intermediate-state",
      type: 'markdown',
      level: "intermediate",
      title: "State Management, Remote Backend, dan Workspaces",
      content: "## State File\n\nTerraform menyimpan mapping antara nama resource di kode dengan ID resource nyata di cloud di dalam file state (`terraform.tfstate`). State file juga menyimpan output, dependency, dan metadata. State harus diperlakukan sebagai sensitive karena dapat berisi password atau ARN.\n\n## Remote Backend\n\nMenyimpan state di lokasi terpusat seperti AWS S3, Google Cloud Storage, atau Terraform Cloud. Remote backend memungkinkan kolaborasi karena banyak engineer dapat mengakses state yang sama.\n\n## State Locking\n\nLocking mencegah dua proses apply berjalan bersamaan dan merusak state. AWS DynamoDB, Google Cloud Storage native locking, atau Terraform Cloud menyediakan mekanisme locking. Jika lock tertinggal, gunakan `terraform force-unlock` dengan hati-hati.\n\n## Workspaces\n\nWorkspaces memisahkan state untuk environment yang berbeda (dev/staging/prod) dalam satu konfigurasi. Namun, untuk isolasi yang kuat, banyak tim lebih memilih struktur direktori terpisah dengan backend terpisah.\n\n## Plan/Apply Workflow\n\n- `terraform plan`: menampilkan perubahan yang akan terjadi tanpa menerapkannya.\n- `terraform apply`: menerapkan perubahan setelah konfirmasi.\n- Gunakan plan dalam CI/CD untuk review otomatis sebelum apply manual atau otomatis.",
    },
    {
      id: "sec-02-ts-example",
      type: 'code-example',
      codeExample: {
        id: "code-02-ts",
        filename: "terraform-variables.ts",
        language: "typescript",
        title: "TypeScript: Validasi Terraform Variable Definitions",
        code: "type InstanceType = 't3.micro' | 't3.small' | 't3.medium'\n\ninterface TerraformVariable<T> {\n  name: string\n  type: string\n  description: string\n  default?: T\n  validation?: (value: T) => string[]\n}\n\nconst instanceTypeVar: TerraformVariable<InstanceType> = {\n  name: 'instance_type',\n  type: 'string',\n  description: 'Tipe EC2 instance untuk aplikasi',\n  default: 't3.micro',\n  validation: (value) => {\n    const allowed: InstanceType[] = ['t3.micro', 't3.small', 't3.medium']\n    return allowed.includes(value) ? [] : [`${value} bukan instance type yang diizinkan`]\n  },\n}\n\nfunction validateVar<T>(v: TerraformVariable<T>, input: T): string[] {\n  return v.validation ? v.validation(input) : []\n}\n\nconsole.log(validateVar(instanceTypeVar, 't3.large'))\nconsole.log(validateVar(instanceTypeVar, 't3.small'))",
        explanation: "Wrapper TypeScript ini mereplika validasi variable Terraform. Tipe eksplisit dan fungsi validasi membantu mencegah input yang tidak sesuai kebijakan sebelum masuk ke pipeline apply.",
      },
    },
    {
      id: "sec-02-advanced-policy",
      type: 'markdown',
      level: "advanced",
      title: "Policy as Code, Drift Detection, dan Testing IaC",
      content: "## Policy as Code\n\nSetiap perubahan infrastruktur harus mematuhi kebijakan organisasi. Policy as code mengekspresikan kebijakan dalam bahasa yang dapat dievaluasi otomatis:\n\n- **HashiCorp Sentinel**: policy framework untuk Terraform Cloud/Enterprise.\n- **Open Policy Agent (OPA)**: mesin policy universal dengan bahasa Rego. Dapat mengevaluasi plan Terraform JSON.\n\nContoh kebijakan: semua S3 bucket harus encrypted, semua security group harus membatasi port 22, semua resource harus punya tag `Environment`.\n\n## Drift Detection\n\nDrift terjadi ketika seseorang mengubah resource langsung melalui console atau CLI cloud, sehingga state tidak lagi mencerminkan realitas. Terraform mendeteksi drift saat `terraform plan` berikutnya. Tool seperti Terraform Cloud drift detection atau Spacelift dapat menjadwalkan pemeriksaan drift.\n\n## Testing IaC\n\nTiga tingkat pengujian:\n\n1. **Static analysis**: `terraform validate`, `terraform fmt`, linting dengan tflint.\n2. **Unit/integration test**: Terratest atau terraform-compliance menjalankan plan dan memverifikasi output.\n3. **End-to-end test**: deploy ke environment sementara dan jalankan smoke test.\n\n## State File Internals\n\nState adalah JSON yang berisi version, serial, lineage, resources dengan atribut `mode`, `type`, `name`, `provider`, dan `instances`. Terraform menghitung diff antara state dan konfigurasi untuk menentukan create, update, destroy.\n\n## Partial Apply dan Dependency Graph\n\nTerraform membangun directed acyclic graph (DAG) dari resource dan provider. Apply dapat diparalelkan untuk resource independen, sementara resource bergantung menunggu dependency selesai. `-target` memungkinkan apply parsial untuk emergency, tetapi sebaiknya dihindari karena menyebabkan state parsial.",
    },
    {
      id: "sec-02-go-example",
      type: 'code-example',
      codeExample: {
        id: "code-02-go",
        filename: "plan-policy.go",
        language: "go",
        title: "Go: Evaluasi Policy pada Terraform Plan JSON",
        code: "package main\n\nimport (\n\t\"encoding/json\"\n\t\"fmt\"\n\t\"os\"\n)\n\nfunc main() {\n\tplanJSON := `{\n\t\t\"resource_changes\": [\n\t\t\t{\"address\": \"aws_s3_bucket.data\", \"change\": {\"after\": {\"bucket\": \"data-bucket\", \"acl\": \"private\"}}},\n\t\t\t{\"address\": \"aws_security_group.web\", \"change\": {\"after\": {\"ingress\": [{\"from_port\": 22, \"cidr_blocks\": [\"0.0.0.0/0\"\"}]}}}\n\t\t]\n\t}`\n\n\tvar plan map[string]interface{}\n\tif err := json.Unmarshal([]byte(planJSON), &plan); err != nil {\n\t\tfmt.Fprintln(os.Stderr, err)\n\t\treturn\n\t}\n\n\tfor _, rc := range plan[\"resource_changes\"].([]interface{}) {\n\t\tfmt.Println(\"Checking\", rc.(map[string]interface{})[\"address\"])\n\t}\n\n\tfmt.Println(\"Policy check selesai\")\n}",
        explanation: "Terraform plan dapat diekspor sebagai JSON dan dievaluasi oleh policy engine. Contoh Go ini menunjukkan parsing plan untuk inspeksi atribut seperti ACL bucket atau aturan security group.",
      },
    },
    {
      id: "sec-02-summary",
      type: 'callout',
      calloutType: "info",
      content: "**Kesimpulan:** IaC lanjutan tidak berhenti di module dan variable. Remote state, locking, policy as code, drift detection, dan pengujian bertingkat memastikan infrastruktur skala besar tetap aman, konsisten, dan dapat diaudit.",
    },
  ],
}
