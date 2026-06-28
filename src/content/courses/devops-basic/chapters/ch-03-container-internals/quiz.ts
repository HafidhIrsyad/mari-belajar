import type { Quiz } from '@/content/types'

export const ch03Quiz: Quiz = {
  id: 'quiz-ch-03-container-internals',
  title: 'Quiz: Container Internals',
  passingScore: 8,
  questions: [
    {
      id: 'q-03-01',
      order: 1,
      prompt: 'Perbedaan utama container dan virtual machine adalah?',
      options: [
        'Container menyimulasikan hardware; VM berbagi kernel host',
        'Container berbagi kernel host; VM memiliki kernel sendiri',
        'Container selalu lebih lambat dari VM',
        'Container tidak memiliki filesystem sendiri',
      ],
      correctOptionIndex: 1,
      explanation:
        'Container menggunakan isolasi OS-level dan berbagi kernel host, sementara VM menjalankan kernel sendiri di atas hypervisor.',
    },
    {
      id: 'q-03-02',
      order: 2,
      prompt: 'Komponen OverlayFS mana yang berisi perubahan writable dari container?',
      options: ['Lowerdir', 'Merged', 'Upperdir', 'Workdir'],
      correctOptionIndex: 2,
      explanation:
        'Upperdir adalah layer writable tempat semua perubahan container disimpan; lowerdir bersifat read-only.',
    },
    {
      id: 'q-03-03',
      order: 3,
      prompt: 'Namespace Linux apa yang mengisolasi process ID sehingga container memiliki PID 1 sendiri?',
      options: ['NET namespace', 'PID namespace', 'MNT namespace', 'IPC namespace'],
      correctOptionIndex: 1,
      explanation:
        'PID namespace mengisolasi ruang process ID sehingga container melihat process-nya sendiri dimulai dari PID 1.',
    },
    {
      id: 'q-03-04',
      order: 4,
      prompt: 'cgroups digunakan untuk?',
      options: [
        'Mengisolasi pandangan process terhadap sistem',
        'Membatasi dan mengukur penggunaan resource seperti CPU dan memory',
        'Mengenkripsi filesystem container',
        'Menyediakan network virtual untuk container',
      ],
      correctOptionIndex: 1,
      explanation:
        'cgroups (control groups) membatasi dan mengukur penggunaan resource; namespaces mengisolasi pandangan.',
    },
    {
      id: 'q-03-05',
      order: 5,
      prompt: 'Dalam ekosistem Docker modern, komponen mana yang bertugas menjalankan container dari OCI bundle?',
      options: ['Docker Engine', 'containerd', 'runC', 'Kubernetes kubelet'],
      correctOptionIndex: 2,
      explanation:
        'runC adalah OCI runtime yang membuat dan menjalankan container dari bundle; containerd mengelola lifecycle dan image.',
    },
    {
      id: 'q-03-06',
      order: 6,
      prompt: 'Apa fungsi dari copy-on-write dalam OverlayFS?',
      options: [
        'Menyalin seluruh image layer saat container dibuat',
        'Menyalin file dari lowerdir ke upperdir hanya saat file akan dimodifikasi',
        'Menghapus file secara otomatis setelah container berhenti',
        'Mengompresi layer image untuk menghemat ruang',
      ],
      correctOptionIndex: 1,
      explanation:
        'Copy-on-write memastikan file dari layer read-only tidak diubah; salinan dibuat di upperdir saat modifikasi diperlukan.',
    },
    {
      id: 'q-03-07',
      order: 7,
      prompt: 'seccomp digunakan untuk?',
      options: [
        'Membatasi penggunaan CPU container',
        'Memfilter system call yang dapat dipanggil process',
        'Mengisolasi network antar container',
        'Mengatur permission file di filesystem',
      ],
      correctOptionIndex: 1,
      explanation:
        'seccomp (secure computing mode) memfilter syscall yang diizinkan, mengurangi attack surface container.',
    },
    {
      id: 'q-03-08',
      order: 8,
      prompt: 'Apa keuntungan menggunakan image base minimal seperti distroless atau alpine?',
      options: [
        'Meningkatkan jumlah layer agar cache lebih banyak',
        'Mengurangi attack surface dan ukuran image',
        'Menghapus kebutuhan akan namespace',
        'Memungkinkan container berbagi kernel dengan aplikasi lain',
      ],
      correctOptionIndex: 1,
      explanation:
        'Image base minimal mengurangi ukuran image dan jumlah komponen yang dapat dieksploitasi, meningkatkan keamanan.',
    },
  ],
}
