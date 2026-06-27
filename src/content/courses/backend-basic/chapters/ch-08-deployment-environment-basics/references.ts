import type { Reference } from '@/content/types'

export const ch08References: Reference[] = [
  {
    id: 'ref-08-01',
    title: '12factor.net — Config',
    url: 'https://12factor.net/config',
    description:
      'Prinsip konfigurasi twelve-factor app: konfigurasi disimpan di environment.',
    type: 'article',
  },
  {
    id: 'ref-08-02',
    title: 'Docker Docs — Node.js best practices',
    url: 'https://docs.docker.com/language/nodejs/',
    description:
      'Panduan Docker untuk aplikasi Node.js termasuk image layering dan health check.',
    type: 'documentation',
  },
  {
    id: 'ref-08-03',
    title: 'PM2 Docs',
    url: 'https://pm2.keymetrics.io/docs/usage/quick-start/',
    description:
      'Dokumentasi PM2 untuk menjalankan dan mengelola proses Node.js di production.',
    type: 'documentation',
  },
  {
    id: 'ref-08-04',
    title: 'Go Blog — HTTP Server Shutdown',
    url: 'https://golangnote.com/tips/http-server-shutdown-in-go.html',
    description:
      'Penjelasan penggunaan http.Server Shutdown di Go untuk graceful shutdown.',
    type: 'article',
  },
  {
    id: 'ref-08-05',
    title: 'Nginx Beginner\'s Guide',
    url: 'https://nginx.org/en/docs/beginners_guide.html',
    description:
      'Panduan pemula nginx termasuk konfigurasi reverse proxy dasar.',
    type: 'documentation',
  },
]
