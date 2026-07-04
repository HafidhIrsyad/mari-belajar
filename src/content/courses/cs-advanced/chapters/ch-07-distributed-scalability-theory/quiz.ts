import type { Quiz } from '@/content/types'

export const ch07Quiz: Quiz = {
  id: 'quiz-ch-07-distributed-scalability-theory',
  title: 'Quiz: Teori Skalabilitas Terdistribusi',
  passingScore: 8,
  questions: [
    {
      id: 'q-07-01',
      order: 1,
      prompt: 'Little\'s Law menyatakan L = λW, di mana L adalah?',
      options: [
        'Latency maksimum',
        'Jumlah rata-rata item dalam sistem (queue + service)',
        'Service rate',
        'Jumlah server',
      ],
      correctOptionIndex: 1,
      explanation:
        'L = jumlah rata-rata item in-flight; λ = arrival rate; W = waktu tinggal rata-rata (latency).',
    },
    {
      id: 'q-07-02',
      order: 2,
      prompt: 'Dalam model M/M/1, latency meledak ketika?',
      options: [
        'Arrival rate jauh di bawah service rate',
        'Utilization ρ = λ/μ mendekati 1',
        'Hanya ada satu request',
        'Service rate sangat tinggi',
      ],
      correctOptionIndex: 1,
      explanation:
        'W = 1/(μ-λ). Saat λ → μ (ρ → 1), penyebut mendekati nol sehingga latency naik drastis secara non-linear.',
    },
    {
      id: 'q-07-03',
      order: 3,
      prompt: 'Untuk quorum N=5, W=3, R=3, konsistensi read adalah?',
      options: [
        'Eventual karena R+W ≤ N',
        'Strong karena R+W > N (6 > 5)',
        'Tidak ada overlap',
        'Hanya write yang konsisten',
      ],
      correctOptionIndex: 1,
      explanation:
        'R + W = 6 > N = 5 menjamin read quorum overlap dengan write quorum, sehingga read melihat versi terbaru.',
    },
    {
      id: 'q-07-04',
      order: 4,
      prompt: 'Byzantine fault tolerance f node membutuhkan minimal?',
      options: ['2f+1 replika', '3f+1 replika', 'f+1 replika', 'N replika tanpa batas'],
      correctOptionIndex: 1,
      explanation:
        'Lamport et al. membuktikan toleransi f Byzantine fault (node arbitrer) membutuhkan minimal 3f+1 replika.',
    },
    {
      id: 'q-07-05',
      order: 5,
      prompt: 'PACELC memperluas CAP dengan menambahkan trade-off?',
      options: [
        'Security vs Privacy',
        'Latency vs Consistency saat operasi normal (Else)',
        'CPU vs Memory',
        'Read vs Write',
      ],
      correctOptionIndex: 1,
      explanation:
        'PACELC: If Partition → A vs C; Else → Latency vs Consistency. CAP hanya membahas saat partition.',
    },
    {
      id: 'q-07-06',
      order: 6,
      prompt: 'CAP theorem menyatakan sistem terdistribusi dapat menjamin paling banyak?',
      options: [
        'Ketiga: Consistency, Availability, Partition tolerance',
        'Dua dari tiga: C, A, atau P',
        'Hanya satu properti',
        'Empat properti sekaligus',
      ],
      correctOptionIndex: 1,
      explanation:
        'Saat network partition terjadi, sistem harus memilih antara Consistency (CP) atau Availability (AP).',
    },
    {
      id: 'q-07-07',
      order: 7,
      prompt: 'Perbedaan crash fault dan Byzantine fault?',
      options: [
        'Crash fault = node berhenti; Byzantine = node berperilaku arbitrer/malign',
        'Keduanya identik',
        'Byzantine hanya terjadi di blockchain',
        'Crash fault lebih parah dari Byzantine',
      ],
      correctOptionIndex: 0,
      explanation:
        'Crash fault (fail-stop) hanya berhenti merespons. Byzantine fault dapat mengirim data salah atau menyerang koordinasi.',
    },
    {
      id: 'q-07-08',
      order: 8,
      prompt: 'Sloppy quorum dengan hinted handoff digunakan untuk?',
      options: [
        'Meningkatkan konsistensi strong',
        'Menjaga availability saat node replika down dengan menulis ke node pengganti',
        'Menghapus replikasi',
        'Mengurangi jumlah node',
      ],
      correctOptionIndex: 1,
      explanation:
        'Sloppy quorum menulis ke node alternatif saat replika target unavailable; hinted handoff mengembalikan data saat node recovery.',
    },
  ],
}
