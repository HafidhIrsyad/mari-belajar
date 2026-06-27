import type { Chapter } from '@/content/types'
import { ch06Lesson } from './lesson'
import { ch06Quiz } from './quiz'
import { ch06References } from './references'

export const ch06ApiGatewayServiceMesh: Chapter = {
  id: 'ch-06-api-gateway-service-mesh',
  slug: 'ch-06-api-gateway-service-mesh',
  order: 6,
  title: 'API Gateway & Service Mesh (Konsep)',
  summary:
    'Memahami peran API gateway, reverse proxy, routing, auth termination, rate limiting, serta konsep service mesh, sidecar, mTLS, dan observability di microservices.',
  estimatedMinutes: 45,
  learningObjectives: [
    'Menjelaskan tanggung jawab API gateway dan reverse proxy.',
    'Membandingkan gateway seperti Kong, Nginx, dan AWS API Gateway.',
    'Menguraikan konsep service mesh dan data plane vs control plane.',
    'Memahami mTLS antar service untuk zero trust.',
    'Mengenali observability sidecar dan tracing.',
  ],
  summaryPoints: [
    'API gateway menjadi pintu masuk tunggal untuk client dan menangani routing, auth, rate limit, serta transformasi.',
    'Reverse proxy meneruskan request ke upstream tanpa client mengetahui detail internal.',
    'Service mesh menambahkan lapisan networking sebagai sidecar di setiap pod/service.',
    'mTLS mengenkripsi komunikasi antar service dan memverifikasi identitas kedua belah pihak.',
    'Control plane mengatur konfigurasi; data plane memproses traffic.',
  ],
  references: ch06References,
  lesson: ch06Lesson,
  quiz: ch06Quiz,
}
