import type { Lesson } from '@/content/types'

export const ch06CloudNativeSecurityLesson: Lesson = {
  id: 'lesson-ch-06-cloud-native-security',
  estimatedMinutes: 50,
  sections: [
    {
      id: 'sec-06-basic',
      type: 'markdown',
      level: 'basic',
      title: 'Container Security Basics',
      content: '## Prinsip Keamanan Container\n1. **Minimal base image**: gunakan distroless atau alpine, kurangi attack surface.\n2. **Non-root user**: jalankan proses sebagai user non-privileged.\n3. **No secrets in image**: jangan embed credential di Dockerfile atau layer image.\n4. **Immutable tags**: gunakan digest atau semver tag, hindari `:latest` di production.\n\n## Image Scanning\nTool seperti Trivy, Grype, atau Snyk Container scan layer image untuk CVE. Integrasikan scanning ke CI pipeline sebelum push ke registry.\n\n## Read-Only Root Filesystem\nMount root filesystem sebagai read-only; gunakan emptyDir atau volume untuk data yang perlu ditulis.',
    },
    {
      id: 'sec-06-js',
      type: 'code-example',
      codeExample: {
        id: 'code-06-js',
        filename: 'dockerfile-check.js',
        language: 'javascript',
        title: 'JavaScript: Validasi Dockerfile Security',
        code: 'const dockerfile = `\nFROM node:20-alpine\nRUN addgroup -S app && adduser -S app -G app\nWORKDIR /app\nCOPY --chown=app:app package*.json ./\nRUN npm ci --only=production\nUSER app\nCMD ["node", "server.js"]\n`\n\nconst checks = [\n  { rule: \'Non-root USER\', pass: /USER\\s+\\w+/.test(dockerfile) && !/USER\\s+root/.test(dockerfile) },\n  { rule: \'Alpine base\', pass: /alpine/.test(dockerfile) },\n  { rule: \'No COPY secret\', pass: !/COPY.*\\.env/.test(dockerfile) },\n]\nchecks.forEach(c => console.log(c.pass ? \'✓\' : \'✗\', c.rule))',
        explanation: 'Script validasi sederhana untuk memeriksa best practice keamanan Dockerfile.',
      },
    },
    {
      id: 'sec-06-intermediate',
      type: 'markdown',
      level: 'intermediate',
      title: 'RBAC, Network Policies, dan Pod Security',
      content: '## Kubernetes RBAC\n- **Role/ClusterRole**: mendefinisikan permission (verbs + resources).\n- **RoleBinding/ClusterRoleBinding**: mengaitkan role ke user/group/serviceAccount.\n- Principle of least privilege: berikan permission minimal yang diperlukan.\n\n## Network Policies\nNetworkPolicy menggunakan label selector untuk mengizinkan/menolak traffic. Default deny all lalu buka port yang diperlukan.\n\n## Pod Security Standards\nTiga level: **Privileged** (tidak dibatasi), **Baseline** (minimal restriction), **Restricted** (paling ketat). Gunakan Pod Security Admission untuk enforce level per namespace.',
    },
    {
      id: 'sec-06-ts',
      type: 'code-example',
      codeExample: {
        id: 'code-06-ts',
        filename: 'network-policy.ts',
        language: 'typescript',
        title: 'TypeScript: Model NetworkPolicy',
        code: 'interface NetworkPolicy {\n  apiVersion: \'networking.k8s.io/v1\'\n  kind: \'NetworkPolicy\'\n  metadata: { name: string; namespace: string }\n  spec: {\n    podSelector: { matchLabels: Record<string, string> }\n    policyTypes: (\'Ingress\' | \'Egress\')[]\n    ingress: {\n      from: { podSelector?: { matchLabels: Record<string, string> } }[]\n      ports: { protocol: string; port: number }[]\n    }[]\n  }\n}\n\nconst apiPolicy: NetworkPolicy = {\n  apiVersion: \'networking.k8s.io/v1\',\n  kind: \'NetworkPolicy\',\n  metadata: { name: \'allow-from-frontend\', namespace: \'production\' },\n  spec: {\n    podSelector: { matchLabels: { app: \'api\' } },\n    policyTypes: [\'Ingress\'],\n    ingress: [{\n      from: [{ podSelector: { matchLabels: { app: \'frontend\' } } }],\n      ports: [{ protocol: \'TCP\', port: 8080 }],\n    }],\n  },\n}\nconsole.log(apiPolicy.metadata.name)',
        explanation: 'NetworkPolicy yang hanya mengizinkan traffic dari frontend ke API di port 8080.',
      },
    },
    {
      id: 'sec-06-advanced',
      type: 'markdown',
      level: 'advanced',
      title: 'Supply Chain Security dan Runtime Security',
      content: '## Supply Chain Security\n- **SLSA levels**: dari source provenance (L1) hingga hermetic builds (L3+).\n- **Sigstore/Cosign**: sign container image dan verify sebelum deploy.\n- **SBOM**: Software Bill of Materials mendokumentasikan dependensi image.\n\n## Admission Controllers\nGatekeeper/Kyverno menegakkan policy sebelum objek disimpan: wajib label, larang `:latest`, enforce resource limits.\n\n## Runtime Security (Falco)\nFalco memonitor syscall dan event kernel untuk mendeteksi:\n- Shell di container production\n- File write di direktori sensitif\n- Unexpected network connection\n\n## Zero-Trust di Cluster\nKombinasikan RBAC, NetworkPolicy, mTLS (service mesh), dan runtime detection untuk defense in depth.',
    },
    {
      id: 'sec-06-go',
      type: 'code-example',
      codeExample: {
        id: 'code-06-go',
        filename: 'secure-image.go',
        language: 'go',
        title: 'Go: Secure HTTP Server',
        code: 'package main\n\nimport (\n\t"log"\n\t"net/http"\n\t"os"\n\t"os/user"\n)\n\nfunc main() {\n\tu, err := user.Current()\n\tif err == nil && u.Uid == "0" {\n\t\tlog.Fatal("refusing to run as root")\n\t}\n\n\tmux := http.NewServeMux()\n\tmux.HandleFunc("/healthz", func(w http.ResponseWriter, r *http.Request) {\n\t\tw.WriteHeader(http.StatusOK)\n\t})\n\n\tsrv := &http.Server{\n\t\tAddr:              ":8080",\n\t\tHandler:           mux,\n\t\tReadHeaderTimeout: 5e9,\n\t}\n\tlog.Fatal(srv.ListenAndServe())\n}',
        explanation: 'Server Go yang menolak berjalan sebagai root dan menggunakan timeout untuk mitigasi slowloris.',
      },
    },
    {
      id: 'sec-06-callout',
      type: 'callout',
      calloutType: 'warning',
      content: '**Kesimpulan:** Keamanan cloud native adalah defense in depth. Scan image di CI, enforce policy di admission, batasi network di runtime, dan monitor anomali dengan Falco.',
    },
  ],
}
