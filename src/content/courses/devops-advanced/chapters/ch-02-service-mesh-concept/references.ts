import type { Reference } from '@/content/types'

export const ch02ServiceMeshConceptReferences: Reference[] = [
  {
    id: 'ref-02-01',
    title: 'Istio Docs',
    url: 'https://istio.io/latest/docs/',
    description: 'Dokumentasi resmi Istio service mesh.',
    type: 'documentation',
  },
  {
    id: 'ref-02-02',
    title: 'Linkerd Docs',
    url: 'https://linkerd.io/2/overview/',
    description: 'Dokumentasi resmi Linkerd, service mesh yang ringan.',
    type: 'documentation',
  },
  {
    id: 'ref-02-03',
    title: 'CNCF — What is a Service Mesh',
    url: 'https://www.cncf.io/blog/2021/07/28/what-is-a-service-mesh/',
    description: 'Artikel CNCF yang menjelaskan konsep dan manfaat service mesh.',
    type: 'article',
  },
  {
    id: 'ref-02-04',
    title: 'Buoyant — Service Mesh 101',
    url: 'https://buoyant.io/service-mesh-101',
    description: 'Video dan artikel pengantar service mesh dari pembuat Linkerd.',
    type: 'video',
  },
  {
    id: 'ref-02-05',
    title: 'NGINX — What is a Service Mesh',
    url: 'https://www.nginx.com/blog/what-is-a-service-mesh/',
    description: 'Artikel praktis tentang use case dan komponen service mesh.',
    type: 'article',
  },
]
