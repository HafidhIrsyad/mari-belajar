import type { Quiz } from '@/content/types'

export const ch08Quiz: Quiz = {
  id: 'quiz-ch-08-devops-culture-collaboration',
  title: 'Quiz: DevOps Culture & Collaboration',
  passingScore: 8,
  questions: [
    {
      id: 'q-08-01',
      order: 1,
      prompt: 'Apa lima pilar framework CALMS dalam DevOps?',
      options: [
        'Code, Automation, Lean, Metrics, Security',
        'Culture, Automation, Lean, Measurement, Sharing',
        'Cloud, Agile, Lean, Monitoring, Scaling',
        'Collaboration, Audit, Lean, Measurement, Standards',
      ],
      correctOptionIndex: 1,
      explanation:
        'CALMS adalah Culture, Automation, Lean, Measurement, Sharing.',
    },
    {
      id: 'q-08-02',
      order: 2,
      prompt: 'Prinsip utama blameless postmortem adalah?',
      options: [
        'Menentukan siapa yang bertanggung jawab atas insiden',
        'Fokus pada sistem dan improvement, bukan menyalahkan individu',
        'Mengabaikan kegagalan kecil agar tidak membuang waktu',
        'Hanya dilakukan untuk insiden dengan downtime lebih dari satu jam',
      ],
      correctOptionIndex: 1,
      explanation:
        'Blameless postmortem bertujuan belajar dari kegagalan sistem dan menentukan action items, bukan mencari kambing hitam.',
    },
    {
      id: 'q-08-03',
      order: 3,
      prompt: 'Apa yang dimaksud dengan toil dalam konteks SRE?',
      options: [
        'Pekerjaan kreatif yang memerlukan inovasi',
        'Pekerjaan manual berulang yang harus diminimalkan melalui otomasi',
        'Kegiatan pelatihan untuk engineer baru',
        'Bagian dari blameless postmortem',
      ],
      correctOptionIndex: 1,
      explanation:
        'Toil adalah pekerjaan manual, berulang, dan dapat diautomasi yang tidak menambah nilai jangka panjang.',
    },
    {
      id: 'q-08-04',
      order: 4,
      prompt: 'Platform engineering bertujuan untuk?',
      options: [
        'Menggantikan seluruh tim development',
        'Membangun platform self-service yang meningkatkan productivity developer',
        'Menghentikan semua deployment manual',
        'Mengurangi jumlah tim di organisasi',
      ],
      correctOptionIndex: 1,
      explanation:
        'Platform engineering membangun platform internal yang mengurangi cognitive load dan memungkinkan developer self-service.',
    },
    {
      id: 'q-08-05',
      order: 5,
      prompt: 'Manakah yang BUKAN termasuk empat DORA metrics?',
      options: [
        'Deployment Frequency',
        'Lead Time for Changes',
        'Code Review Duration',
        'Time to Restore Service',
      ],
      correctOptionIndex: 2,
      explanation:
        'Empat DORA metrics adalah Deployment Frequency, Lead Time for Changes, Change Failure Rate, dan Time to Restore Service.',
    },
    {
      id: 'q-08-06',
      order: 6,
      prompt: 'Shift-left berarti?',
      options: [
        'Menunda testing hingga tahap production',
        'Memindahkan aktivitas seperti testing dan security ke awal siklus pengembangan',
        'Mengurangi frekuensi deployment',
        'Memindahkan tim operations ke lokasi fisik yang berbeda',
      ],
      correctOptionIndex: 1,
      explanation:
        'Shift-left menempatkan testing, security, dan observability lebih awal untuk menemukan masalah sebelum mahal memperbaikinya.',
    },
    {
      id: 'q-08-07',
      order: 7,
      prompt: 'Apa tujuan value stream mapping?',
      options: [
        'Memetakan infrastruktur cloud secara visual',
        'Mengidentifikasi langkah yang menambah nilai dan waste dalam proses pengiriman',
        'Membuat diagram arsitektur microservices',
        'Menentukan gaji anggota tim',
      ],
      correctOptionIndex: 1,
      explanation:
        'Value stream mapping membantu tim melihat bottleneck dan waste sehingga dapat mengurangi lead time.',
    },
    {
      id: 'q-08-08',
      order: 8,
      prompt: 'Team Topologies merekomendasikan tim platform untuk?',
      options: [
        'Mengerjakan fitur bisnis utama',
        'Membangun internal platform yang digunakan tim lain sebagai layanan',
        'Mengawasi semua keputusan teknis perusahaan',
        'Menangani semua insiden sendirian',
      ],
      correctOptionIndex: 1,
      explanation:
        'Platform team memperlakukan platform sebagai produk dan developer sebagai customer, menyediakan self-service infrastructure.',
    },
  ],
}
