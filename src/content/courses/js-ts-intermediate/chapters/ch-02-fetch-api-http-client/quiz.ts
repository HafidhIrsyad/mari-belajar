import type { Quiz } from '@/content/types'

export const ch02Quiz: Quiz = {
  id: 'quiz-ch-02-fetch-api-http-client',
  title: 'Quiz: Fetch API & HTTP Client',
  passingScore: 8,
  questions: [
    {
      id: 'q-02-01',
      order: 1,
      prompt: 'Apa yang dikembalikan oleh fungsi fetch()?',
      options: [
        'Response body langsung',
        'Promise<Response>',
        'XMLHttpRequest object',
        'JSON object',
      ],
      correctOptionIndex: 1,
      explanation:
        'fetch mengembalikan Promise yang resolve menjadi objek Response setelah server merespons.',
    },
    {
      id: 'q-02-02',
      order: 2,
      prompt: 'Bagaimana fetch menangani HTTP status 404 atau 500?',
      options: [
        'Langsung reject Promise',
        'Resolve Promise tetapi response.ok bernilai false',
        'Mengembalikan null',
        'Me-throw Error secara otomatis',
      ],
      correctOptionIndex: 1,
      explanation:
        'fetch resolve untuk status HTTP apapun. Kita harus memeriksa response.ok atau response.status secara manual.',
    },
    {
      id: 'q-02-03',
      order: 3,
      prompt: 'API apa yang digunakan untuk membatalkan fetch?',
      options: [
        'fetch.cancel()',
        'AbortController',
        'clearTimeout',
        'XMLHttpRequest.abort()',
      ],
      correctOptionIndex: 1,
      explanation:
        'AbortController menghasilkan signal yang dipass ke fetch, kemudian bisa dibatalkan dengan controller.abort().',
    },
    {
      id: 'q-02-04',
      order: 4,
      prompt: 'Manakah yang merupakan network error, bukan HTTP error?',
      options: [
        'Status 500 dari server',
        'Status 404 dari server',
        'Request gagal karena offline',
        'Status 400 Bad Request',
      ],
      correctOptionIndex: 2,
      explanation:
        'Network error terjadi ketika request tidak bisa mencapai server, misalnya karena offline atau DNS gagal.',
    },
    {
      id: 'q-02-05',
      order: 5,
      prompt: 'Pola apa yang memisahkan logging atau token refresh dari business logic HTTP?',
      options: [
        'Observer pattern',
        'Interceptor pattern',
        'Singleton pattern',
        'Factory pattern',
      ],
      correctOptionIndex: 1,
      explanation:
        'Interceptor pattern menjalankan fungsi sebelum/after request, cocok untuk logging, auth header, dan token refresh.',
    },
    {
      id: 'q-02-06',
      order: 6,
      prompt: 'Apa tujuan exponential backoff pada retry?',
      options: [
        'Mempercepat setiap percobaan berikutnya',
        'Mengurangi beban server dengan menambah jeda antar percobaan',
        'Menghapus request yang gagal dari queue',
        'Mengabaikan error setelah beberapa kali percobaan',
      ],
      correctOptionIndex: 1,
      explanation:
        'Exponential backoff menambah jeda antar percobaan secara eksponensial untuk mengurangi tekanan pada server yang sedang bermasalah.',
    },
    {
      id: 'q-02-07',
      order: 7,
      prompt: 'Fitur HTTP/2 apa yang memungkinkan banyak request berbagi satu koneksi TCP?',
      options: [
        'Pipelining',
        'Multiplexing',
        'Keep-alive',
        'Chunked transfer',
      ],
      correctOptionIndex: 1,
      explanation:
        'HTTP/2 multiplexing mengirim banyak stream request/respons secara bersamaan dalam satu koneksi TCP.',
    },
    {
      id: 'q-02-08',
      order: 8,
      prompt: 'Di TypeScript, mengapa menggunakan generic T pada wrapper fetch berguna?',
      options: [
        'Agar fetch lebih cepat',
        'Agar response.json() memiliki tipe yang sesuai dengan pemanggil',
        'Agar tidak perlu memeriksa response.ok',
        'Agar request otomatis dibatalkan',
      ],
      correctOptionIndex: 1,
      explanation:
        'Generic T memastikan hasil parsing JSON diberi tipe sesuai dengan tipe yang diharapkan pemanggil fungsi.',
    },
  ],
}
