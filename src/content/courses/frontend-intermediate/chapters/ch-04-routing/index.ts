import type { Chapter } from '@/content/types'
import { ch04Lesson } from './lesson'
import { ch04Quiz } from './quiz'
import { ch04References } from './references'

export const ch04Routing: Chapter = {
  id: 'ch-04-routing',
  slug: 'ch-04-routing',
  order: 4,
  title: 'Routing',
  summary:
    'Menguasai React Router v6: declarative routes, nested routing, dynamic params, protected routes, dan data APIs seperti loaders serta actions.',
  estimatedMinutes: 40,
  learningObjectives: [
    'Membuat routing deklaratif dengan BrowserRouter dan Routes.',
    'Menggunakan nested routes dan Outlet untuk layout bersama.',
    'Membaca parameter URL dengan useParams dan useSearchParams.',
    'Mengimplementasikan protected route berdasarkan autentikasi.',
    'Memahami React Router data APIs: loader, action, dan useNavigation.',
  ],
  summaryPoints: [
    'React Router memetakan URL ke komponen secara deklaratif.',
    'Nested routes memungkinkan child route merender di dalam Outlet parent.',
    'useParams membaca segmen dinamis URL seperti :id.',
    'Protected route dapat mengganti konten dengan redirect ke halaman login.',
    'Loader dan action di React Router memisahkan fetching dan mutation dari komponen.',
  ],
  references: ch04References,
  lesson: ch04Lesson,
  quiz: ch04Quiz,
}
