import type { Reference } from '@/content/types'

export const ch01References: Reference[] = [
  {
    id: 'ref-01-01',
    title: 'Pro Git Book (Bahasa Indonesia)',
    url: 'https://git-scm.com/book/id/v2',
    description:
      'Dokumentasi resmi Git yang menjelaskan konsep dasar hingga internalitas object database dan plumbing commands.',
    type: 'book',
  },
  {
    id: 'ref-01-02',
    title: 'Atlassian — Git Workflow',
    url: 'https://www.atlassian.com/git/tutorials/comparing-workflows',
    description:
      'Perbandingan Git Flow, GitHub Flow, dan GitLab Flow beserta kapan menggunakannya.',
    type: 'article',
  },
  {
    id: 'ref-01-03',
    title: 'GitHub Docs — About pull requests',
    url: 'https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/about-pull-requests',
    description:
      'Panduan resmi tentang pull request, review, dan kolaborasi di GitHub.',
    type: 'documentation',
  },
  {
    id: 'ref-01-04',
    title: 'Git Internals — Git Objects',
    url: 'https://git-scm.com/book/en/v2/Git-Internals-Git-Objects',
    description:
      'Penjelasan mendalam tentang blob, tree, commit, tag, dan packfile.',
    type: 'documentation',
  },
  {
    id: 'ref-01-05',
    title: 'Oh Shit, Git!?',
    url: 'https://ohshitgit.com/',
    description:
      'Kumpulan solusi praktis untuk situasi Git yang sulit, seperti undo commit, recover branch, dan fix rebase.',
    type: 'interactive',
  },
]
