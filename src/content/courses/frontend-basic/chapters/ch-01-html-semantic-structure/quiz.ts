import type { Quiz } from '@/content/types'

export const ch01Quiz: Quiz = {
  id: 'quiz-ch-01-html-semantic-structure',
  title: 'Quiz: HTML Semantic & Structure',
  passingScore: 8,
  questions: [
    {
      id: 'q-01-01',
      order: 1,
      prompt: 'Elemen HTML manakah yang seharusnya digunakan sekali per halaman untuk konten utama?',
      options: ['<main>', '<section>', '<article>', '<div>'],
      correctOptionIndex: 0,
      explanation:
        'Elemen <main> merepresentasikan konten utama halaman dan hanya boleh muncul satu kali per dokumen, tanpa bersarang di dalam landmark lain.',
    },
    {
      id: 'q-01-02',
      order: 2,
      prompt: 'Tag semantik apa yang paling tepat untuk blok tautan navigasi utama?',
      options: ['<header>', '<nav>', '<aside>', '<footer>'],
      correctOptionIndex: 1,
      explanation:
        '<nav> adalah tag yang ditujukan untuk kumpulan tautan navigasi. Menggunakannya membuat landmark navigation muncul di accessibility tree.',
    },
    {
      id: 'q-01-03',
      order: 3,
      prompt: 'Mengapa hierarki heading yang logis penting?',
      options: [
        'Agar browser menggambar teks lebih cepat',
        'Agar outline dokumen mudah dipahami screen reader dan mesin pencari',
        'Agar CSS otomatis teraplikasi tanpa selector',
        'Agar JavaScript dapat membaca heading lebih dulu',
      ],
      correctOptionIndex: 1,
      explanation:
        'Heading membentuk outline dokumen. Hierarki yang logis membantu teknologi assistif menavigasi dan mesin pencari memahami struktur konten.',
    },
    {
      id: 'q-01-04',
      order: 4,
      prompt: 'Apa fungsi atribut alt pada elemen <img>?',
      options: [
        'Mengubah ukuran gambar secara responsif',
        'Menyediakan teks alternatif yang menjelaskan fungsi gambar',
        'Menentukan urutan pemuatan gambar',
        'Menambahkan animasi saat gambar dimuat',
      ],
      correctOptionIndex: 1,
      explanation:
        'Atribut alt memberikan deskripsi teks gambar yang dibaca screen reader atau ditampilkan saat gambar gagal dimuat.',
    },
    {
      id: 'q-01-05',
      order: 5,
      prompt: 'Meta tag Open Graph manakah yang menyetel gambar pratinjau saat halaman dibagikan?',
      options: [
        '<meta property="og:title" />',
        '<meta property="og:description" />',
        '<meta property="og:image" />',
        '<meta name="twitter:card" />',
      ],
      correctOptionIndex: 2,
      explanation:
        'og:image menunjukkan URL gambar yang akan digunakan sebagai pratinjau saat link dibagikan di media sosial.',
    },
    {
      id: 'q-01-06',
      order: 6,
      prompt: 'Accessibility tree dibangun dari elemen semantik dan atribut ARIA. Apa yang paling mengurangi kebutuhan ARIA?',
      options: [
        'Menggunakan HTML semantik yang benar',
        'Menambahkan banyak class CSS',
        'Menghindari elemen <div> sama sekali',
        'Memuat JavaScript di akhir body',
      ],
      correctOptionIndex: 0,
      explanation:
        'HTML semantik sudah menyediakan peran bawaan, sehingga seringkali tidak perlu menambahkan atribut ARIA yang berlebihan.',
    },
    {
      id: 'q-01-07',
      order: 7,
      prompt: 'Elemen <address> paling tepat digunakan untuk?',
      options: [
        'Alamat pengiriman barang dalam e-commerce',
        'Informasi kontak terkait artikel atau halaman',
        'Menandai lokasi pada peta',
        'Menyimpan alamat IP pengguna',
      ],
      correctOptionIndex: 1,
      explanation:
        '<address> ditujukan untuk informasi kontak penulis atau pemilik dokumen/artikel, bukan alamat fisik sembarang.',
    },
    {
      id: 'q-01-08',
      order: 8,
      prompt: 'Manakah contoh penggunaan landmark region yang benar?',
      options: [
        '<div class="nav">',
        '<nav aria-label="Navigasi utama">',
        '<span role="main">',
        '<section class="content"> tanpa heading atau label',
      ],
      correctOptionIndex: 1,
      explanation:
        '<nav> secara otomatis menjadi landmark navigation. aria-label membantu membedakannya jika terdapat beberapa blok nav.',
    },
  ],
}
