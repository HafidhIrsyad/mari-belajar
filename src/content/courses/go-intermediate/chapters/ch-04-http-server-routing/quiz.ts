import type { Quiz } from '@/content/types'

export const ch04Quiz: Quiz = {
  id: 'quiz-ch-04-http-server-routing',
  title: 'Quiz: HTTP Server & Routing',
  passingScore: 8,
  questions: [
    {
      id: 'q-04-01',
      order: 1,
      prompt: 'Interface apa yang harus diimplementasikan untuk menjadi HTTP handler di Go?',
      options: [
        'http.Server',
        'http.Handler',
        'http.ServeMux',
        'http.Controller',
      ],
      correctOptionIndex: 1,
      explanation:
        'http.Handler adalah interface dengan method ServeHTTP(ResponseWriter, *Request).',
    },
    {
      id: 'q-04-02',
      order: 2,
      prompt: 'Fungsi apa yang digunakan untuk mendaftarkan handler pada path tertentu?',
      options: [
        'http.Register',
        'http.HandleFunc',
        'http.Route',
        'http.Map',
      ],
      correctOptionIndex: 1,
      explanation:
        'http.HandleFunc mendaftarkan fungsi sebagai handler untuk path tertentu pada default ServeMux.',
    },
    {
      id: 'q-04-03',
      order: 3,
      prompt: 'Apa keuntungan menggunakan http.NewServeMux daripada http.DefaultServeMux?',
      options: [
        'Lebih cepat secara signifikan',
        'Menghindari registrasi handler global yang tidak sengaja',
        'Mendukung path parameter secara bawaan',
        'Tidak memerlukan handler',
      ],
      correctOptionIndex: 1,
      explanation:
        'Dengan ServeMux lokal, kita memiliki kontrol penuh atas routing dan tidak terpengaruh oleh package lain yang mungkin mendaftar ke DefaultServeMux.',
    },
    {
      id: 'q-04-04',
      order: 4,
      prompt: 'Bagaimana bentuk umum middleware di Go?',
      options: [
        'func(http.Handler) http.Handler',
        'func(http.Request) http.Response',
        'type Middleware interface',
        'func(http.ResponseWriter) http.Handler',
      ],
      correctOptionIndex: 0,
      explanation:
        'Middleware di Go umumnya adalah higher-order function yang menerima dan mengembalikan http.Handler.',
    },
    {
      id: 'q-04-05',
      order: 5,
      prompt: 'Method apa yang digunakan untuk graceful shutdown server?',
      options: [
        'srv.Stop()',
        'srv.Close()',
        'srv.Shutdown(ctx)',
        'srv.Terminate()',
      ],
      correctOptionIndex: 2,
      explanation:
        'srv.Shutdown(ctx) menutup listener dan menunggu handler aktif selesai dalam batas waktu context.',
    },
    {
      id: 'q-04-06',
      order: 6,
      prompt: 'Konfigurasi server mana yang membatasi waktu membaca seluruh request termasuk body?',
      options: [
        'WriteTimeout',
        'IdleTimeout',
        'ReadTimeout',
        'MaxHeaderBytes',
      ],
      correctOptionIndex: 2,
      explanation:
        'ReadTimeout membatasi durasi membaca seluruh request, termasuk body, sejak koneksi diterima.',
    },
    {
      id: 'q-04-07',
      order: 7,
      prompt: 'Library routing Go mana yang dirancang kompatibel dengan net/http dan mendukung path parameter?',
      options: [
        'Gin',
        'Echo',
        'chi',
        'Fiber',
      ],
      correctOptionIndex: 2,
      explanation:
        'go-chi/chi dirancang untuk kompatibel dengan net/http dan mendukung path parameter seperti /users/{id}.',
    },
    {
      id: 'q-04-08',
      order: 8,
      prompt: 'Mengapa disarankan menjalankan server di goroutine terpisah saat implementasi graceful shutdown?',
      options: [
        'Agar server lebih cepat',
        'Agor goroutine utama dapat menunggu sinyal OS',
        'Agar tidak perlu handler',
        'Agar memory lebih hemat',
      ],
      correctOptionIndex: 1,
      explanation:
        'Server dijalankan di goroutine terpisah sehingga goroutine utama bebas menunggu sinyal termination dan kemudian memanggil Shutdown.',
    },
  ],
}
