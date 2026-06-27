import type { Quiz } from '@/content/types'

export const ch08Quiz: Quiz = {
  id: 'quiz-ch-08-testing-frontend',
  title: 'Quiz: Testing Frontend',
  passingScore: 8,
  questions: [
    {
      id: 'q-08-01',
      order: 1,
      prompt: 'Menurut testing pyramid, jenis test mana yang sebaiknya paling banyak?',
      options: ['E2E test', 'Integration test', 'Unit test', 'Visual regression test'],
      correctOptionIndex: 2,
      explanation:
        'Testing pyramid menyarankan banyak unit test karena cepat, murah, dan fokus pada bagian kecil kode.',
    },
    {
      id: 'q-08-02',
      order: 2,
      prompt: 'Apa filosofi utama React Testing Library?',
      options: [
        'Menguji struktur internal DOM secara detail',
        'Menguji perilaku aplikasi dari sudut pandang pengguna',
        'Menguji performa rendering',
        'Menggantikan kebutuhan unit test',
      ],
      correctOptionIndex: 1,
      explanation:
        'RTL mendorong pengujian yang mirip dengan cara pengguna berinteraksi, bukan menguji implementasi internal.',
    },
    {
      id: 'q-08-03',
      order: 3,
      prompt: 'Query mana yang memiliki prioritas tertinggi di React Testing Library?',
      options: ['getByTestId', 'getByText', 'getByRole', 'getByTitle'],
      correctOptionIndex: 2,
      explanation:
        'getByRole adalah query paling disarankan karena memastikan elemen memiliki peran aksesibel yang benar.',
    },
    {
      id: 'q-08-04',
      order: 4,
      prompt: 'Apa keunggulan user-event dibanding fireEvent?',
      options: [
        'user-event lebih cepat',
        'user-event mensimulasikan rangkaian interaksi pengguna secara lebih realistis',
        'fireEvent tidak bisa digunakan di React',
        'user-event tidak memerlukan async',
      ],
      correctOptionIndex: 1,
      explanation:
        'user-event mensimulasikan urutan event yang lebih mirip pengguna sungguhan, seperti focus, pointer, dan keyboard events.',
    },
    {
      id: 'q-08-05',
      order: 5,
      prompt: 'Kapan mock paling tepat digunakan dalam test?',
      options: [
        'Untuk menggantikan semua dependency tanpa pengecualian',
        'Untuk mengisolasi unit dari dependency eksternal seperti API atau waktu',
        'Untuk menghindari menulis assertion',
        'Untuk membuat test menjadi E2E',
      ],
      correctOptionIndex: 1,
      explanation:
        'Mock berguna untuk mengontrol dependency eksternal agar test deterministik dan tidak bergantung pada jaringan.',
    },
    {
      id: 'q-08-06',
      order: 6,
      prompt: 'Apa risiko menggunakan terlalu banyak mock dalam test?',
      options: [
        'Test menjadi terlalu cepat',
        'Test mungkin tidak lagi merepresentasikan perilaku nyata aplikasi',
        'Mock otomatis menghilangkan bug',
        'Tidak ada risiko',
      ],
      correctOptionIndex: 1,
      explanation:
        'Mock berlebihan dapat membuat test terlepas dari realitas interaksi antar modul dan melewatkan bug integrasi.',
    },
    {
      id: 'q-08-07',
      order: 7,
      prompt: 'Apa tujuan integration test di frontend?',
      options: [
        'Menguji satu fungsi utilitas',
        'Menguji interaksi beberapa komponen atau modul bersama-sama',
        'Menguji seluruh alur aplikasi di browser nyata',
        'Menggantikan test manual sepenuhnya',
      ],
      correctOptionIndex: 1,
      explanation:
        'Integration test memastikan beberapa bagian aplikasi bekerja sama dengan benar, seperti form dengan validasi dan submission handler.',
    },
    {
      id: 'q-08-08',
      order: 8,
      prompt: 'Mengapa getByTestId sebaiknya menjadi pilihan terakhir?',
      options: [
        'Karena testId tidak stabil',
        'Karena tidak memverifikasi aksesibilitas atau pengalaman pengguna',
        'Karena tidak bisa digunakan untuk button',
        'Karena hanya bekerja di Vitest',
      ],
      correctOptionIndex: 1,
      explanation:
        'getByTestId hanya mengandalkan atribut data-testid yang tidak mencerminkan cara pengguna atau screen reader berinteraksi dengan elemen.',
    },
  ],
}
