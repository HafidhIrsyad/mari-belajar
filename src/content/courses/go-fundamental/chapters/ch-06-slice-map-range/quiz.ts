import type { Quiz } from '@/content/types'

export const ch06Quiz: Quiz = {
  id: 'quiz-ch-06-slice-map-range',
  title: 'Quiz: Slice, Map & Range',
  passingScore: 8,
  questions: [
    {
      id: 'q-06-01',
      order: 1,
      prompt: 'Apa perbedaan utama array dan slice di Go?',
      options: [
        'Array memiliki ukuran tetap, slice adalah view dinamis ke backing array',
        'Array dinamis, slice memiliki ukuran tetap',
        'Array hanya bisa menyimpan string, slice menyimpan angka',
        'Tidak ada perbedaan',
      ],
      correctOptionIndex: 0,
      explanation:
        'Array memiliki ukuran yang menjadi bagian dari tipenya. Slice adalah struktur dinamis yang mereferensi backing array.',
    },
    {
      id: 'q-06-02',
      order: 2,
      prompt: 'Apa saja komponen slice header di Go?',
      options: [
        'Pointer ke data, length, dan capacity',
        'Key, value, dan hash',
        'Type, value, dan interface',
        'Header, body, dan footer',
      ],
      correctOptionIndex: 0,
      explanation:
        'Slice header terdiri dari pointer ke backing array (Data), length (Len), dan capacity (Cap).',
    },
    {
      id: 'q-06-03',
      order: 3,
      prompt: 'Apa yang terjadi saat append melebihi capacity?',
      options: [
        'Go mengalokasikan backing array baru dan menyalin elemen',
        'Program panic',
        'Elemen terakhir ditimpa',
        'Slice dihapus',
      ],
      correctOptionIndex: 0,
      explanation:
        'Jika append membutuhkan ruang lebih besar dari capacity, Go mengalokasikan backing array baru dengan kapasitas lebih besar.',
    },
    {
      id: 'q-06-04',
      order: 4,
      prompt: 'Bagaimana membuat slice yang tidak berbagi backing array?',
      options: [
        'Gunakan make atau copy',
        'Gunakan assignment biasa',
        'Gunakan slicing',
        'Gunakan append kosong',
      ],
      correctOptionIndex: 0,
      explanation:
        'make membuat slice baru dengan backing array baru. copy menyalin elemen ke slice tujuan yang dialokasikan terpisah.',
    },
    {
      id: 'q-06-05',
      order: 5,
      prompt: 'Apa kegunaan two-value lookup pada map?',
      options: [
        'Membedakan key tidak ada dengan key bernilai zero value',
        'Mendapatkan panjang map',
        'Menghapus key dari map',
        'Mengkonversi map ke slice',
      ],
      correctOptionIndex: 0,
      explanation:
        'Two-value lookup mengembalikan value dan boolean ok yang menandakan apakah key benar-benar ada.',
    },
    {
      id: 'q-06-06',
      order: 6,
      prompt: 'Apa yang benar tentang range pada map di Go?',
      options: [
        'Urutan iterasi tidak menentu',
        'Selalu terurut berdasarkan key',
        'Selalu terurut berdasarkan value',
        'Hanya mengiterasi key',
      ],
      correctOptionIndex: 0,
      explanation:
        'Map di Go tidak terurut. Urutan iterasi range pada map tidak menentu dan bahkan dirandomized di beberapa versi.',
    },
    {
      id: 'q-06-07',
      order: 7,
      prompt: 'Bagaimana cara memodifikasi elemen slice asli saat range?',
      options: [
        'Gunakan indeks, seperti for i := range slice { slice[i] = ... }',
        'Gunakan value dari range secara langsung',
        'Tidak bisa dimodifikasi',
        'Gunakan append di dalam range',
      ],
      correctOptionIndex: 0,
      explanation:
        'Value dari range adalah salinan. Untuk mengubah elemen asli, akses melalui indeks slice.',
    },
    {
      id: 'q-06-08',
      order: 8,
      prompt: 'Struktur data apa yang digunakan untuk implementasi map di Go?',
      options: [
        'Hash table dengan bucket',
        'Binary search tree',
        'Linked list',
        'Array terurut',
      ],
      correctOptionIndex: 0,
      explanation:
        'Map di Go diimplementasikan sebagai hash table dengan array bucket dan overflow bucket.',
    },
  ],
}
