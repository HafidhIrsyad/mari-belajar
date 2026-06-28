import type { Lesson } from '@/content/types'

export const ch08CapstoneDevopsProjectLesson: Lesson = {
  id: 'lesson-ch-08-capstone-devops-project',
  estimatedMinutes: 60,
  sections: [
    {
      id: 'sec-08-basic',
      type: 'markdown',
      level: 'basic',
      title: 'End-to-End Pipeline Overview',
      content: '## Arsitektur Capstone\nAplikasi full-stack:\n- **Frontend**: React (Vite) di-deploy sebagai static assets atau SSR.\n- **Backend**: Go atau Node.js REST API.\n- **Database**: PostgreSQL dengan migration.\n\n## Pipeline Flow\n```\nCommit → GitHub Actions → Lint/Test → Docker Build → Trivy Scan → Push Registry → Update GitOps Repo → ArgoCD Sync → K8s Deploy\n```\n\n## Komponen\n1. **CI** (GitHub Actions): build, test, scan, push image.\n2. **Registry** (GHCR/ECR): menyimpan container image.\n3. **GitOps repo**: manifest K8s dengan image tag dari CI.\n4. **ArgoCD**: sync manifest ke cluster.\n5. **Observability**: Prometheus scrape metrics, Grafana dashboard.',
    },
    {
      id: 'sec-08-js',
      type: 'code-example',
      codeExample: {
        id: 'code-08-js',
        filename: 'pipeline-stages.js',
        language: 'javascript',
        title: 'JavaScript: Pipeline Stage Runner',
        code: 'const stages = [\n  { name: \'lint\', run: async () => { console.log(\'✓ ESLint passed\') } },\n  { name: \'test\', run: async () => { console.log(\'✓ 42 tests passed\') } },\n  { name: \'build\', run: async () => { console.log(\'✓ Docker image built: app:v1.2.3\') } },\n  { name: \'scan\', run: async () => { console.log(\'✓ Trivy: 0 critical CVEs\') } },\n  { name: \'push\', run: async () => { console.log(\'✓ Pushed to ghcr.io/org/app:v1.2.3\') } },\n  { name: \'deploy\', run: async () => { console.log(\'✓ ArgoCD synced to cluster\') } },\n]\n\nasync function runPipeline() {\n  for (const stage of stages) {\n    console.log(`[${stage.name}]`)\n    await stage.run()\n  }\n  console.log(\'Pipeline complete ✓\')\n}\nrunPipeline()',
        explanation: 'Simulasi pipeline CI/CD end-to-end dari lint hingga deploy.',
      },
    },
    {
      id: 'sec-08-intermediate',
      type: 'markdown',
      level: 'intermediate',
      title: 'GitHub Actions → Docker → ArgoCD',
      content: '## GitHub Actions Workflow\n```yaml\non: push:\n  branches: [main]\njobs:\n  ci:\n    runs-on: ubuntu-latest\n    steps:\n      - uses: actions/checkout@v4\n      - run: npm ci && npm test\n      - run: docker build -t ghcr.io/org/app:${{ github.sha }} .\n      - run: trivy image --exit-code 1 ghcr.io/org/app:${{ github.sha }}\n      - run: docker push ghcr.io/org/app:${{ github.sha }}\n      - run: yq -i \'.spec.template.spec.containers[0].image = "ghcr.io/org/app:${{ github.sha }}"\' k8s/deployment.yaml\n      - run: git commit -am "deploy ${{ github.sha }}" && git push\n```\n\n## ArgoCD Application\nArgoCD memonitor GitOps repo. Saat manifest berubah (image tag baru), ArgoCD otomatis sync ke cluster.\n\n## Health Checks\nDeployment manifest harus include liveness dan readiness probe agar K8s dapat mendeteksi unhealthy pod.',
    },
    {
      id: 'sec-08-ts',
      type: 'code-example',
      codeExample: {
        id: 'code-08-ts',
        filename: 'argocd-app.ts',
        language: 'typescript',
        title: 'TypeScript: Model ArgoCD Application',
        code: 'interface ArgoCDApplication {\n  apiVersion: \'argoproj.io/v1alpha1\'\n  kind: \'Application\'\n  metadata: { name: string; namespace: string }\n  spec: {\n    project: string\n    source: { repoURL: string; path: string; targetRevision: string }\n    destination: { server: string; namespace: string }\n    syncPolicy: {\n      automated: { prune: boolean; selfHeal: boolean }\n      syncOptions: string[]\n    }\n  }\n}\n\nconst capstoneApp: ArgoCDApplication = {\n  apiVersion: \'argoproj.io/v1alpha1\',\n  kind: \'Application\',\n  metadata: { name: \'mari-belajar-api\', namespace: \'argocd\' },\n  spec: {\n    project: \'default\',\n    source: {\n      repoURL: \'https://github.com/org/gitops.git\',\n      path: \'apps/mari-belajar-api\',\n      targetRevision: \'main\',\n    },\n    destination: { server: \'https://kubernetes.default.svc\', namespace: \'production\' },\n    syncPolicy: {\n      automated: { prune: true, selfHeal: true },\n      syncOptions: [\'CreateNamespace=true\'],\n    },\n  },\n}\nconsole.log(capstoneApp.metadata.name)',
        explanation: 'ArgoCD Application dengan auto-sync dan self-heal untuk capstone deployment.',
      },
    },
    {
      id: 'sec-08-advanced',
      type: 'markdown',
      level: 'advanced',
      title: 'Observability, Rollback, dan Security',
      content: '## Observability Stack\n- **Metrics**: Prometheus scrape `/metrics` dari backend Go/Node.\n- **Dashboards**: Grafana panel untuk request rate, error rate, latency p99.\n- **Alerting**: SLO-based alert jika error rate > 1% selama 5 menit.\n- **Logs**: structured JSON log ke Loki atau cloud logging.\n\n## Rollback Strategy\n1. **ArgoCD rollback**: revert ke Git revision sebelumnya.\n2. **Progressive delivery abort**: Argo Rollouts abort canary jika analysis gagal.\n3. **Database migration rollback**: backward-compatible migration + down script.\n\n## Security Scanning\n- Trivy scan image di CI (block jika critical CVE).\n- OPA/Gatekeeper policy: wajib non-root, resource limits.\n- NetworkPolicy: hanya frontend → backend → database.\n\n## Incident Response\nRunbook untuk setiap alert. Postmortem blameless setelah incident. Error budget policy menentukan freeze release jika SLO violated.',
    },
    {
      id: 'sec-08-go',
      type: 'code-example',
      codeExample: {
        id: 'code-08-go',
        filename: 'health-handler.go',
        language: 'go',
        title: 'Go: Health Check Handler untuk K8s Probes',
        code: 'package main\n\nimport (\n\t"encoding/json"\n\t"net/http"\n\t"time"\n)\n\ntype HealthResponse struct {\n\tStatus    string `json:"status"`\n\tTimestamp string `json:"timestamp"`\n\tVersion   string `json:"version"`\n}\n\nfunc healthHandler(w http.ResponseWriter, r *http.Request) {\n\tw.Header().Set("Content-Type", "application/json")\n\tjson.NewEncoder(w).Encode(HealthResponse{\n\t\tStatus:    "ok",\n\t\tTimestamp: time.Now().UTC().Format(time.RFC3339),\n\t\tVersion:   "v1.2.3",\n\t})\n}\n\nfunc readinessHandler(db func() error) http.HandlerFunc {\n\treturn func(w http.ResponseWriter, r *http.Request) {\n\t\tif err := db(); err != nil {\n\t\t\tw.WriteHeader(http.StatusServiceUnavailable)\n\t\t\treturn\n\t\t}\n\t\tw.WriteHeader(http.StatusOK)\n\t}\n}\n\nfunc main() {\n\thttp.HandleFunc("/healthz", healthHandler)\n\thttp.HandleFunc("/readyz", readinessHandler(func() error { return nil }))\n\thttp.ListenAndServe(":8080", nil)\n}',
        explanation: 'Health dan readiness handler untuk Kubernetes liveness/readiness probes di capstone project.',
      },
    },
    {
      id: 'sec-08-callout',
      type: 'callout',
      calloutType: 'info',
      content: '**Kesimpulan:** Capstone DevOps menggabungkan CI/CD, GitOps, observability, security, dan incident response. Ini adalah fondasi untuk membangun dan mengoperasikan sistem production-grade.',
    },
  ],
}
