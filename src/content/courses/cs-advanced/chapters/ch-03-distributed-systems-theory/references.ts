import type { Reference } from '@/content/types'

export const ch03References: Reference[] = [
  {
    id: 'ref-03-01',
    title: 'Fallacies of Distributed Computing',
    url: 'https://en.wikipedia.org/wiki/Fallacies_of_distributed_computing',
    description:
      'Daftar asumsi salah yang sering dibuat developer tentang jaringan terdistribusi, oleh Peter Deutsch dan tim Sun Microsystems.',
    type: 'article',
  },
  {
    id: 'ref-03-02',
    title: 'In Search of an Understandable Consensus Algorithm (Raft)',
    url: 'https://raft.github.io/raft.pdf',
    description:
      'Paper asli Raft oleh Ongaro dan Ousterhout — protokol consensus yang dirancang mudah dipahami dan diimplementasikan.',
    type: 'article',
  },
  {
    id: 'ref-03-03',
    title: 'Brewer\'s CAP Theorem',
    url: 'https://www.infoq.com/articles/CAP-Theorem-Revisited/',
    description:
      'Penjelasan ulang teorema CAP dan nuansanya — consistency, availability, dan partition tolerance.',
    type: 'article',
  },
  {
    id: 'ref-03-04',
    title: 'Time, Clocks, and the Ordering of Events (Lamport)',
    url: 'https://lamport.azurewebsites.net/pubs/time-clocks.pdf',
    description:
      'Paper klasik Leslie Lamport tentang logical clocks, happened-before relation, dan ordering event terdistribusi.',
    type: 'article',
  },
  {
    id: 'ref-03-05',
    title: 'Impossibility of Distributed Consensus (FLP)',
    url: 'https://en.wikipedia.org/wiki/Consensus_(computer_science)#FLP_impossibility_result',
    description:
      'Hasil Fischer-Lynch-Paterson: tidak ada algoritma consensus deterministik yang guaranteed terminate di sistem asynchronous.',
    type: 'article',
  },
]
