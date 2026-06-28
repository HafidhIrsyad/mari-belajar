import type { Reference } from '@/content/types'

export const ch03References: Reference[] = [
  {
    id: 'ref-03-01',
    title: 'Docker Documentation — Dockerfile reference',
    url: 'https://docs.docker.com/reference/dockerfile/',
    description:
      'Referensi lengkap instruksi Dockerfile dan best practices membangun image.',
    type: 'documentation',
  },
  {
    id: 'ref-03-02',
    title: 'Linux man pages — namespaces',
    url: 'https://man7.org/linux/man-pages/man7/namespaces.7.html',
    description:
      'Dokumentasi kernel Linux tentang tujuh namespace dan API clone/setns/unshare.',
    type: 'documentation',
  },
  {
    id: 'ref-03-03',
    title: 'Linux man pages — cgroups',
    url: 'https://man7.org/linux/man-pages/man7/cgroups.7.html',
    description:
      'Penjelasan cgroups v1 dan v2 untuk pembatasan resource process.',
    type: 'documentation',
  },
  {
    id: 'ref-03-04',
    title: 'OCI Runtime Specification',
    url: 'https://github.com/opencontainers/runtime-spec/blob/main/spec.md',
    description:
      'Spesifikasi resmi OCI untuk runtime container termasuk bundle dan lifecycle.',
    type: 'documentation',
  },
  {
    id: 'ref-03-05',
    title: 'Bret Fisher — Docker and Kubernetes',
    url: 'https://www.bretfisher.com/docker/',
    description:
      'Kumpulan artikel dan video praktis tentang Docker, container security, dan deployment.',
    type: 'video',
  },
]
