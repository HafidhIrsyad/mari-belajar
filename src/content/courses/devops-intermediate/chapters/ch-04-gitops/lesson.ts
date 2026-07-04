import type { Lesson } from '@/content/types'

export const ch04GitopsLesson: Lesson = {
  id: "lesson-ch-04-gitops",
  estimatedMinutes: 45,
  sections: [
    {
      id: "sec-04-basic-gitops",
      type: 'markdown',
      level: "basic",
      title: "Git sebagai Single Source of Truth",
      content: "## Apa itu GitOps?\n\nGitOps adalah paradigma operasional di mana Git menjadi single source of truth untuk infrastruktur dan aplikasi. Setiap perubahan yang diinginkan dimulai dari commit ke repository Git; agen di cluster kemudian menerapkan perubahan tersebut.\n\n## Pull vs Push Deployment\n\n- **Push deployment**: pipeline CI/CD mendorong perubahan langsung ke cluster, misalnya `kubectl apply` dari GitHub Actions. Risiko: kredensial cluster harus tersedia di luar cluster.\n- **Pull deployment**: agen di cluster seperti ArgoCD menarik manifest dari Git. Cluster hanya perlu akses read ke Git, meminimalkan permukaan serangan.\n\n## Keuntungan GitOps\n\n- Audit trail lengkap melalui history Git.\n- Rollback dengan revert commit.\n- Drift detection otomatis jika seseorang mengubah cluster secara manual.\n- Kolaborasi melalui pull request dan review kode.",
    },
    {
      id: "sec-04-js-example",
      type: 'code-example',
      codeExample: {
        id: "code-04-js",
        filename: "push-deploy.js",
        language: "javascript",
        title: "JavaScript: Simulasi Push Deployment Pipeline",
        code: "const manifest = {\n  apiVersion: 'apps/v1',\n  kind: 'Deployment',\n  metadata: { name: 'api' },\n  spec: { replicas: 3 },\n}\n\nasync function pushDeploy(token, manifest) {\n  console.log('Login ke cluster dengan token...')\n  console.log(`Menerapkan ${manifest.kind}/${manifest.metadata.name}`)\n  await applyManifest(token, manifest)\n  const healthy = await waitForRollout(manifest.metadata.name)\n  if (!healthy) {\n    throw new Error('Rollout gagal')\n  }\n  console.log('Push deploy selesai')\n}\n\nfunction applyManifest(token, manifest) {\n  return new Promise((resolve) => setTimeout(resolve, 400))\n}\nfunction waitForRollout(name) {\n  return new Promise((resolve) => setTimeout(() => resolve(true), 300))\n}\n\npushDeploy('secret-token', manifest).catch(console.error)",
        explanation: "Model push deployment menjalankan apply dari luar cluster. Meskipun umum, model ini memberikan kredensial cluster ke pipeline eksternal dan kurang sesuai dengan prinsip GitOps pull.",
      },
    },
    {
      id: "sec-04-intermediate-argocd",
      type: 'markdown',
      level: "intermediate",
      title: "ArgoCD, Flux, Application Manifests, dan Sync Waves",
      content: "## ArgoCD Architecture\n\nArgoCD terdiri dari:\n\n- **API server**: menyediakan UI dan API untuk mengelola aplikasi.\n- **Repository server**: meng-clone Git repo dan menghasilkan manifest.\n- **Application controller**: membandingkan desired state di Git dengan live state di cluster, lalu melakukan sinkronisasi.\n- **Dex**: opsional, untuk autentikasi SSO.\n\n## Application Manifest\n\nArgoCD Application adalah custom resource yang menunjukkan source Git, target cluster, namespace, dan sync policy. Contoh source dapat berupa plain YAML, Helm chart, Kustomize, atau Jsonnet.\n\n## Flux Architecture\n\nFlux menggunakan GitRepository, Kustomization, HelmRelease, dan ImageUpdateAutomation controller. Flux lebih native dengan Kubernetes controller pattern dan tidak memerlukan database terpisah.\n\n## Sync Waves\n\nSync waves mengontrol urutan deployment. Resource dengan wave lebih rendah diterapkan terlebih dahulu dan harus healthy sebelum wave berikutnya. Berguna untuk dependensi seperti namespace -> config -> database -> aplikasi.\n\n## Health Assessment\n\nArgoCD menilai health resource berdasarkan status workload Kubernetes. Deployment dianggap healthy jika semua replica available. StatefulSet, DaemonSet, Job, dan CRD lain memiliki kriteria health masing-masing.",
    },
    {
      id: "sec-04-ts-example",
      type: 'code-example',
      codeExample: {
        id: "code-04-ts",
        filename: "argocd-app.ts",
        language: "typescript",
        title: "TypeScript: Typed ArgoCD Application Manifest Builder",
        code: "type SyncPolicy = 'manual' | 'automated'\n\ninterface ArgoCDApplication {\n  apiVersion: 'argoproj.io/v1alpha1'\n  kind: 'Application'\n  metadata: { name: string; namespace: string }\n  spec: {\n    project: string\n    source: { repoURL: string; targetRevision: string; path: string }\n    destination: { server: string; namespace: string }\n    syncPolicy: {\n      automated?: { prune?: boolean; selfHeal?: boolean }\n      syncOptions?: string[]\n    }\n  }\n}\n\nfunction buildApp(name: string, repoURL: string, path: string): ArgoCDApplication {\n  return {\n    apiVersion: 'argoproj.io/v1alpha1',\n    kind: 'Application',\n    metadata: { name, namespace: 'argocd' },\n    spec: {\n      project: 'default',\n      source: { repoURL, targetRevision: 'HEAD', path },\n      destination: { server: 'https://kubernetes.default.svc', namespace: name },\n      syncPolicy: {\n        automated: { prune: true, selfHeal: true },\n        syncOptions: ['CreateNamespace=true'],\n      },\n    },\n  }\n}\n\nconsole.log(JSON.stringify(buildApp('order-service', 'https://github.com/org/gitops.git', 'apps/order-service'), null, 2))",
        explanation: "Builder ini memastikan Application manifest ArgoCD memiliki field wajib dan tipe yang benar. Sync policy automated dengan selfHeal menjaga agen terus menyelaraskan cluster dengan Git.",
      },
    },
    {
      id: "sec-04-advanced-gitops",
      type: 'markdown',
      level: "advanced",
      title: "Image Updater, Multi-Cluster GitOps, dan Rollback",
      content: "## Image Updater\n\nArgoCD Image Updater dan Flux Image Automation secara berkala memeriksa registry container dan mengupdate Git dengan tag image baru. Ini memungkinkan continuous deployment tanpa menyimpan kredensial registry di cluster secara berlebihan.\n\n## Multi-Cluster GitOps\n\nDengan ApplicationSet atau Flux Kustomization, satu repository Git dapat mengelola banyak cluster. Pattern umum:\n\n- **App of Apps**: satu aplikasi induk yang mengelola banyak aplikasi anak.\n- **ApplicationSet**: menghasilkan banyak Application berdasarkan generator seperti cluster list, Git directories, atau matrix.\n\n## Rollback via Git\n\nRollback di GitOps semudah revert commit atau memindahkan tag/branch. Karena Git menjadi sumber kebenaran, revert secara otomatis akan disinkronkan oleh agen.\n\n## Secrets in Git\n\nMenyimpan secret plain di Git berbahaya. Solusi:\n\n- **Sealed Secrets**: mengenkripsi secret sehingga hanya cluster target yang dapat membukanya.\n- **SOPS**: mengenkripsi bagian file YAML/JSON dengan KMS.\n- **External Secrets Operator**: mengambil secret dari cloud secret manager atau Vault.\n\n## Webhook vs Polling\n\nPolling Git secara berkala sederhana tetapi menambah latensi. Webhook dari Git provider ke agen GitOps memberikan notifikasi instan saat ada push, mengurangi waktu sinkronisasi.\n\n## Observability GitOps\n\nStatus sinkronisasi, drift, dan error apply dapat diekspos sebagai metrics Prometheus atau ditampilkan di dashboard ArgoCD/Flux.",
    },
    {
      id: "sec-04-advanced-example",
      type: 'code-example',
      codeExample: {
        id: "code-04-advanced",
        filename: "argocd-application.yaml",
        language: "yaml",
        title: "ArgoCD: Application Manifest untuk GitOps",
        code: "apiVersion: argoproj.io/v1alpha1\nkind: Application\nmetadata:\n  name: order-service\n  namespace: argocd\n  finalizers:\n    - resources-finalizer.argocd.argoproj.io\nspec:\n  project: default\n  source:\n    repoURL: https://github.com/org/gitops.git\n    targetRevision: main\n    path: apps/order-service\n  destination:\n    server: https://kubernetes.default.svc\n    namespace: order-service\n  syncPolicy:\n    automated:\n      prune: true\n      selfHeal: true\n    syncOptions:\n      - CreateNamespace=true\n    retry:\n      limit: 3\n      backoff:\n        duration: 5s\n        factor: 2\n        maxDuration: 3m",
        explanation: "Application manifest ArgoCD mendeklarasikan desired state dari Git repository. Sync policy automated dengan selfHeal memastikan cluster terus selaras dengan Git — inti dari pull-based GitOps deployment.",
      },
    },
    {
      id: "sec-04-summary",
      type: 'callout',
      calloutType: "info",
      content: "**Kesimpulan:** GitOps menjadikan Git sumber kebenaran, memungkinkan audit, rollback, dan drift detection yang kuat. ArgoCD dan Flux mengotomatisasi pull-based deployment, sementara sync waves dan image updater mendukung alur kerja production yang kompleks.",
    },
  ],
}
