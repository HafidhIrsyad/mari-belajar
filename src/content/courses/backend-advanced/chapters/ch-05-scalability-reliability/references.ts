import type { Reference } from '@/content/types'

export const ch05References: Reference[] = [
  {
    id: 'ref-05-01',
    title: 'AWS — Auto Scaling',
    url: 'https://aws.amazon.com/autoscaling/',
    description:
      'Dokumentasi AWS tentang auto scaling group dan metrik pemicu scaling.',
    type: 'documentation',
  },
  {
    id: 'ref-05-02',
    title: 'Microsoft — Cloud Design Patterns',
    url: 'https://learn.microsoft.com/en-us/azure/architecture/patterns/',
    description:
      'Katalog pola cloud termasuk Retry, Circuit Breaker, dan Bulkhead.',
    type: 'documentation',
  },
  {
    id: 'ref-05-03',
    title: 'Go package — gobreaker',
    url: 'https://github.com/sony/gobreaker',
    description:
      'Implementasi circuit breaker untuk Go dengan state machine dan counting.',
    type: 'documentation',
  },
  {
    id: 'ref-05-04',
    title: 'Netflix Tech Blog — Chaos Engineering',
    url: 'https://netflixtechblog.com/tagged/chaos-engineering',
    description:
      'Artikel Netflix tentang prinsip dan praktik chaos engineering.',
    type: 'article',
  },
  {
    id: 'ref-05-05',
    title: 'Google SRE Book — Reliable Systems',
    url: 'https://sre.google/sre-book/reliable-systems/',
    description:
      'Bab SRE tentang keandalan sistem, error budget, dan resiliensi.',
    type: 'book',
  },
]
