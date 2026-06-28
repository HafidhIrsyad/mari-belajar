import type { Lesson } from '@/content/types'

export const ch03GitopsLanjutanLesson: Lesson = {
  id: 'lesson-ch-03-gitops-lanjutan',
  estimatedMinutes: 50,
  sections: [
    {
      id: 'sec-03-basic',
      type: 'markdown',
      level: 'basic',
      title: 'Git sebagai Single Source of Truth',
      content: '## GitOps Workflow\nDalam GitOps, setiap perubahan infrastruktur diajukan melalui pull request ke repository Git. Tool seperti ArgoCD atau Flux terus menyinkronkan state cluster dengan state Git.\n\n## Sinkronisasi dan Drift\n- **Sync**: menerapkan manifest Git ke cluster.\n- **Drift**: perbedaan antara cluster dan Git. ArgoCD mendeteksi drift dan dapat auto-sync.\n- **Sync waves**: mengatur urutan deployment antar resource.',
    },
    {
      id: 'sec-03-js',
      type: 'code-example',
      codeExample: {
        id: 'code-03-js',
        filename: 'gitops-drift.js',
        language: 'javascript',
        title: 'JavaScript: Deteksi Drift Sederhana',
        code: 'const gitState = { replicas: 3, image: \'app:v2\' }\nconst clusterState = { replicas: 3, image: \'app:v1\' }\n\nfunction detectDrift(git, cluster) {\n  const diffs = []\n  for (const key of Object.keys(git)) {\n    if (git[key] !== cluster[key]) {\n      diffs.push(`${key}: ${cluster[key]} -> ${git[key]}`)\n    }\n  }\n  return diffs\n}\n\nconst drift = detectDrift(gitState, clusterState)\nconsole.log(drift.length ? \'Drift detected:\' : \'In sync\')\ndrift.forEach(d => console.log(\' -\', d))',
        explanation: 'Deteksi drift sederhana untuk memahami mengapa GitOps tool perlu melakukan sync.',
      },
    },
    {
      id: 'sec-03-intermediate',
      type: 'markdown',
      level: 'intermediate',
      title: 'ApplicationSet, Secret, dan Progressive Delivery',
      content: '## ApplicationSet\nApplicationSet menghasilkan satu atau banyak ArgoCD Application dari generator seperti List, Cluster, Git, atau Matrix. Berguna untuk multi-tenant dan multi-cluster.\n\n## Secret di Git\nSecret tidak boleh disimpan plaintext. Solusi:\n- **Sealed Secrets**: mengenkripsi Secret menjadi SealedSecret yang aman untuk Git.\n- **SOPS**: mengenkripsi file YAML/JSON dengan KMS/PGP.\n- **External Secrets Operator**: mengambil secret dari Vault atau cloud secret manager.\n\n## Progressive Delivery\nArgo Rollouts menyediakan BlueGreen, Canary, dan AnalysisRun. Deployment bergradasi sambil memantau metrics; rollback otomatis jika gagal.',
    },
    {
      id: 'sec-03-ts',
      type: 'code-example',
      codeExample: {
        id: 'code-03-ts',
        filename: 'applicationset.ts',
        language: 'typescript',
        title: 'TypeScript: Model ApplicationSet',
        code: 'interface ApplicationSet {\n  name: string\n  generators: { list: { elements: { cluster: string; url: string }[] } }[]\n  template: {\n    metadata: { name: string }\n    spec: {\n      project: string\n      source: { repoURL: string; path: string; targetRevision: string }\n      destination: { server: string; namespace: string }\n    }\n  }\n}\n\nconst multiCluster: ApplicationSet = {\n  name: \'guestbook\',\n  generators: [{\n    list: {\n      elements: [\n        { cluster: \'prod-us\', url: \'https://prod-us.k8s.local\' },\n        { cluster: \'prod-eu\', url: \'https://prod-eu.k8s.local\' },\n      ],\n    },\n  }],\n  template: {\n    metadata: { name: \'{{cluster}}-guestbook\' },\n    spec: {\n      project: \'default\',\n      source: { repoURL: \'https://github.com/org/apps.git\', path: \'guestbook\', targetRevision: \'HEAD\' },\n      destination: { server: \'{{url}}\', namespace: \'guestbook\' },\n    },\n  },\n}\nconsole.log(multiCluster.template.metadata.name)',
        explanation: 'Model ApplicationSet dengan generator list untuk deploy ke beberapa cluster.',
      },
    },
    {
      id: 'sec-03-advanced',
      type: 'markdown',
      level: 'advanced',
      title: 'Multi-Cluster, Disaster Recovery, dan Policy Enforcement',
      content: '## Multi-Cluster GitOps\n- Management cluster menjalankan ArgoCD dan mengelola remote clusters.\n- Cluster secrets menyimpan kubeconfig setiap target cluster.\n- ApplicationSet memudahkan propagasi aplikasi ke banyak cluster.\n\n## Disaster Recovery\nKarena state cluster didokumentasikan di Git, pemulihan cluster baru dapat dilakukan dengan menginstal GitOps tool dan menunjuk ke repository. RTO/RPO menjadi lebih dapat diprediksi.\n\n## Policy Enforcement\nIntegrasikan OPA/Gatekeeper atau Kyverno untuk memvalidasi manifest sebelum deployment. Kebijakan dapat melarang image tag `:latest`, memaksa label, atau membatasi resource limits.',
    },
    {
      id: 'sec-03-go',
      type: 'code-example',
      codeExample: {
        id: 'code-03-go',
        filename: 'manifest-generator.go',
        language: 'go',
        title: 'Go: Generator Manifest Kubernetes',
        code: 'package main\n\nimport (\n\t"fmt"\n)\n\ntype Manifest struct {\n\tAPIVersion string\n\tKind       string\n\tMetadata   map[string]string\n\tSpec       map[string]interface{}\n}\n\nfunc (m Manifest) String() string {\n\treturn fmt.Sprintf("apiVersion: %s\\nkind: %s\\nmetadata:\\n  name: %s", m.APIVersion, m.Kind, m.Metadata["name"])\n}\n\nfunc main() {\n\tdeploy := Manifest{\n\t\tAPIVersion: "apps/v1",\n\t\tKind:       "Deployment",\n\t\tMetadata:   map[string]string{"name": "api"},\n\t\tSpec: map[string]interface{}{\n\t\t\t"replicas": 3,\n\t\t},\n\t}\n\tfmt.Println(deploy)\n}',
        explanation: 'Generator manifest ini meniru proses template yang menghasilkan YAML untuk GitOps repository.',
      },
    },
    {
      id: 'sec-03-callout',
      type: 'callout',
      calloutType: 'info',
      content: '**Kesimpulan:** Gunakan branch protection, required review, dan CI untuk validasi manifest. Jangan menyimpan secret plaintext di Git meskipun repository private.',
    },
  ],
}
