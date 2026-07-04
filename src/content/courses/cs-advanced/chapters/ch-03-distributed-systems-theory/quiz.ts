import type { Quiz } from '@/content/types'

export const ch03Quiz: Quiz = {
  id: 'quiz-ch-03-distributed-systems-theory',
  title: 'Quiz: Distributed Systems Theory',
  passingScore: 8,
  questions: [
    {
      id: 'q-03-01',
      order: 1,
      prompt: 'Salah satu fallacy of distributed computing menyatakan bahwa?',
      options: [
        'Bandwidth jaringan tak terbatas',
        'Jaringan aman dan tidak pernah gagal',
        'Latency jaringan nol',
        'Semua pernyataan di atas adalah fallacy yang umum',
      ],
      correctOptionIndex: 3,
      explanation:
        'Delapan fallacies termasuk: network reliable, latency zero, bandwidth infinite, network secure, topology tidak berubah, satu admin, transport cost zero, internet homogen.',
    },
    {
      id: 'q-03-02',
      order: 2,
      prompt: 'Linearizability menjamin bahwa?',
      options: [
        'Semua node selalu available meski partisi',
        'Setiap operasi terlihat atomic dan berurutan sesuai urutan real-time',
        'Data selalu eventual consistent tanpa batas waktu',
        'Tidak ada replikasi sama sekali',
      ],
      correctOptionIndex: 1,
      explanation:
        'Linearizability (strong consistency) memastikan operasi concurrent terlihat seolah-olah dieksekusi secara atomic dalam urutan yang konsisten dengan real-time ordering.',
    },
    {
      id: 'q-03-03',
      order: 3,
      prompt: 'Menurut CAP theorem, saat network partition terjadi sistem harus?',
      options: [
        'Memilih antara Consistency dan Availability',
        'Menolak semua request',
        'Otomatis heal tanpa trade-off',
        'Hanya meningkatkan bandwidth',
      ],
      correctOptionIndex: 0,
      explanation:
        'Partition tolerance wajib di sistem terdistribusi. Saat partisi, sistem tidak bisa menjamin C dan A bersamaan — harus memilih salah satu.',
    },
    {
      id: 'q-03-04',
      order: 4,
      prompt: 'PACELC memperluas CAP dengan menambahkan trade-off?',
      options: [
        'Consistency vs Latency saat normal (Else)',
        'Security vs Privacy',
        'CPU vs Memory',
        'Read vs Write saja',
      ],
      correctOptionIndex: 0,
      explanation:
        'PACELC: if Partition then Availability vs Consistency; Else Latency vs Consistency. Saat tidak ada partisi, sistem tetap trade-off latency dan consistency.',
    },
    {
      id: 'q-03-05',
      order: 5,
      prompt: 'Dalam Raft, node yang memimpin replikasi log disebut?',
      options: ['Follower', 'Leader', 'Candidate only', 'Observer'],
      correctOptionIndex: 1,
      explanation:
        'Raft memiliki tiga role: Leader (menerima client request, replikasi log), Follower (passive, vote), Candidate (saat election). Hanya Leader yang commit entry baru.',
    },
    {
      id: 'q-03-06',
      order: 6,
      prompt: 'Vector clock digunakan untuk?',
      options: [
        'Mengompresi data di disk',
        'Menentung causal ordering event di sistem terdistribusi tanpa clock sinkron',
        'Mengganti algoritma scheduling CPU',
        'Enkripsi end-to-end',
      ],
      correctOptionIndex: 1,
      explanation:
        'Vector clock melacak happened-before relation antar event di node berbeda. Setiap node punya counter; update saat send/receive event.',
    },
    {
      id: 'q-03-07',
      order: 7,
      prompt: 'Hasil FLP impossibility menyatakan?',
      options: [
        'Consensus selalu mudah di async system',
        'Tidak ada deterministic consensus algorithm yang guaranteed terminate di fully asynchronous system',
        'Raft melanggar teorema CAP',
        'Vector clock menggantikan semua consensus',
      ],
      correctOptionIndex: 1,
      explanation:
        'Fischer-Lynch-Paterson (1985) membuktikan bahwa di async system (tanpa bound on message delay), consensus deterministik tidak bisa guaranteed terminate.',
    },
    {
      id: 'q-03-08',
      order: 8,
      prompt: 'Eventual consistency cocok untuk?',
      options: [
        'Transfer bank yang harus atomic real-time',
        'Social media feed, DNS, dan cache di mana staleness sementara dapat diterima',
        'Distributed lock tanpa timeout',
        'Single-node database saja',
      ],
      correctOptionIndex: 1,
      explanation:
        'Eventual consistency memungkinkan replikasi dengan latency rendah; konvergensi terjadi setelah periode tanpa write. Cocok untuk use case toleran staleness.',
    },
  ],
}
