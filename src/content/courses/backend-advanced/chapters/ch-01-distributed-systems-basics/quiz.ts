import type { Quiz } from '@/content/types'

export const ch01Quiz: Quiz = {
  id: 'quiz-ch-01-distributed-systems-basics',
  title: 'Quiz: Distributed Systems Basics',
  passingScore: 8,
  questions: [
    {
      id: 'q-01-01',
      order: 1,
      prompt: 'Apa kelemahan utama arsitektur microservices dibanding monolith?',
      options: [
        'Tidak bisa di-deploy secara independen',
        'Menambah kompleksitas jaringan, latency, dan partial failure',
        'Tidak memungkinkan penggunaan database terpisah',
        'Tidak mendukung skala horizontal',
      ],
      correctOptionIndex: 1,
      explanation:
        'Microservices memberikan autonomy tetapi memperkenalkan remote call, latency, kegagalan parsial, dan konsistensi data antar service.',
    },
    {
      id: 'q-01-02',
      order: 2,
      prompt: 'Menurut teorema CAP, pada saat terjadi partisi sistem harus memilih antara?',
      options: [
        'Consistency dan availability',
        'Partition tolerance dan latency',
        'Scalability dan reliability',
        'Durability dan isolation',
      ],
      correctOptionIndex: 0,
      explanation:
        'Saat partisi jaringan terjadi, distributed data store harus memilih antara consistency (CP) atau availability (AP) karena keduanya tidak dapat dijamin bersamaan.',
    },
    {
      id: 'q-01-03',
      order: 3,
      prompt: 'Apa arti eventual consistency?',
      options: [
        'Data selalu konsisten setiap saat',
        'Jika tidak ada update baru, replika akhirnya akan mencapai nilai yang sama',
        'Setiap read harus mengembalikan data tertulis terakhir atau error',
        'Transaksi dijamin ACID di semua node',
      ],
      correctOptionIndex: 1,
      explanation:
        'Eventual consistency menjamin konvergensi replika setelah jeda waktu, tidak menjamin konsistensi kuat pada setiap read.',
    },
    {
      id: 'q-01-04',
      order: 4,
      prompt: 'Fallacy mana yang mengingatkan kita bahwa network latency tidak dapat diabaikan?',
      options: [
        'Bandwidth is infinite',
        'Latency is zero',
        'Topology does not change',
        'Transport cost is zero',
      ],
      correctOptionIndex: 1,
      explanation:
        'Fallacy latency is zero menyebabkan desainer membuat terlalu banyak remote call seolah-olah panggilan lokal.',
    },
    {
      id: 'q-01-05',
      order: 5,
      prompt: 'Service boundary yang baik ditandai dengan?',
      options: [
        'Setiap service mengakses database service lain secara langsung',
        'Kohesi tinggi, coupling rendah, dan data yang dimiliki sendiri',
        'Semua service berbagi satu schema database besar',
        'Service sekecil mungkin tanpa memperhatikan domain',
      ],
      correctOptionIndex: 1,
      explanation:
        'Boundary yang baik memiliki tanggung jawab jelas, coupling rendah antar service, dan mengenkapsulasi data sendiri.',
    },
    {
      id: 'q-01-06',
      order: 6,
      prompt: 'Apa fungsi utama service discovery?',
      options: [
        'Menyimpan cache hasil query',
        'Membantu service menemukan lokasi instance lain secara dinamis',
        'Menggantikan load balancer',
        'Mengenkripsi semua komunikasi antar service',
      ],
      correctOptionIndex: 1,
      explanation:
        'Service discovery menyediakan registry alamat instance sehingga caller tidak perlu hardcode URL.',
    },
    {
      id: 'q-01-07',
      order: 7,
      prompt: 'Algoritma load balancing mana yang berguna untuk menjaga locality cache?',
      options: ['Round-robin', 'Least connections', 'Consistent hashing', 'Random'],
      correctOptionIndex: 2,
      explanation:
        'Consistent hashing mengarahkan request dengan key sama ke instance yang sama, sehingga cache lokal lebih efektif.',
    },
    {
      id: 'q-01-08',
      order: 8,
      prompt: 'Mengapa remote call harus selalu memiliki timeout?',
      options: [
        'Agar response selalu lebih cepat dari local call',
        'Mencegah caller menunggu selamanya saat network atau service gagal',
        'Agar load balancer tidak perlu dipakai',
        'Menghilangkan kebutuhan retry',
      ],
      correctOptionIndex: 1,
      explanation:
        'Timeout membatasi durasi tunggu dan mencegah cascade failure akibat resource yang terus terikat pada panggilan yang tidak pernah kembali.',
    },
  ],
}
