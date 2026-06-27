import type { Quiz } from '@/content/types'

export const ch05Quiz: Quiz = {
  id: 'quiz-ch-05-data-fetching-server-state',
  title: 'Quiz: Data Fetching & Server State',
  passingScore: 8,
  questions: [
    {
      id: 'q-05-01',
      order: 1,
      prompt: 'Apa tujuan AbortController saat fetching data di useEffect?',
      options: [
        'Menghentikan render komponen',
        'Membatalkan request HTTP yang tidak lagi relevan saat unmount atau dependency berubah',
        'Menghapus state lokal',
        'Mengganti URL fetch',
      ],
      correctOptionIndex: 1,
      explanation:
        'AbortController memberikan signal yang dapat digunakan fetch untuk membatalkan request dan menghindari race condition.',
    },
    {
      id: 'q-05-02',
      order: 2,
      prompt: 'Mengapa flag ignore diperlukan saat fetching data?',
      options: [
        'Agar fetch berjalan lebih cepat',
        'Mencegah state update dari response yang datang terlambat setelah komponen unmount atau dependency berubah',
        'Agar loading state selalu true',
        'Untuk menyimpan cache secara lokal',
      ],
      correctOptionIndex: 1,
      explanation:
        'Flag ignore mencegah setState dari response lama yang mungkin tiba setelah kondisi komponen sudah berubah.',
    },
    {
      id: 'q-05-03',
      order: 3,
      prompt: 'Apa fungsi query key di TanStack Query?',
      options: [
        'Menentukan urutan fetch',
        'Mengidentifikasi cache dan menentukan kapan query perlu di-refetch',
        'Menyimpan error message',
        'Menggantikan mutationFn',
      ],
      correctOptionIndex: 1,
      explanation:
        'Query key adalah identitas unik untuk cache. Perubahan query key akan memicu refetch, dan invalidate menggunakan key untuk menyegarkan data.',
    },
    {
      id: 'q-05-04',
      order: 4,
      prompt: 'Bagaimana cara memperbarui cache setelah mutation sukses di TanStack Query?',
      options: [
        'Memanggil fetch ulang secara manual',
        'Menggunakan queryClient.invalidateQueries atau queryClient.setQueryData',
        'Menyimpan hasil mutation di localStorage',
        'Mengubah queryKey secara acak',
      ],
      correctOptionIndex: 1,
      explanation:
        'invalidateQueries memicu refetch, sedangkan setQueryData memperbarui cache langsung tanpa menunggu response baru.',
    },
    {
      id: 'q-05-05',
      order: 5,
      prompt: 'Apa itu optimistic update?',
      options: [
        'Menunggu server merespons sebelum memperbarui UI',
        'Memperbarui UI sebelum server merespons, lalu mengembalikan jika gagal',
        'Mengabaikan response dari server',
        'Menyimpan data hanya di client',
      ],
      correctOptionIndex: 1,
      explanation:
        'Optimistic update meningkatkan UX dengan menampilkan hasil dulu, kemudian rollback jika server mengembalikan error.',
    },
    {
      id: 'q-05-06',
      order: 6,
      prompt: 'Apa perilaku default TanStack Query terhadap data yang sudah stale?',
      options: [
        'Menghapus data segera',
        'Menampilkan data lama sambil mengambil data baru di background (stale-while-revalidate)',
        'Memblokir UI hingga data baru tiba',
        'Selalu menampilkan error',
      ],
      correctOptionIndex: 1,
      explanation:
        'Stale-while-revalidate memastikan UI tetap responsif dengan menampilkan cache lama sementara data segar di-fetch.',
    },
    {
      id: 'q-05-07',
      order: 7,
      prompt: 'Apa perbedaan status dan fetchStatus pada query TanStack Query?',
      options: [
        'Keduanya sama',
        'status menunjukkan keadaan data (pending/error/success), fetchStatus menunjukkan aktivitas fetch (fetching/idle)',
        'status hanya untuk mutation',
        'fetchStatus tidak pernah berubah',
      ],
      correctOptionIndex: 1,
      explanation:
        'status merepresentasikan data availability, sementara fetchStatus mengindikasikan apakah query sedang melakukan request.',
    },
    {
      id: 'q-05-08',
      order: 8,
      prompt: 'Apa yang dimaksud dengan gcTime di TanStack Query?',
      options: [
        'Waktu maksimum query berjalan',
        'Waktu cache query dipertahankan setelah tidak digunakan sebelum dihapus (garbage collection)',
        'Waktu retry saat error',
        'Waktu loading state ditampilkan',
      ],
      correctOptionIndex: 1,
      explanation:
        'gcTime menentukan berapa lama query tetap di-cache setelah komponen terakhir berhenti menggunakannya sebelum dihapus.',
    },
  ],
}
