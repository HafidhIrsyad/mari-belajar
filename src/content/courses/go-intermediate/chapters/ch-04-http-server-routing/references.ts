import type { Reference } from '@/content/types'

export const ch04References: Reference[] = [
  {
    id: 'ref-04-01',
    title: 'Go Docs — net/http',
    url: 'https://pkg.go.dev/net/http',
    description:
      'Dokumentasi resmi package net/http untuk server, client, handler, dan ServeMux.',
    type: 'documentation',
  },
  {
    id: 'ref-04-02',
    title: 'Go by Example — HTTP Server',
    url: 'https://gobyexample.com/http-servers',
    description:
      'Contoh sederhana membuat HTTP server dengan net/http.',
    type: 'interactive',
  },
  {
    id: 'ref-04-03',
    title: 'go-chi/chi Documentation',
    url: 'https://go-chi.io/#/README',
    description:
      'Dokumentasi router chi yang kompatibel dengan net/http dan mendukung middleware.',
    type: 'documentation',
  },
  {
    id: 'ref-04-04',
    title: 'Express.js — Writing middleware',
    url: 'https://expressjs.com/en/guide/writing-middleware.html',
    description:
      'Panduan menulis middleware di Express untuk perbandingan dengan pattern Go.',
    type: 'article',
  },
  {
    id: 'ref-04-05',
    title: 'Graceful Shutdown of Go net/http Servers',
    url: 'https://www.youtube.com/results?search_query=go+graceful+shutdown+net/http',
    description:
      'Video tutorial implementasi graceful shutdown pada server Go.',
    type: 'video',
  },
]
