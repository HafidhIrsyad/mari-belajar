import type { Quiz } from '@/content/types'

export const ch08Quiz: Quiz = {
  id: 'quiz-ch-08-ethics-frontier-cs',
  title: 'Quiz: Etika dan Frontier CS',
  passingScore: 8,
  questions: [
    {
      id: 'q-08-01',
      order: 1,
      prompt: 'Prinsip ACM Code of Ethics "Avoid harm" berarti?',
      options: [
        'Menghindari semua teknologi baru',
        'Meminimalkan risiko negatif yang dapat diantisipasi dari sistem computing',
        'Tidak perlu dokumentasi risiko',
        'Hanya fokus pada profit',
      ],
      correctOptionIndex: 1,
      explanation:
        'ACM menekankan identifikasi dan mitigasi risiko negatif yang dapat diantisipasi, termasuk dampak pada individu dan masyarakat.',
    },
    {
      id: 'q-08-02',
      order: 2,
      prompt: 'Privacy by Design menekankan privasi?',
      options: [
        'Ditambahkan setelah produk selesai',
        'Diintegrasikan sejak tahap desain sistem',
        'Hanya untuk aplikasi finansial',
        'Tidak perlu enkripsi',
      ],
      correctOptionIndex: 1,
      explanation:
        'PbD (Cavoukian) mengintegrasikan privasi proaktif ke dalam arsitektur, bukan sebagai afterthought pasca-rilis.',
    },
    {
      id: 'q-08-03',
      order: 3,
      prompt: 'GDPR "right to erasure" (Art. 17) memungkinkan subjek data?',
      options: [
        'Mengakses semua data pemerintah',
        'Meminta penghapusan data pribadi dalam kondisi tertentu',
        'Menolak semua regulasi',
        'Mendapatkan source code semua aplikasi',
      ],
      correctOptionIndex: 1,
      explanation:
        'Right to erasure ("right to be forgotten") memungkinkan subjek data meminta penghapusan data pribadi jika tidak ada lawful basis yang sah.',
    },
    {
      id: 'q-08-04',
      order: 4,
      prompt: 'Distribution shift dalam ML merujuk pada?',
      options: [
        'Perubahan distribusi data production vs training',
        'Perpindahan server ke cloud',
        'Perubahan lisensi open-source',
        'Rotasi kunci enkripsi',
      ],
      correctOptionIndex: 0,
      explanation:
        'Distribution shift terjadi saat karakteristik data production berbeda dari training, menyebabkan degradasi performa meskipun akurasi training tinggi.',
    },
    {
      id: 'q-08-05',
      order: 5,
      prompt: 'Algoritma Shor mengancam kriptografi karena?',
      options: [
        'Mempercepat hashing password',
        'Memfaktorkan bilangan besar polinomial → memecahkan RSA/ECC',
        'Meningkatkan keamanan AES',
        'Hanya berlaku untuk blockchain',
      ],
      correctOptionIndex: 1,
      explanation:
        'Shor\'s algorithm memfaktorkan bilangan besar dalam waktu polinomial di komputer kuantum, mengancam RSA dan ECC yang bergantung pada difficulty factoring/discrete log.',
    },
    {
      id: 'q-08-06',
      order: 6,
      prompt: 'Lisensi copyleft (GPL) mengharuskan?',
      options: [
        'Tidak ada restriksi apapun',
        'Karya derivatif juga harus open-source dengan lisensi compatible',
        'Hanya boleh digunakan non-komersial',
        'Tidak boleh dimodifikasi',
      ],
      correctOptionIndex: 1,
      explanation:
        'Copyleft (GPL, AGPL) mensyaratkan karya derivatif didistribusikan dengan lisensi open-source compatible, memastikan kebebasan software terjaga.',
    },
    {
      id: 'q-08-07',
      order: 7,
      prompt: 'NIST post-quantum cryptography (2024) menstandardisasi?',
      options: [
        'RSA-4096 dan ECC',
        'ML-KEM (Kyber), ML-DSA (Dilithium), SLH-DSA (SPHINCS+)',
        'MD5 dan SHA-1',
        'Hanya algoritma simetris',
      ],
      correctOptionIndex: 1,
      explanation:
        'NIST PQC standardizes ML-KEM untuk key encapsulation, ML-DSA untuk signature, dan SLH-DSA sebagai hash-based signature alternatif.',
    },
    {
      id: 'q-08-08',
      order: 8,
      prompt: 'Responsible disclosure dalam open-source berarti?',
      options: [
        'Langsung publikasikan vulnerability di Twitter',
        'Laporkan ke maintainer secara privat, beri waktu patch sebelum publik',
        'Tidak perlu melaporkan vulnerability',
        'Hanya laporkan ke media',
      ],
      correctOptionIndex: 1,
      explanation:
        'Responsible disclosure: reporter memberi maintainer waktu memperbaiki (embargo) sebelum detail vulnerability dipublikasikan, melindungi user.',
    },
  ],
}
