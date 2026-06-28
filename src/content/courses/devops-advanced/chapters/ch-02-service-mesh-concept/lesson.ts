import type { Lesson } from '@/content/types'

export const ch02ServiceMeshConceptLesson: Lesson = {
  id: 'lesson-ch-02-service-mesh-concept',
  estimatedMinutes: 50,
  sections: [
    {
      id: 'sec-02-basic',
      type: 'markdown',
      level: 'basic',
      title: 'Apa itu Service Mesh?',
      content: '## Definisi\nService mesh adalah lapisan infrastruktur yang mengelola komunikasi antar service dalam aplikasi terdistribusi tanpa mengubah kode aplikasi.\n\n## Data Plane vs Control Plane\n- **Data plane**: kumpulan proxy sidecar yang mengirim dan menerima traffic.\n- **Control plane**: mengatur kebijakan, certificate, dan konfigurasi proxy.\n\n## Sidecar Pattern\nSetiap Pod aplikasi mendapat container proxy tambahan (misal Istio/Envoy). Aplikasi berkomunikasi melalui localhost ke proxy; proxy menangani discovery, load balancing, dan keamanan.',
    },
    {
      id: 'sec-02-js',
      type: 'code-example',
      codeExample: {
        id: 'code-02-js',
        filename: 'mesh-headers.js',
        language: 'javascript',
        title: 'JavaScript: Simulasi Sidecar Header Injection',
        code: 'const express = require(\'express\')\nconst app = express()\n\napp.use((req, res, next) => {\n  req.headers[\'x-mesh-trace-id\'] = Math.random().toString(36).slice(2)\n  next()\n})\n\napp.get(\'/users\', (req, res) => {\n  res.json({ service: \'users\', trace: req.headers[\'x-mesh-trace-id\'] })\n})\n\napp.listen(3000, () => console.log(\'service listening with mesh headers\'))',
        explanation: 'Middleware ini meniru sidecar yang menyuntikkan header tracing sebelum request mencapai aplikasi.',
      },
    },
    {
      id: 'sec-02-intermediate',
      type: 'markdown',
      level: 'intermediate',
      title: 'mTLS, Traffic Management, dan Observability',
      content: '## mTLS dan Identitas Service\nService mesh secara otomatis mengeluarkan sertifikat untuk setiap workload. Setiap sisi koneksi memverifikasi identitas lawan, menghasilkan mutual TLS.\n\n## Traffic Management\n- **VirtualService**: mendefinisikan routing rules.\n- **DestinationRule**: kebijakan untuk subset service.\n- **Retry dan timeout**: meningkatkan reliability.\n- **Traffic split**: canary dan A/B testing.\n\n## Observability Sidecar\nProxy mengumpulkan metrics (Prometheus), logs, dan traces secara seragam tanpa perubahan kode aplikasi.',
    },
    {
      id: 'sec-02-ts',
      type: 'code-example',
      codeExample: {
        id: 'code-02-ts',
        filename: 'istio-config.ts',
        language: 'typescript',
        title: 'TypeScript: Model VirtualService Canary',
        code: 'interface DestinationRule {\n  host: string\n  subsets: { name: string; labels: Record<string, string> }[]\n}\n\ninterface VirtualService {\n  hosts: string[]\n  http: {\n    route: { destination: { host: string; subset?: string }; weight: number }[]\n    retries?: { attempts: number; perTryTimeout: string }\n  }[]\n}\n\nconst canary: VirtualService = {\n  hosts: [\'reviews\'],\n  http: [{\n    route: [\n      { destination: { host: \'reviews\', subset: \'v1\' }, weight: 90 },\n      { destination: { host: \'reviews\', subset: \'v2\' }, weight: 10 },\n    ],\n    retries: { attempts: 3, perTryTimeout: \'2s\' },\n  }],\n}\nconsole.log(JSON.stringify(canary, null, 2))',
        explanation: 'Konfigurasi traffic split canary 90/10 dengan retry policy, didefinisikan secara type-safe.',
      },
    },
    {
      id: 'sec-02-advanced',
      type: 'markdown',
      level: 'advanced',
      title: 'Zero-Trust, Sidecar-less, dan SMI',
      content: '## Zero-Trust Networking\nPrinsip: "never trust, always verify". Setiap request diautentikasi dan diautorisasi. Network segmentation saja tidak cukup; identitas workload menjadi dasar kebijakan.\n\n## Sidecar-less dan eBPF\nTeknologi baru seperti Cilium Service Mesh menggunakan eBPF untuk mengurangi overhead sidecar. Ambient mesh memisahkan peran ztunnel dan waypoint proxy.\n\n## SMI dan Gateway API\nService Mesh Interface (SMI) adalah spesifikasi vendor-neutral untuk konfigurasi mesh. Kubernetes Gateway API menyediakan abstraksi routing yang dapat diadopsi mesh.',
    },
    {
      id: 'sec-02-go',
      type: 'code-example',
      codeExample: {
        id: 'code-02-go',
        filename: 'mesh-mtls.go',
        language: 'go',
        title: 'Go: HTTP Server dengan mTLS',
        code: 'package main\n\nimport (\n\t"crypto/tls"\n\t"fmt"\n\t"net/http"\n)\n\nfunc main() {\n\tconfig := &tls.Config{\n\t\tClientAuth: tls.RequireAndVerifyClientCert,\n\t\tMinVersion: tls.VersionTLS13,\n\t}\n\tserver := &http.Server{\n\t\tAddr:      ":8443",\n\t\tTLSConfig: config,\n\t\tHandler: http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {\n\t\t\tfmt.Fprintln(w, "hello from meshed service")\n\t\t}),\n\t}\n\tfmt.Println(server.ListenAndServeTLS("server.crt", "server.key"))\n}',
        explanation: 'Konfigurasi Go ini menunjukkan penerapan mTLS yang menjadi dasar keamanan service mesh.',
      },
    },
    {
      id: 'sec-02-callout',
      type: 'callout',
      calloutType: 'info',
      content: '**Kesimpulan:** Service mesh menambah kompleksitas dan overhead latensi. Evaluasi ukuran cluster dan kebutuhan keamanan sebelum mengadopsi. Sidecar-less mesh dapat mengurangi overhead di cluster besar.',
    },
  ],
}
