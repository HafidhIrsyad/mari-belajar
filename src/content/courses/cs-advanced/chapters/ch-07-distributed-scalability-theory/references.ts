import type { Reference } from '@/content/types'

export const ch07References: Reference[] = [
  {
    id: 'ref-07-01',
    title: 'Kleinrock — Queueing Systems Vol. 1',
    url: 'https://en.wikipedia.org/wiki/Queueing_theory',
    description:
      'Referensi klasik teori antrian yang menjadi fondasi analisis kapasitas dan latency sistem.',
    type: 'book',
  },
  {
    id: 'ref-07-02',
    title: 'Brewer — CAP Twelve Years Later',
    url: 'https://www.infoq.com/articles/cap-twelve-years-later-how-the-rules-have-changed/',
    description:
      'Essay Eric Brewer yang memperbarui pemahaman CAP theorem dan memperkenalkan konsep PACELC.',
    type: 'article',
  },
  {
    id: 'ref-07-03',
    title: 'Lamport, Shostak & Pease — The Byzantine Generals Problem',
    url: 'https://lamport.azurewebsites.net/pubs/byz.pdf',
    description:
      'Paper seminal yang memformulasikan Byzantine fault tolerance dan batas 3f+1 untuk toleransi f fault.',
    type: 'article',
  },
  {
    id: 'ref-07-04',
    title: 'Gilbert & Lynch — Brewer\'s Conjecture and the Feasibility of Consistent, Available, Partition-Tolerant Web Services',
    url: 'https://dl.acm.org/doi/10.1145/564585.564601',
    description:
      'Bukti formal CAP theorem: sistem terdistribusi tidak dapat simultan konsisten, available, dan partition-tolerant.',
    type: 'article',
  },
  {
    id: 'ref-07-05',
    title: 'Kleppmann — Designing Data-Intensive Applications',
    url: 'https://dataintensive.net/',
    description:
      'Buku referensi praktis tentang replikasi, konsistensi, partitioning, dan trade-off sistem terdistribusi.',
    type: 'book',
  },
]
