import type { Reference } from '@/content/types'

export const ch05References: Reference[] = [
  {
    id: 'ref-05-01',
    title: 'Intel 64 and IA-32 Architectures Optimization Manual',
    url: 'https://www.intel.com/content/www/us/en/developer/articles/technical/intel-sdm.html',
    description:
      'Manual resmi Intel yang mencakup pipeline, cache hierarchy, branch prediction, dan teknik optimasi microarchitecture.',
    type: 'documentation',
  },
  {
    id: 'ref-05-02',
    title: 'What Every Programmer Should Know About Memory — Ulrich Drepper',
    url: 'https://people.freebsd.org/~lstewart/articles/cpumemory.pdf',
    description:
      'Artikel klasik yang menjelaskan hierarki memori, cache line, TLB, NUMA, dan implikasinya terhadap performa program.',
    type: 'article',
  },
  {
    id: 'ref-05-03',
    title: 'Operating Systems: Three Easy Pieces — Virtual Memory',
    url: 'https://pages.cs.wisc.edu/~remzi/OSTEP/vm-intro.pdf',
    description:
      'Bab virtual memory dari OSTEP yang menjelaskan paging, page table, TLB, dan swapping dengan jelas.',
    type: 'book',
  },
  {
    id: 'ref-05-04',
    title: 'Agner Fog — Microarchitecture Guides',
    url: 'https://www.agner.org/optimize/',
    description:
      'Panduan detail tentang instruction tables, latency throughput, dan optimasi untuk berbagai CPU.',
    type: 'documentation',
  },
  {
    id: 'ref-05-05',
    title: 'Cache Performance — CSAPP (CMU)',
    url: 'https://csapp.cs.cmu.edu/public/waside/waside-cache.pdf',
    description:
      'Write-up tentang cache memory, locality, dan dampak layout data terhadap performa program.',
    type: 'article',
  },
]
