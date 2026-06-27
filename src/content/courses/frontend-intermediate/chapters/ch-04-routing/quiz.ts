import type { Quiz } from '@/content/types'

export const ch04Quiz: Quiz = {
  id: 'quiz-ch-04-routing',
  title: 'Quiz: Routing',
  passingScore: 8,
  questions: [
    {
      id: 'q-04-01',
      order: 1,
      prompt: 'Komponen apa yang digunakan React Router untuk merender child route di dalam layout?',
      options: ['Route', 'Outlet', 'Switch', 'Link'],
      correctOptionIndex: 1,
      explanation:
        'Outlet adalah placeholder di parent route tempat child route yang cocok akan dirender.',
    },
    {
      id: 'q-04-02',
      order: 2,
      prompt: 'Hook mana yang digunakan untuk membaca parameter dinamis URL seperti /products/:id?',
      options: ['useNavigate', 'useParams', 'useSearchParams', 'useLocation'],
      correctOptionIndex: 1,
      explanation:
        'useParams mengembalikan objek berisi nilai parameter dinamis dari URL saat ini.',
    },
    {
      id: 'q-04-03',
      order: 3,
      prompt: 'Apa perbedaan Link dan NavLink?',
      options: [
        'Link untuk external URL, NavLink untuk internal',
        'NavLink dapat menambahkan style/class aktif saat URL cocok',
        'Link hanya bisa digunakan di class component',
        'Tidak ada perbedaan',
      ],
      correctOptionIndex: 1,
      explanation:
        'NavLink menyediakan informasi isActive sehingga cocok untuk menu navigasi yang perlu menyorot halaman aktif.',
    },
    {
      id: 'q-04-04',
      order: 4,
      prompt: 'Bagaimana cara mengarahkan pengguna secara programatis di React Router v6?',
      options: ['window.location.href', 'useNavigate', 'history.push', 'useParams'],
      correctOptionIndex: 1,
      explanation:
        'useNavigate mengembalikan fungsi yang dapat dipanggil untuk berpindah halaman tanpa reload.',
    },
    {
      id: 'q-04-05',
      order: 5,
      prompt: 'Hook apa yang digunakan untuk membaca dan menulis query string URL?',
      options: ['useParams', 'useSearchParams', 'useLoaderData', 'useNavigation'],
      correctOptionIndex: 1,
      explanation:
        'useSearchParams mengembalikan tuple mirip useState yang mewakili query string URL.',
    },
    {
      id: 'q-04-06',
      order: 6,
      prompt: 'Apa fungsi loader di React Router data APIs?',
      options: [
        'Menangani submission form',
        'Mengambil data sebelum route dirender',
        'Menyimpan state global',
        'Mengganti komponen Layout',
      ],
      correctOptionIndex: 1,
      explanation:
        'Loader adalah fungsi yang dipanggil saat navigasi ke route, bertujuan mengambil data yang dibutuhkan komponen.',
    },
    {
      id: 'q-04-07',
      order: 7,
      prompt: 'Apa yang terjadi setelah action sukses di React Router secara default?',
      options: [
        'Halaman otomatis di-refresh penuh',
        'Loader aktif di revalidasi untuk memperbarui data',
        'State lokal di-reset semua',
        'Navigasi ke halaman utama terjadi',
      ],
      correctOptionIndex: 1,
      explanation:
        'React Router akan revalidasi loader setelah action berhasil, sehingga UI menampilkan data terbaru.',
    },
    {
      id: 'q-04-08',
      order: 8,
      prompt: 'Hook mana yang memberitahu state navigasi aplikasi seperti loading atau submitting?',
      options: ['useLoaderData', 'useActionData', 'useNavigation', 'useRouteError'],
      correctOptionIndex: 2,
      explanation:
        'useNavigation memberikan informasi navigation.state yang dapat digunakan untuk indikator loading global.',
    },
  ],
}
