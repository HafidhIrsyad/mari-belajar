import type { Lesson } from '@/content/types'

export const ch03Lesson: Lesson = {
  id: 'lesson-ch-03-container-internals',
  estimatedMinutes: 50,
  sections: [
    {
      id: 'sec-03-basic-containers',
      type: 'markdown',
      level: 'basic',
      title: 'Container vs Virtual Machine',
      content: `## Apa itu Container?

Container adalah unit perangkat lunak yang mengemas kode aplikasi beserta dependencies sehingga dapat berjalan konsisten di berbagai environment. Container berbagi kernel sistem operasi host, tetapi memiliki filesystem, process tree, dan network yang terisolasi.

## Container vs Virtual Machine

| Aspek | Container | Virtual Machine |
|-------|-----------|-----------------|
| Isolasi | OS-level (namespace, cgroups) | Hardware-level (hypervisor) |
| Kernel | Berbagi kernel host | Setiap VM memiliki kernel sendiri |
| Ukuran | Ringan (MB) | Berat (GB) |
| Startup | Detik | Menit |
| Overhead | Rendah | Tinggi |

## Image dan Layer

Image container adalah template read-only untuk membuat container. Image tersusun dari layer-layer yang masing-masing merepresentasikan instruksi Dockerfile seperti \`FROM\`, \`RUN\`, \`COPY\`, dan \`ADD\`. Layer yang sama dapat digunakan bersama oleh banyak image, menghemat ruang penyimpanan.

## Container Layer

Ketika container berjalan, Docker menambahkan thin writable layer di atas image layer. Semua perubahan container (file baru, modifikasi, penghapusan) terjadi di writable layer ini. Saat container dihapus, writable layer ikut hilang kecuali data disimpan di volume.

## Perintah Dasar Docker

- \`docker build -t <nama>:<tag> .\`: membuat image dari Dockerfile.
- \`docker run -d -p 8080:80 <image>\`: menjalankan container di background dengan port mapping.
- \`docker ps\`: melihat container yang berjalan.
- \`docker exec -it <container> sh\`: masuk ke shell container.
- \`docker images\`: melihat daftar image lokal.
- \`docker rmi <image>\`: menghapus image.

## Dockerfile Best Practices

- Gunakan image base minimal (distroless, alpine, slim).
- Gabungkan perintah \`RUN\` untuk mengurangi layer.
- Letakkan instruksi yang jarang berubah di atas dan yang sering berubah di bawah untuk memaksimalkan cache.
- Hindari menjalankan container sebagai root jika memungkinkan.`,
    },
    {
      id: 'sec-03-js-example',
      type: 'code-example',
      codeExample: {
        id: 'code-03-js',
        filename: 'layer-stack.js',
        language: 'javascript',
        title: 'JavaScript: Simulasi Layer Stack Container',
        code: `const imageLayers = [
  { id: 'base', files: { '/etc/os-release': 'alpine', '/bin/sh': 'ELF' } },
  { id: 'deps', files: { '/app/package.json': '{"deps":{}}' } },
  { id: 'source', files: { '/app/index.js': 'console.log("halo")' } },
]

function createWritableLayer(imageLayers) {
  const merged = {}
  for (const layer of imageLayers) {
    Object.assign(merged, layer.files)
  }
  return { readonly: structuredClone(merged), writes: {} }
}

function readFile(layerStack, path) {
  if (path in layerStack.writes) {
    return layerStack.writes[path]
  }
  return layerStack.readonly[path]
}

function writeFile(layerStack, path, content) {
  layerStack.writes[path] = content
}

const containerLayer = createWritableLayer(imageLayers)
console.log('Sebelum modifikasi:', readFile(containerLayer, '/app/index.js'))
writeFile(containerLayer, '/app/index.js', 'console.log("dari container")')
console.log('Setelah modifikasi:', readFile(containerLayer, '/app/index.js'))
console.log('Writable layer hanya berisi:', Object.keys(containerLayer.writes))`,
        explanation:
          'Simulasi ini menunjukkan cara OverlayFS bekerja: image layer tetap read-only, sedangkan perubahan hanya terjadi di writable layer. Saat membaca file, sistem mencari di writable layer terlebih dahulu.',
      },
    },
    {
      id: 'sec-03-intermediate-namespaces-cgroups',
      type: 'markdown',
      level: 'intermediate',
      title: 'Linux Namespaces dan cgroups',
      content: `## Linux Namespaces

Namespaces membatasi apa yang dapat dilihat process. Ada tujuh namespace utama:

1. **PID namespace**: process ID terisolasi; process dengan PID 1 di dalam container adalah aplikasi utama.
2. **NET namespace**: interface network, routing table, dan firewall terpisah.
3. **MNT namespace**: mount point filesystem terisolasi.
4. **UTS namespace**: hostname dan domain name terpisah.
5. **IPC namespace**: shared memory dan message queue terisolasi.
6. **USER namespace**: UID/GID di dalam container dapat dipetakan ke UID/GID berbeda di host.
7. **CGROUP namespace** (Linux 4.6+): menyembunyikan informasi cgroup path di host.

Namespace tidak membatasi resource, hanya mengisolasi pandangan.

## cgroups

Control groups (cgroups) membatasi dan mengukur penggunaan resource. cgroups v1 memisahkan controller per-subsystem, sedangkan cgroups v2 menggunakan unified hierarchy.

Resource yang dapat dibatasi:

- **CPU**: \`cpu.shares\`, \`cpu.cfs_quota_us\`, \`cpu.cfs_period_us\`.
- **Memory**: \`memory.limit_in_bytes\`, \`memory.swappiness\`.
- **Block I/O**: \`blkio.throttle.read_bps_device\`.
- **PIDs**: \`pids.max\` untuk membatasi jumlah process.

Docker menerjemahkan flag \`--memory\` dan \`--cpus\` ke konfigurasi cgroup.

## OverlayFS

OverlayFS adalah filesystem union yang menggabungkan beberapa directory menjadi satu view. Komponennya:

- **Lowerdir**: layer read-only, biasanya image layer. Dapat lebih dari satu.
- **Upperdir**: layer writable tempat perubahan container.
- **Workdir**: directory kerja internal OverlayFS.
- **Merged**: view gabungan yang dilihat container.

Saat container menulis file, file baru dibuat di upperdir. Saat container mengubah file dari lowerdir, file tersebut di-copy ke upperdir (copy-on-write) sebelum dimodifikasi. Penghapusan file ditandai dengan whiteout file khusus.

## Container Runtime

Runtime bertanggung jawab membuat dan menjalankan container. Docker awalnya menggunakan runC, runtime reference implementation Open Container Initiative (OCI). Sekarang Docker menggunakan containerd sebagai high-level runtime yang mengatur image, storage, dan network, lalu mendelegasikan eksekusi ke runC.`,
    },
    {
      id: 'sec-03-ts-example',
      type: 'code-example',
      codeExample: {
        id: 'code-03-ts',
        filename: 'namespace-model.ts',
        language: 'typescript',
        title: 'TypeScript: Model Namespaces dan Resource Limits',
        code: `type NamespaceType = 'pid' | 'net' | 'mnt' | 'uts' | 'ipc' | 'user' | 'cgroup'

interface ResourceLimits {
  cpuCores?: number
  memoryBytes?: number
  pidsMax?: number
  blockReadBps?: number
}

interface ContainerSpec {
  namespaces: NamespaceType[]
  rootfs: string
  command: string[]
  limits: ResourceLimits
}

function validateSpec(spec: ContainerSpec): string[] {
  const errors: string[] = []
  if (!spec.namespaces.includes('pid')) {
    errors.push('PID namespace wajib ada untuk menghindari exposure process host')
  }
  if (!spec.namespaces.includes('mnt')) {
    errors.push('MNT namespace wajib ada untuk isolasi filesystem')
  }
  if ((spec.limits.memoryBytes ?? 0) < 4 * 1024 * 1024) {
    errors.push('Memory limit minimal 4 MiB')
  }
  return errors
}

const spec: ContainerSpec = {
  namespaces: ['pid', 'net', 'mnt', 'uts', 'ipc', 'user'],
  rootfs: '/var/lib/containers/webapp',
  command: ['node', 'server.js'],
  limits: { cpuCores: 0.5, memoryBytes: 128 * 1024 * 1024, pidsMax: 100 },
}

console.log('Validation:', validateSpec(spec))`,
        explanation:
          'Model ini merepresentasikan spesifikasi container: namespaces untuk isolasi dan resource limits untuk pembatasan. Validasi memastikan isolasi minimal dan memory limit yang masuk akal.',
      },
    },
    {
      id: 'sec-03-advanced-runtime',
      type: 'markdown',
      level: 'advanced',
      title: 'Runc, containerd, OCI, dan Keamanan Container',
      content: `## Open Container Initiative (OCI)

OCI adalah standar industri untuk format image (OCI Image Specification) dan runtime (OCI Runtime Specification). OCI runtime spec mendefinisikan:

- Bundle: directory yang berisi \`config.json\` dan \`rootfs\`.
- Config: namespace, cgroups, capabilities, seccomp, mounts, dan environment.
- Lifecycle: create, start, kill, delete.

## runC

runC adalah reference implementation OCI runtime. runC tidak mengelola image, network, atau volume; ia hanya membuat container dari bundle yang sudah disiapkan. Command umum:

- \`runc create <id>\`: membuat container.
- \`runc start <id>\`: menjalankan process user di container.
- \`runc kill <id>\`: mengirim sinyal ke container.
- \`runc delete <id>\`: menghapus container.

## containerd

containerd adalah high-level container runtime yang mengelola:

- Pull dan push image.
- Storage dan snapshot (OverlayFS).
- Network setup melalui CNI plugins.
- Membuat OCI bundle dan memanggil runC.

Docker Engine, Kubernetes, dan tool lain menggunakan containerd sebagai runtime layer.

## Linux Capabilities

Capabilities memecah hak root menjadi unit yang lebih kecil. Container biasanya dijalankan dengan subset capabilities, misalnya tidak memiliki \`CAP_SYS_ADMIN\` atau \`CAP_NET_ADMIN\`. Docker default men-drop banyak capabilities untuk mengurangi attack surface.

## seccomp

seccomp (secure computing mode) memfilter system call yang dapat dipanggil process. Docker profile default memblokir sekitar 44 syscall berbahaya. Custom profile dapat lebih ketat.

## AppArmor dan SELinux

Mandatory Access Control (MAC) seperti AppArmor atau SELinux menambahkan kebijakan keamanan tambahan di atas Unix permission. Mereka membatasi resource apa yang dapat diakses process bahkan jika process tersebut berjalan sebagai root di dalam container.

## Container Image Internals

OCI image terdiri dari:

- **Manifest**: daftar layer dan konfigurasi.
- **Config**: metadata container seperti command, env, exposed ports.
- **Layers**: file tar gzip yang masing-masing merepresentasikan perubahan filesystem.
- **Index** (multi-arch): memetakan platform ke manifest yang sesuai.

Image di registry diidentifikasi oleh digest SHA-256 dari manifest, memungkinkan content-addressable pull.`,
    },
    {
      id: 'sec-03-go-example',
      type: 'code-example',
      codeExample: {
        id: 'code-03-go',
        filename: 'cgroups-limit.go',
        language: 'go',
        title: 'Go: Membatasi Resource dengan cgroups v2',
        code: `package main

import (
	"fmt"
	"os"
	"path/filepath"
	"strconv"
)

const cgroupRoot = "/sys/fs/cgroup"

func limitMemory(cgroupName string, bytes int64) error {
	cgroupPath := filepath.Join(cgroupRoot, cgroupName)
	if err := os.MkdirAll(cgroupPath, 0o755); err != nil {
		return err
	}

	limitPath := filepath.Join(cgroupPath, "memory.max")
	if err := os.WriteFile(limitPath, []byte(strconv.FormatInt(bytes, 10)), 0o644); err != nil {
		return fmt.Errorf("gagal menulis memory.max: %w", err)
	}

	procsPath := filepath.Join(cgroupPath, "cgroup.procs")
	pid := strconv.Itoa(os.Getpid())
	if err := os.WriteFile(procsPath, []byte(pid+"\\n"), 0o644); err != nil {
		return fmt.Errorf("gagal mendaftarkan PID: %w", err)
	}

	return nil
}

func main() {
	if err := limitMemory("devops-demo", 64*1024*1024); err != nil {
		fmt.Println("Error:", err)
		os.Exit(1)
	}
	fmt.Println("PID berhasil dibatasi memory-nya ke 64 MiB")
}`,
        explanation:
          'Program ini menunjukkan prinsip cgroups v2: membuat cgroup, menulis memory.max, dan memindahkan process saat ini ke cgroup. Di production, runtime container menangani langkah ini secara otomatis.',
      },
    },
    {
      id: 'sec-03-summary',
      type: 'callout',
      calloutType: 'info',
      content:
        '**Kesimpulan:** Container adalah kombinasi isolasi namespace, pembatasan cgroups, dan filesystem OverlayFS. Memahami runC, containerd, OCI spec, dan lapisan keamanan tambahan membantu mengoptimalkan image, mendiagnosis masalah runtime, dan merancang workload yang aman.',
    },
  ],
}
