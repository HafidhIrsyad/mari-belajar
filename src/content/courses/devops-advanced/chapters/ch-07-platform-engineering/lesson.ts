import type { Lesson } from '@/content/types'

export const ch07PlatformEngineeringLesson: Lesson = {
  id: 'lesson-ch-07-platform-engineering',
  estimatedMinutes: 45,
  sections: [
    {
      id: 'sec-07-basic',
      type: 'markdown',
      level: 'basic',
      title: 'Internal Developer Platform (IDP)',
      content: '## Apa itu IDP?\nInternal Developer Platform adalah layer abstraksi di atas infrastruktur yang menyediakan self-service capabilities untuk developer. IDP bukan sekadar tooling — ini adalah **produk internal** dengan customer (developer teams) dan roadmap.\n\n## Mengapa Platform Engineering?\n- Tim developer tumbuh, kebutuhan infrastruktur bervariasi.\n- Ticket queue ke ops/platform team menjadi bottleneck.\n- Cognitive load developer meningkat dengan kompleksitas cloud native.\n\n## Platform vs DevOps\nDevOps fokus pada culture dan collaboration. Platform engineering fokus pada **produk platform** yang mempercepat delivery dengan golden paths dan self-service.',
    },
    {
      id: 'sec-07-js',
      type: 'code-example',
      codeExample: {
        id: 'code-07-js',
        filename: 'manual-setup.js',
        language: 'javascript',
        title: 'JavaScript: Manual Setup vs Platform',
        code: 'const manualSteps = [\n  \'Create GitHub repo\',\n  \'Setup CI pipeline YAML\',\n  \'Create K8s namespace\',\n  \'Configure RBAC\',\n  \'Setup monitoring dashboard\',\n  \'Configure secrets in vault\',\n  \'Setup ingress and DNS\',\n  \'Write deployment manifest\',\n]\n\nconst platformSteps = [\n  \'Open Backstage portal\',\n  \'Select "Node.js Microservice" template\',\n  \'Fill service name and team\',\n  \'Click Create — all above automated\',\n]\n\nconsole.log(\'Manual:\', manualSteps.length, \'steps\')\nconsole.log(\'Platform:\', platformSteps.length, \'steps\')',
        explanation: 'Perbandingan langkah manual vs self-service platform untuk provisioning service baru.',
      },
    },
    {
      id: 'sec-07-intermediate',
      type: 'markdown',
      level: 'intermediate',
      title: 'Golden Paths dan Self-Service',
      content: '## Golden Paths\nGolden path adalah cara standar, didukung, dan terdokumentasi untuk common tasks:\n- **Create new service**: template → repo → CI → deploy → monitoring.\n- **Add database**: self-service PostgreSQL instance dengan backup otomatis.\n- **Setup observability**: dashboard dan alert otomatis dari service template.\n\n## Self-Service Infrastructure\nDeveloper dapat provisioning resource tanpa ticket:\n- Namespace, database, cache, message queue via portal atau CLI.\n- Policy enforcement otomatis (resource limits, network policy, RBAC).\n\n## Backstage / Port\n- **Backstage**: open source, plugin ecosystem, software templates (Cookiecutter).\n- **Port**: no-code, action-based automation, software catalog.',
    },
    {
      id: 'sec-07-ts',
      type: 'code-example',
      codeExample: {
        id: 'code-07-ts',
        filename: 'platform-template.ts',
        language: 'typescript',
        title: 'TypeScript: Model Software Template',
        code: 'interface SoftwareTemplate {\n  apiVersion: \'scaffolder.backstage.io/v1beta3\'\n  kind: \'Template\'\n  metadata: { name: string; title: string; description: string; tags: string[] }\n  spec: {\n    owner: string\n    type: \'service\'\n    parameters: { title: string; properties: Record<string, { type: string; description: string }> }[]\n    steps: { id: string; name: string; action: string; input: Record<string, unknown> }[]\n  }\n}\n\nconst nodeTemplate: SoftwareTemplate = {\n  apiVersion: \'scaffolder.backstage.io/v1beta3\',\n  kind: \'Template\',\n  metadata: {\n    name: \'node-microservice\',\n    title: \'Node.js Microservice\',\n    description: \'Golden path untuk service Node.js dengan CI/CD dan monitoring\',\n    tags: [\'nodejs\', \'recommended\'],\n  },\n  spec: {\n    owner: \'platform-team\',\n    type: \'service\',\n    parameters: [{ title: \'Service Info\', properties: { name: { type: \'string\', description: \'Service name\' } } }],\n    steps: [\n      { id: \'create-repo\', name: \'Create GitHub Repo\', action: \'publish:github\', input: {} },\n      { id: \'setup-ci\', name: \'Setup CI\', action: \'github:actions:dispatch\', input: {} },\n    ],\n  },\n}\nconsole.log(nodeTemplate.metadata.title)',
        explanation: 'Model Backstage software template yang mendefinisikan golden path untuk microservice Node.js.',
      },
    },
    {
      id: 'sec-07-advanced',
      type: 'markdown',
      level: 'advanced',
      title: 'Developer Experience Metrics',
      content: '## DX Metrics\n- **DORA metrics**: deployment frequency, lead time for changes, MTTR, change failure rate.\n- **Developer satisfaction**: survey periodik (SPACE framework).\n- **Platform adoption**: berapa % team menggunakan golden path vs manual.\n\n## Cognitive Load Reduction\nPlatform team bertanggung jawab mengurangi cognitive load stream-aligned teams:\n- Abstraksi kompleksitas infrastruktur.\n- Dokumentasi terintegrasi di portal.\n- Feedback loop: platform roadmap driven by developer pain points.\n\n## Thinnest Viable Platform\nMulai dengan golden path untuk 1-2 use case paling common. Iterasi berdasarkan adoption dan feedback. Jangan over-engineer platform sebelum ada demand.',
    },
    {
      id: 'sec-07-go',
      type: 'code-example',
      codeExample: {
        id: 'code-07-go',
        filename: 'platform-cli.go',
        language: 'go',
        title: 'Go: Platform CLI Stub',
        code: 'package main\n\nimport (\n\t"fmt"\n\t"os"\n)\n\nfunc main() {\n\tif len(os.Args) < 2 {\n\t\tfmt.Println("Usage: platform create <service-name>")\n\t\tos.Exit(1)\n\t}\n\tname := os.Args[1]\n\tfmt.Printf("Creating service %q via golden path...\\n", name)\n\tfmt.Println("  ✓ GitHub repo created")\n\tfmt.Println("  ✓ CI pipeline configured")\n\tfmt.Println("  ✓ K8s namespace provisioned")\n\tfmt.Println("  ✓ Monitoring dashboard ready")\n\tfmt.Printf("Service %q ready at https://backstage.example.com/catalog/%s\\n", name, name)\n}',
        explanation: 'CLI stub yang mensimulasikan self-service provisioning via platform golden path.',
      },
    },
    {
      id: 'sec-07-callout',
      type: 'callout',
      calloutType: 'tip',
      content: '**Kesimpulan:** Platform engineering memperlakukan platform sebagai produk. Ukur adoption, kurangi cognitive load, dan iterasi golden paths berdasarkan feedback developer.',
    },
  ],
}
