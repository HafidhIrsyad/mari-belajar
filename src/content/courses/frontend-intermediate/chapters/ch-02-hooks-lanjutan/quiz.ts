import type { Quiz } from '@/content/types'

export const ch02Quiz: Quiz = {
  id: 'quiz-ch-02-hooks-lanjutan',
  title: 'Quiz: Hooks Lanjutan',
  passingScore: 8,
  questions: [
    {
      id: 'q-02-01',
      order: 1,
      prompt: 'Mengapa hooks tidak boleh dipanggil di dalam kondisi atau loop?',
      options: [
        'Karena hooks lambat jika dipanggil banyak kali',
        'Karena React mengidentifikasi hooks berdasarkan urutan pemanggilan',
        'Karena hooks hanya boleh dipanggil sekali',
        'Karena compiler JSX melarangnya',
      ],
      correctOptionIndex: 1,
      explanation:
        'React menggunakan array internal yang diindeks berdasarkan urutan pemanggilan hooks. Kondisi atau loop dapat mengubah urutan tersebut dan menyebabkan state tertukar.',
    },
    {
      id: 'q-02-02',
      order: 2,
      prompt: 'Apa keuntungan functional update pada useState seperti setCount((c) => c + 1)?',
      options: [
        'Mengurangi jumlah render',
        'Memastikan updater beroperasi pada nilai state terbaru',
        'Membuat state dapat diakses dari komponen lain',
        'Menghapus dependency array',
      ],
      correctOptionIndex: 1,
      explanation:
        'Functional update menerima nilai state terbaru, sehingga aman dari race condition dan stale closure saat beberapa update dikelompokkan.',
    },
    {
      id: 'q-02-03',
      order: 3,
      prompt: 'Apa yang dimaksud dengan stale closure di React?',
      options: [
        'Closure yang tidak pernah dibuat',
        'Closure yang menangkap nilai lama dari scope saat fungsi didefinisikan',
        'Closure yang menghasilkan memory leak',
        'Closure yang hanya ada pada class component',
      ],
      correctOptionIndex: 1,
      explanation:
        'Stale closure terjadi ketika fungsi callback menggunakan nilai props atau state lama karena dependency array tidak menyertakan value yang berubah.',
    },
    {
      id: 'q-02-04',
      order: 4,
      prompt: 'Kapan sebaiknya menggunakan useRef dibandingkan useState?',
      options: [
        'Ketika nilai perlu memicu re-render saat berubah',
        'Ketika nilai mutable tidak perlu memicu re-render',
        'Ketika ingin berbagi state antar komponen',
        'Ketika ingin menghindari side effect',
      ],
      correctOptionIndex: 1,
      explanation:
        'useRef menyimpan nilai mutable yang persisten antar render tetapi tidak memicu re-render saat nilai berubah.',
    },
    {
      id: 'q-02-05',
      order: 5,
      prompt: 'Apa perbedaan utama useMemo dan useCallback?',
      options: [
        'useMemo untuk fungsi, useCallback untuk nilai',
        'useMemo menyimpan nilai komputasi, useCallback menyimpan definisi fungsi',
        'useMemo hanya boleh digunakan di custom hooks',
        'Tidak ada perbedaan, keduanya sama',
      ],
      correctOptionIndex: 1,
      explanation:
        'useMemo meng-cache hasil komputasi, sedangkan useCallback meng-cache referensi fungsi sehingga tidak dibuat ulang setiap render.',
    },
    {
      id: 'q-02-06',
      order: 6,
      prompt: 'Mengapa useEffect dengan dependency array kosong bisa menimbulkan bug?',
      options: [
        'Karena efek tidak pernah dijalankan',
        'Karena efek hanya berjalan saat unmount',
        'Karena efek mungkin membaca nilai state/props yang sudah usang',
        'Karena React melarang dependency array kosong',
      ],
      correctOptionIndex: 2,
      explanation:
        'Dependency array kosong menyebabkan efek hanya menggunakan nilai yang ditangkap saat mount. Jika efek membaca state/props, nilai tersebut bisa menjadi stale.',
    },
    {
      id: 'q-02-07',
      order: 7,
      prompt: 'Apa keuntungan menggunakan useReducer untuk state kompleks?',
      options: [
        'State otomatis persist ke localStorage',
        'Transisi state terpusat dan reducer mudah diuji sebagai pure function',
        'Reducer menghilangkan kebutuhan useEffect',
        'useReducer lebih cepat daripada useState',
      ],
      correctOptionIndex: 1,
      explanation:
        'useReducer memusatkan logika transisi state di reducer. Karena reducer pure, ia mudah diuji tanpa perlu merender komponen.',
    },
    {
      id: 'q-02-08',
      order: 8,
      prompt: 'Apa syarat nama sebuah custom hooks di React?',
      options: [
        'Harus berakhiran Hook',
        'Harus diawali dengan use',
        'Harus menerima minimal satu parameter',
        'Harus mengembalikan array',
      ],
      correctOptionIndex: 1,
      explanation:
        'Konvensi React mengharuskan custom hooks diawali dengan use agar linter dan developer dapat mengenalinya sebagai hook.',
    },
  ],
}
