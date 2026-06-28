import type { Quiz } from '@/content/types'

export const ch05Quiz: Quiz = {
  id: 'quiz-ch-05-infrastructure-as-code',
  title: 'Quiz: Infrastructure as Code',
  passingScore: 8,
  questions: [
    {
      id: 'q-05-01',
      order: 1,
      prompt: 'Apa perbedaan utama pendekatan deklaratif dan imperatif dalam IaC?',
      options: [
        'Deklaratif lebih cepat; imperatif lebih aman',
        'Deklaratif mendeskripsikan desired state; imperatif mendeskripsikan langkah-langkah',
        'Deklaratif hanya untuk cloud; imperatif hanya untuk on-premise',
        'Deklaratif tidak memerlukan tool; imperatif memerlukan tool',
      ],
      correctOptionIndex: 1,
      explanation:
        'Pendekatan deklaratif fokus pada apa yang diinginkan; imperatif fokus pada bagaimana mencapainya.',
    },
    {
      id: 'q-05-02',
      order: 2,
      prompt: 'Apa yang dimaksud dengan idempotensi dalam IaC?',
      options: [
        'Setiap apply selalu membuat resource baru',
        'Apply yang sama menghasilkan state yang konsisten tanpa duplikat',
        'State file selalu dihapus setelah apply',
        'Provider selalu diunduh ulang setiap kali',
      ],
      correctOptionIndex: 1,
      explanation:
        'Idempotensi memastikan tool IaC tidak membuat duplikat; jika state sudah sesuai, tidak ada perubahan yang dilakukan.',
    },
    {
      id: 'q-05-03',
      order: 3,
      prompt: 'File Terraform apa yang menyimpan mapping konfigurasi ke resource nyata di cloud?',
      options: ['main.tf', 'terraform.tfstate', 'provider.tf', 'variables.tf'],
      correctOptionIndex: 1,
      explanation:
        'terraform.tfstate adalah state file yang berisi ID resource dan atribut saat ini.',
    },
    {
      id: 'q-05-04',
      order: 4,
      prompt: 'Mengapa remote state lebih disarankan untuk kolaborasi tim?',
      options: [
        'Karena tidak memerlukan backend',
        'Karena mendukung state locking dan dapat diakses banyak anggota tim',
        'Karena otomatis menghapus resource lama',
        'Karena lebih cepat daripada local state',
      ],
      correctOptionIndex: 1,
      explanation:
        'Remote state dengan locking mencegah konflik saat banyak anggota tim menjalankan apply bersamaan.',
    },
    {
      id: 'q-05-05',
      order: 5,
      prompt: 'Perintah Terraform mana yang menampilkan perubahan sebelum diterapkan?',
      options: ['terraform init', 'terraform plan', 'terraform apply', 'terraform destroy'],
      correctOptionIndex: 1,
      explanation:
        'terraform plan membandingkan desired state dengan current state dan menampilkan preview perubahan.',
    },
    {
      id: 'q-05-06',
      order: 6,
      prompt: 'Apa itu drift detection?',
      options: [
        'Proses mengunduh provider terbaru',
        'Deteksi perbedaan antara state Terraform dan kondisi resource aktual di cloud',
        'Pengecekan siklus dependensi antar modul',
        'Validasi sintaks file HCL',
      ],
      correctOptionIndex: 1,
      explanation:
        'Drift detection menemukan perubahan manual pada infrastruktur yang menyimpang dari desired state.',
    },
    {
      id: 'q-05-07',
      order: 7,
      prompt: 'Apa kegunaan module dalam Terraform?',
      options: [
        'Mengunci state agar tidak bisa diubah',
        'Membuat konfigurasi reusable dan mengurangi duplikasi',
        'Menghapus resource secara otomatis',
        'Menggantikan kebutuhan provider',
      ],
      correctOptionIndex: 1,
      explanation:
        'Module mengelompokkan resource menjadi unit reusable yang dapat dipanggil dari berbagai konfigurasi.',
    },
    {
      id: 'q-05-08',
      order: 8,
      prompt: 'Manfaat menyimpan definisi infrastruktur di version control?',
      options: [
        'Menghapus kebutuhan akan state file',
        'Review, audit, dan rollback perubahan infrastruktur seperti kode aplikasi',
        'Meningkatkan kecepatan apply secara otomatis',
        'Menghindari penggunaan provider sama sekali',
      ],
      correctOptionIndex: 1,
      explanation:
        'Version control memberikan jejak perubahan, mekanisme review, dan kemampuan rollback untuk infrastruktur.',
    },
  ],
}
