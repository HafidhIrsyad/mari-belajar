import type { Reference } from '@/content/types'

export const ch07References: Reference[] = [
  {
    id: 'ref-07-01',
    title: 'Mathematics for Computer Science (MIT OCW)',
    url: 'https://ocw.mit.edu/courses/6-042j-mathematics-for-computer-science-fall-2010/',
    description:
      'Kursus MIT yang mencakup proof, induksi, graf, counting, dan probability untuk CS.',
    type: 'book',
  },
  {
    id: 'ref-07-02',
    title: 'Concrete Mathematics (Graham, Knuth, Patashnik)',
    url: 'https://www-cs-faculty.stanford.edu/~knuth/gkp.html',
    description:
      'Buku referensi klasik untuk rekurens, induksi, dan matematika diskrit lanjut.',
    type: 'book',
  },
  {
    id: 'ref-07-03',
    title: 'Introduction to Algorithms — CLRS Appendix',
    url: 'https://mitpress.mit.edu/9780262046305/introduction-to-algorithms/',
    description:
      'Appendix CLRS tentang notasi asymptotic, probability, dan analisis rekurens algoritma.',
    type: 'book',
  },
  {
    id: 'ref-07-04',
    title: 'Khan Academy — Logic and Proofs',
    url: 'https://www.khanacademy.org/computing/computer-science/algorithms',
    description:
      'Materi interaktif tentang logika, algoritma, dan analisis kompleksitas.',
    type: 'interactive',
  },
  {
    id: 'ref-07-05',
    title: 'Master Theorem — Wikipedia',
    url: 'https://en.wikipedia.org/wiki/Master_theorem_(analysis_of_algorithms)',
    description:
      'Ringkasan Master Theorem untuk menyelesaikan rekurens divide-and-conquer T(n)=aT(n/b)+f(n).',
    type: 'article',
  },
]
