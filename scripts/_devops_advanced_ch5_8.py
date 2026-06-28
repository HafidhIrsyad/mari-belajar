# Chapters 5-8 data for generate_devops_advanced.py

def get_chapters_5_8():
    chapters = []

    ch5 = {
        'slug': 'ch-05-advanced-monitoring-alerting',
        'title': 'Advanced Monitoring & Alerting',
        'summary': 'Menguasai Prometheus queries, Grafana dashboards, Alertmanager routing, SLO-based alerting, dan anomaly detection untuk observability production.',
        'estimatedMinutes': 50,
        'learningObjectives': [
            'Menulis PromQL query untuk metrik dan alerting.',
            'Merancang Grafana dashboard dan alert rules.',
            'Mengkonfigurasi Alertmanager routing dan silencing.',
            'Menerapkan SLO-based alerting dengan burn rate.',
            'Memahami anomaly detection dan AIOps intro.',
        ],
        'summaryPoints': [
            'Prometheus menyimpan time-series metrics dengan label sebagai dimensi.',
            'Grafana memvisualisasi metrik dan mendefinisikan alert rules.',
            'Alertmanager mengelola routing, grouping, silencing, dan on-call.',
            'SLO-based alerting mengurangi noise dengan fokus pada error budget.',
            'Anomaly detection mendeteksi pola abnormal tanpa threshold statis.',
        ],
        'references': [
            {'id': 'ref-05-01', 'title': 'Prometheus Docs — Alerting', 'url': 'https://prometheus.io/docs/alerting/latest/overview/', 'description': 'Dokumentasi resmi Alertmanager dan integrasi alerting Prometheus.', 'type': 'documentation'},
            {'id': 'ref-05-02', 'title': 'Grafana Docs — Alerting', 'url': 'https://grafana.com/docs/grafana/latest/alerting/', 'description': 'Panduan alert rules, contact points, dan notification policies di Grafana.', 'type': 'documentation'},
            {'id': 'ref-05-03', 'title': 'Google SRE — Alerting on SLOs', 'url': 'https://sre.google/workbook/alerting-on-slos/', 'description': 'Panduan alerting berbasis SLO dan burn rate dari Google SRE Workbook.', 'type': 'documentation'},
            {'id': 'ref-05-04', 'title': 'Datadog — Monitoring', 'url': 'https://docs.datadoghq.com/monitors/', 'description': 'Dokumentasi monitor dan alerting di platform observability Datadog.', 'type': 'documentation'},
            {'id': 'ref-05-05', 'title': 'prometheus/client_golang', 'url': 'https://github.com/prometheus/client_golang', 'description': 'Library Go resmi untuk mengekspos metrik ke Prometheus.', 'type': 'documentation'},
        ],
        'quiz': {
            'id': 'quiz-ch-05-advanced-monitoring-alerting',
            'title': 'Quiz: Advanced Monitoring & Alerting',
            'passingScore': 8,
            'questions': [
                {'id': 'q-05-01', 'order': 1, 'prompt': 'PromQL rate() digunakan untuk?', 'options': ['Menghitung perubahan per detik dari counter', 'Menyimpan log', 'Mengganti Grafana', 'Menghapus metrik'], 'correctOptionIndex': 0, 'explanation': 'rate() menghitung perubahan rata-rata per detik dari counter time series.'},
                {'id': 'q-05-02', 'order': 2, 'prompt': 'Alertmanager berfungsi?', 'options': ['Menyimpan metrik', 'Routing, grouping, dan silencing alert', 'Build container', 'Deploy ke K8s'], 'correctOptionIndex': 1, 'explanation': 'Alertmanager menerima alert dari Prometheus/Grafana dan mengelola routing ke on-call.'},
                {'id': 'q-05-03', 'order': 3, 'prompt': 'SLO-based alerting fokus pada?', 'options': ['CPU threshold saja', 'Error budget burn rate', 'Jumlah pod', 'Git commit'], 'correctOptionIndex': 1, 'explanation': 'Alert berbasis SLO memantau burn rate error budget, bukan threshold arbitrer.'},
                {'id': 'q-05-04', 'order': 4, 'prompt': 'Silence di Alertmanager?', 'options': ['Menghapus alert permanen', 'Menekan alert sementara untuk maintenance', 'Menghentikan Prometheus', 'Menghapus dashboard'], 'correctOptionIndex': 1, 'explanation': 'Silence menekan alert selama periode tertentu, misalnya saat maintenance terencana.'},
                {'id': 'q-05-05', 'order': 5, 'prompt': 'Histogram vs Counter?', 'options': ['Histogram mengukur distribusi; counter hanya naik', 'Sama saja', 'Counter untuk log', 'Histogram untuk text'], 'correctOptionIndex': 0, 'explanation': 'Counter monotonik naik; histogram mengumpulkan observasi dalam bucket untuk distribusi.'},
                {'id': 'q-05-06', 'order': 6, 'prompt': 'On-call integration biasanya via?', 'options': ['PagerDuty/Opsgenie webhook', 'FTP', 'SMTP saja', 'Git push'], 'correctOptionIndex': 0, 'explanation': 'Alertmanager mengirim notifikasi ke PagerDuty, Opsgenie, Slack, atau webhook lain.'},
                {'id': 'q-05-07', 'order': 7, 'prompt': 'Anomaly detection berguna karena?', 'options': ['Tidak perlu threshold manual', 'Menghapus semua alert', 'Mengganti SLO', 'Menonaktifkan monitoring'], 'correctOptionIndex': 0, 'explanation': 'Anomaly detection mendeteksi pola abnormal secara otomatis tanpa threshold statis.'},
                {'id': 'q-05-08', 'order': 8, 'prompt': 'Recording rule di Prometheus?', 'options': ['Menyimpan query hasil sebagai metrik baru', 'Menghapus data lama', 'Mengganti Alertmanager', 'Backup etcd'], 'correctOptionIndex': 0, 'explanation': 'Recording rule mengevaluasi PromQL dan menyimpan hasilnya sebagai time series baru.'},
            ],
        },
        'lesson': {
            'id': 'lesson-ch-05-advanced-monitoring-alerting',
            'estimatedMinutes': 50,
            'sections': [
                {'id': 'sec-05-basic', 'type': 'markdown', 'level': 'basic', 'title': 'Prometheus, Grafana, dan Alert Rules', 'content': '## Prometheus Metrics\nPrometheus mengumpulkan metrik sebagai time series dengan label. Tipe utama: **Counter** (monotonik naik), **Gauge** (naik-turun), **Histogram** (distribusi), **Summary** (quantile).\n\n## PromQL Dasar\n- `rate(http_requests_total[5m])`: rate request per detik.\n- `sum by (service) (rate(...))`: agregasi per label.\n- `histogram_quantile(0.99, ...)`: hitung p99 latency.\n\n## Grafana Dashboards\nGrafana memvisualisasi metrik dari Prometheus, Loki, Tempo, dan sumber lain. Panel umum: time series, stat, gauge, heatmap.\n\n## Alert Rules\nAlert rule mengevaluasi PromQL expression secara periodik. Jika kondisi terpenuhi selama `for` duration, alert firing dikirim ke Alertmanager.'},
                {'id': 'sec-05-js', 'type': 'code-example', 'codeExample': {'id': 'code-05-js', 'filename': 'console-metric.js', 'language': 'javascript', 'title': 'JavaScript: Simulasi Counter Metric', 'code': "const metrics = { http_requests_total: 0 }\n\nfunction recordRequest(status) {\n  metrics.http_requests_total++\n  console.log(`[metric] http_requests_total=${metrics.http_requests_total} status=${status}`)\n}\n\nrecordRequest(200)\nrecordRequest(200)\nrecordRequest(500)\nconsole.log('Rate (simulated):', metrics.http_requests_total / 60, 'req/s over 1 min')", 'explanation': 'Simulasi counter metric yang di-increment setiap request, dasar konsep Prometheus counter.'}},
                {'id': 'sec-05-intermediate', 'type': 'markdown', 'level': 'intermediate', 'title': 'Alertmanager Routing dan On-Call', 'content': '## Alertmanager Pipeline\n1. **Grouping**: gabungkan alert serupa (misal per service).\n2. **Inhibition**: tekan alert downstream jika upstream sudah firing.\n3. **Silencing**: tekan alert sementara (maintenance window).\n4. **Routing**: kirim ke receiver yang tepat (PagerDuty, Slack, email).\n\n## Routing Tree\nAlertmanager menggunakan label matcher untuk routing. Contoh: `severity=critical` → PagerDuty; `severity=warning` → Slack.\n\n## On-Call Integration\nIntegrasi dengan PagerDuty/Opsgenie memastikan alert critical memicu page ke engineer on-call dengan escalation policy.'},
                {'id': 'sec-05-ts', 'type': 'code-example', 'codeExample': {'id': 'code-05-ts', 'filename': 'promql-query.ts', 'language': 'typescript', 'title': 'TypeScript: Model Alert Rule', 'code': "interface AlertRule {\n  alert: string\n  expr: string\n  for: string\n  labels: Record<string, string>\n  annotations: Record<string, string>\n}\n\nconst highErrorRate: AlertRule = {\n  alert: 'HighErrorRate',\n  expr: 'sum(rate(http_requests_total{status=~\"5..\"}[5m])) / sum(rate(http_requests_total[5m])) > 0.01',\n  for: '5m',\n  labels: { severity: 'critical', team: 'platform' },\n  annotations: {\n    summary: 'Error rate above 1%',\n    runbook: 'https://wiki.example.com/runbooks/high-error-rate',\n  },\n}\nconsole.log(highErrorRate.alert, highErrorRate.expr)", 'explanation': 'Model alert rule Prometheus dengan expression, label, dan annotation runbook.'}},
                {'id': 'sec-05-advanced', 'type': 'markdown', 'level': 'advanced', 'title': 'SLO-Based Alerting dan Anomaly Detection', 'content': '## SLO-Based Alerting\nAlih-alih alert saat CPU > 80%, alert berdasarkan burn rate error budget:\n- **Fast burn** (14.4x): page segera, budget habis dalam 1 jam.\n- **Slow burn** (2x): ticket, budget habis dalam 3 hari.\n\n## Multi-Window Multi-Burn-Rate\nKombinasi window pendek dan panjang mengurangi false positive.\n\n## Anomaly Detection\nMachine learning mendeteksi pola abnormal pada metrik tanpa threshold manual. Berguna untuk metrik dengan pola musiman.\n\n## AIOps Intro\nAIOps menggabungkan ML, automation, dan observability untuk root cause analysis, incident correlation, dan auto-remediation.'},
                {'id': 'sec-05-go', 'type': 'code-example', 'codeExample': {'id': 'code-05-go', 'filename': 'metric-exporter.go', 'language': 'go', 'title': 'Go: Prometheus Metric Exporter', 'code': "package main\n\nimport (\n\t\"net/http\"\n\n\t\"github.com/prometheus/client_golang/prometheus\"\n\t\"github.com/prometheus/client_golang/prometheus/promhttp\"\n)\n\nvar requestsTotal = prometheus.NewCounterVec(\n\tprometheus.CounterOpts{\n\t\tName: \"http_requests_total\",\n\t\tHelp: \"Total HTTP requests\",\n\t},\n\t[]string{\"method\", \"status\"},\n)\n\nfunc init() {\n\tprometheus.MustRegister(requestsTotal)\n}\n\nfunc main() {\n\thttp.HandleFunc(\"/metrics\", promhttp.Handler().ServeHTTP)\n\thttp.HandleFunc(\"/\", func(w http.ResponseWriter, r *http.Request) {\n\t\trequestsTotal.WithLabelValues(r.Method, \"200\").Inc()\n\t\tw.WriteHeader(http.StatusOK)\n\t})\n\thttp.ListenAndServe(\":8080\", nil)\n}", 'explanation': 'Exporter Go standar yang mengekspos counter http_requests_total ke endpoint /metrics.'}},
                {'id': 'sec-05-callout', 'type': 'callout', 'calloutType': 'info', 'content': '**Kesimpulan:** Alert harus actionable dan terhubung runbook. Kurangi noise dengan SLO-based alerting dan grouping. Setiap alert perlu owner dan escalation path.'},
            ],
        },
    }
    chapters.append(ch5)

    ch6 = {
        'slug': 'ch-06-cloud-native-security',
        'title': 'Cloud Native Security',
        'summary': 'Menguasai container security, image scanning, Kubernetes RBAC, network policies, pod security standards, supply chain security, dan runtime security dengan Falco.',
        'estimatedMinutes': 50,
        'learningObjectives': [
            'Menerapkan best practice keamanan container dan Dockerfile.',
            'Mengkonfigurasi Kubernetes RBAC dan network policies.',
            'Memahami pod security standards dan admission controllers.',
            'Menerapkan supply chain security dengan SLSA.',
            'Menggunakan runtime security tools seperti Falco.',
        ],
        'summaryPoints': [
            'Container security dimulai dari Dockerfile: non-root user, minimal base image, no secrets.',
            'RBAC mengontrol siapa dapat melakukan apa di cluster Kubernetes.',
            'NetworkPolicy membatasi lalu lintas antar Pod.',
            'Supply chain security melindungi pipeline build dari tampering.',
            'Runtime security mendeteksi perilaku anomali saat container berjalan.',
        ],
        'references': [
            {'id': 'ref-06-01', 'title': 'Kubernetes Docs — Security', 'url': 'https://kubernetes.io/docs/concepts/security/', 'description': 'Dokumentasi resmi keamanan Kubernetes termasuk RBAC, PSP, dan network policy.', 'type': 'documentation'},
            {'id': 'ref-06-02', 'title': 'Falco Docs', 'url': 'https://falco.org/docs/', 'description': 'Runtime security engine untuk mendeteksi perilaku anomali di container dan host.', 'type': 'documentation'},
            {'id': 'ref-06-03', 'title': 'OPA Gatekeeper', 'url': 'https://open-policy-agent.github.io/gatekeeper/website/docs/', 'description': 'Policy engine untuk Kubernetes berbasis Open Policy Agent.', 'type': 'documentation'},
            {'id': 'ref-06-04', 'title': 'SLSA', 'url': 'https://slsa.dev/', 'description': 'Supply-chain Levels for Software Artifacts — framework keamanan supply chain.', 'type': 'documentation'},
            {'id': 'ref-06-05', 'title': 'OWASP — Container Security', 'url': 'https://cheatsheetseries.owasp.org/cheatsheets/Docker_Security_Cheat_Sheet.html', 'description': 'Cheat sheet keamanan container dari OWASP.', 'type': 'article'},
        ],
        'quiz': {
            'id': 'quiz-ch-06-cloud-native-security',
            'title': 'Quiz: Cloud Native Security',
            'passingScore': 8,
            'questions': [
                {'id': 'q-06-01', 'order': 1, 'prompt': 'Best practice Dockerfile?', 'options': ['Run as root', 'Non-root user dan minimal base image', 'Simpan secret di ENV', 'Gunakan latest tag'], 'correctOptionIndex': 1, 'explanation': 'Non-root user dan minimal base image mengurangi attack surface container.'},
                {'id': 'q-06-02', 'order': 2, 'prompt': 'Image scanning mendeteksi?', 'options': ['CVE di layer image', 'Bug di kode aplikasi', 'DNS error', 'Network latency'], 'correctOptionIndex': 0, 'explanation': 'Image scanner menganalisis layer container image untuk known vulnerabilities (CVE).'},
                {'id': 'q-06-03', 'order': 3, 'prompt': 'Kubernetes RBAC mengontrol?', 'options': ['CPU limit', 'Izin API berdasarkan role', 'DNS resolution', 'Image pull'], 'correctOptionIndex': 1, 'explanation': 'RBAC (Role-Based Access Control) mengatur siapa dapat melakukan operasi apa di API Kubernetes.'},
                {'id': 'q-06-04', 'order': 4, 'prompt': 'NetworkPolicy membatasi?', 'options': ['Lalu lintas antar Pod', 'Jumlah replica', 'Storage class', 'Ingress controller'], 'correctOptionIndex': 0, 'explanation': 'NetworkPolicy mendefinisikan aturan ingress/egress traffic antar Pod di cluster.'},
                {'id': 'q-06-05', 'order': 5, 'prompt': 'Pod Security Standards level restricted?', 'options': ['Paling permisif', 'Paling ketat', 'Hanya untuk dev', 'Tidak ada'], 'correctOptionIndex': 1, 'explanation': 'Restricted adalah level paling ketat: non-root, drop capabilities, read-only root filesystem.'},
                {'id': 'q-06-06', 'order': 6, 'prompt': 'SLSA fokus pada?', 'options': ['Supply chain security', 'Frontend CSS', 'Database indexing', 'Load testing'], 'correctOptionIndex': 0, 'explanation': 'SLSA (Supply-chain Levels for Software Artifacts) adalah framework keamanan supply chain.'},
                {'id': 'q-06-07', 'order': 7, 'prompt': 'Falco mendeteksi?', 'options': ['Runtime anomali di container', 'Syntax error', 'Lint warning', 'Git conflict'], 'correctOptionIndex': 0, 'explanation': 'Falco adalah runtime security tool yang mendeteksi perilaku anomali via syscall monitoring.'},
                {'id': 'q-06-08', 'order': 8, 'prompt': 'Admission controller Gatekeeper menggunakan?', 'options': ['Rego policy language', 'SQL', 'HTML', 'CSS'], 'correctOptionIndex': 0, 'explanation': 'OPA Gatekeeper menggunakan Rego untuk mendefinisikan kebijakan Kubernetes.'},
            ],
        },
        'lesson': {
            'id': 'lesson-ch-06-cloud-native-security',
            'estimatedMinutes': 50,
            'sections': [
                {'id': 'sec-06-basic', 'type': 'markdown', 'level': 'basic', 'title': 'Container Security Basics', 'content': '## Prinsip Keamanan Container\n1. **Minimal base image**: gunakan distroless atau alpine, kurangi attack surface.\n2. **Non-root user**: jalankan proses sebagai user non-privileged.\n3. **No secrets in image**: jangan embed credential di Dockerfile atau layer image.\n4. **Immutable tags**: gunakan digest atau semver tag, hindari `:latest` di production.\n\n## Image Scanning\nTool seperti Trivy, Grype, atau Snyk Container scan layer image untuk CVE. Integrasikan scanning ke CI pipeline sebelum push ke registry.\n\n## Read-Only Root Filesystem\nMount root filesystem sebagai read-only; gunakan emptyDir atau volume untuk data yang perlu ditulis.'},
                {'id': 'sec-06-js', 'type': 'code-example', 'codeExample': {'id': 'code-06-js', 'filename': 'dockerfile-check.js', 'language': 'javascript', 'title': 'JavaScript: Validasi Dockerfile Security', 'code': "const dockerfile = `\nFROM node:20-alpine\nRUN addgroup -S app && adduser -S app -G app\nWORKDIR /app\nCOPY --chown=app:app package*.json ./\nRUN npm ci --only=production\nUSER app\nCMD [\"node\", \"server.js\"]\n`\n\nconst checks = [\n  { rule: 'Non-root USER', pass: /USER\\s+\\w+/.test(dockerfile) && !/USER\\s+root/.test(dockerfile) },\n  { rule: 'Alpine base', pass: /alpine/.test(dockerfile) },\n  { rule: 'No COPY secret', pass: !/COPY.*\\.env/.test(dockerfile) },\n]\nchecks.forEach(c => console.log(c.pass ? '✓' : '✗', c.rule))", 'explanation': 'Script validasi sederhana untuk memeriksa best practice keamanan Dockerfile.'}},
                {'id': 'sec-06-intermediate', 'type': 'markdown', 'level': 'intermediate', 'title': 'RBAC, Network Policies, dan Pod Security', 'content': '## Kubernetes RBAC\n- **Role/ClusterRole**: mendefinisikan permission (verbs + resources).\n- **RoleBinding/ClusterRoleBinding**: mengaitkan role ke user/group/serviceAccount.\n- Principle of least privilege: berikan permission minimal yang diperlukan.\n\n## Network Policies\nNetworkPolicy menggunakan label selector untuk mengizinkan/menolak traffic. Default deny all lalu buka port yang diperlukan.\n\n## Pod Security Standards\nTiga level: **Privileged** (tidak dibatasi), **Baseline** (minimal restriction), **Restricted** (paling ketat). Gunakan Pod Security Admission untuk enforce level per namespace.'},
                {'id': 'sec-06-ts', 'type': 'code-example', 'codeExample': {'id': 'code-06-ts', 'filename': 'network-policy.ts', 'language': 'typescript', 'title': 'TypeScript: Model NetworkPolicy', 'code': "interface NetworkPolicy {\n  apiVersion: 'networking.k8s.io/v1'\n  kind: 'NetworkPolicy'\n  metadata: { name: string; namespace: string }\n  spec: {\n    podSelector: { matchLabels: Record<string, string> }\n    policyTypes: ('Ingress' | 'Egress')[]\n    ingress: {\n      from: { podSelector?: { matchLabels: Record<string, string> } }[]\n      ports: { protocol: string; port: number }[]\n    }[]\n  }\n}\n\nconst apiPolicy: NetworkPolicy = {\n  apiVersion: 'networking.k8s.io/v1',\n  kind: 'NetworkPolicy',\n  metadata: { name: 'allow-from-frontend', namespace: 'production' },\n  spec: {\n    podSelector: { matchLabels: { app: 'api' } },\n    policyTypes: ['Ingress'],\n    ingress: [{\n      from: [{ podSelector: { matchLabels: { app: 'frontend' } } }],\n      ports: [{ protocol: 'TCP', port: 8080 }],\n    }],\n  },\n}\nconsole.log(apiPolicy.metadata.name)", 'explanation': 'NetworkPolicy yang hanya mengizinkan traffic dari frontend ke API di port 8080.'}},
                {'id': 'sec-06-advanced', 'type': 'markdown', 'level': 'advanced', 'title': 'Supply Chain Security dan Runtime Security', 'content': '## Supply Chain Security\n- **SLSA levels**: dari source provenance (L1) hingga hermetic builds (L3+).\n- **Sigstore/Cosign**: sign container image dan verify sebelum deploy.\n- **SBOM**: Software Bill of Materials mendokumentasikan dependensi image.\n\n## Admission Controllers\nGatekeeper/Kyverno menegakkan policy sebelum objek disimpan: wajib label, larang `:latest`, enforce resource limits.\n\n## Runtime Security (Falco)\nFalco memonitor syscall dan event kernel untuk mendeteksi:\n- Shell di container production\n- File write di direktori sensitif\n- Unexpected network connection\n\n## Zero-Trust di Cluster\nKombinasikan RBAC, NetworkPolicy, mTLS (service mesh), dan runtime detection untuk defense in depth.'},
                {'id': 'sec-06-go', 'type': 'code-example', 'codeExample': {'id': 'code-06-go', 'filename': 'secure-image.go', 'language': 'go', 'title': 'Go: Secure HTTP Server', 'code': "package main\n\nimport (\n\t\"log\"\n\t\"net/http\"\n\t\"os\"\n\t\"os/user\"\n)\n\nfunc main() {\n\tu, err := user.Current()\n\tif err == nil && u.Uid == \"0\" {\n\t\tlog.Fatal(\"refusing to run as root\")\n\t}\n\n\tmux := http.NewServeMux()\n\tmux.HandleFunc(\"/healthz\", func(w http.ResponseWriter, r *http.Request) {\n\t\tw.WriteHeader(http.StatusOK)\n\t})\n\n\tsrv := &http.Server{\n\t\tAddr:              \":8080\",\n\t\tHandler:           mux,\n\t\tReadHeaderTimeout: 5e9,\n\t}\n\tlog.Fatal(srv.ListenAndServe())\n}", 'explanation': 'Server Go yang menolak berjalan sebagai root dan menggunakan timeout untuk mitigasi slowloris.'}},
                {'id': 'sec-06-callout', 'type': 'callout', 'calloutType': 'warning', 'content': '**Kesimpulan:** Keamanan cloud native adalah defense in depth. Scan image di CI, enforce policy di admission, batasi network di runtime, dan monitor anomali dengan Falco.'},
            ],
        },
    }
    chapters.append(ch6)

    ch7 = {
        'slug': 'ch-07-platform-engineering',
        'title': 'Platform Engineering',
        'summary': 'Membangun Internal Developer Platform (IDP), golden paths, self-service infrastructure dengan Backstage/Port, dan metrik developer experience.',
        'estimatedMinutes': 45,
        'learningObjectives': [
            'Memahami konsep Internal Developer Platform (IDP).',
            'Merancang golden paths untuk common use cases.',
            'Mengimplementasikan self-service infrastructure.',
            'Menggunakan Backstage atau Port sebagai platform portal.',
            'Mengukur developer experience dan cognitive load.',
        ],
        'summaryPoints': [
            'IDP adalah produk internal yang mempercepat delivery tim developer.',
            'Golden path adalah cara standar dan didukung untuk common tasks.',
            'Self-service mengurangi toil dan ticket queue ke platform team.',
            'Backstage menyediakan service catalog, templates, dan plugin ecosystem.',
            'Developer experience metrics: deployment frequency, lead time, satisfaction.',
        ],
        'references': [
            {'id': 'ref-07-01', 'title': 'Backstage Docs', 'url': 'https://backstage.io/docs/', 'description': 'Dokumentasi resmi Backstage — open source platform untuk building developer portals.', 'type': 'documentation'},
            {'id': 'ref-07-02', 'title': 'Port Docs', 'url': 'https://docs.getport.io/', 'description': 'Dokumentasi Port — no-code internal developer platform.', 'type': 'documentation'},
            {'id': 'ref-07-03', 'title': 'Platform Engineering', 'url': 'https://platformengineering.org/', 'description': 'Komunitas dan resource platform engineering.', 'type': 'article'},
            {'id': 'ref-07-04', 'title': 'Team Topologies', 'url': 'https://teamtopologies.com/', 'description': 'Framework organisasi tim: stream-aligned, platform, enabling, complicated-subsystem.', 'type': 'book'},
            {'id': 'ref-07-05', 'title': 'DevOps Trends 2026 — Platform Engineering', 'url': 'https://www.requirementguide.com/blog/devops-automation/devops-trends-2026-ai-gitops-platform-engineering-cicd-devsecops-and-best-practices', 'description': 'Tren platform engineering dan praktik terbaik 2026.', 'type': 'article'},
        ],
        'quiz': {
            'id': 'quiz-ch-07-platform-engineering',
            'title': 'Quiz: Platform Engineering',
            'passingScore': 8,
            'questions': [
                {'id': 'q-07-01', 'order': 1, 'prompt': 'IDP adalah?', 'options': ['Cloud provider', 'Produk internal untuk developer', 'Database', 'CI tool'], 'correctOptionIndex': 1, 'explanation': 'Internal Developer Platform adalah produk internal yang mempercepat delivery tim developer.'},
                {'id': 'q-07-02', 'order': 2, 'prompt': 'Golden path?', 'options': ['Jalur hiking', 'Cara standar didukung untuk common tasks', 'Branch Git', 'Network route'], 'correctOptionIndex': 1, 'explanation': 'Golden path adalah template dan workflow standar yang didukung platform team.'},
                {'id': 'q-07-03', 'order': 3, 'prompt': 'Self-service infrastructure mengurangi?', 'options': ['Developer autonomy', 'Ticket queue ke platform team', 'Deployment speed', 'Code quality'], 'correctOptionIndex': 1, 'explanation': 'Self-service memungkinkan developer provisioning resource tanpa menunggu ticket manual.'},
                {'id': 'q-07-04', 'order': 4, 'prompt': 'Backstage menyediakan?', 'options': ['Service catalog dan templates', 'Container runtime', 'DNS server', 'Load balancer'], 'correctOptionIndex': 0, 'explanation': 'Backstage adalah developer portal dengan service catalog, software templates, dan plugin ecosystem.'},
                {'id': 'q-07-05', 'order': 5, 'prompt': 'Platform team dalam Team Topologies?', 'options': ['Stream-aligned team', 'Platform team', 'Enabling team', 'Complicated-subsystem team'], 'correctOptionIndex': 1, 'explanation': 'Platform team membangung internal platform sebagai produk untuk stream-aligned teams.'},
                {'id': 'q-07-06', 'order': 6, 'prompt': 'Cognitive load reduction?', 'options': ['Menambah dokumentasi saja', 'Menyederhanakan cara developer bekerja', 'Menghapus testing', 'Mengurangi jumlah developer'], 'correctOptionIndex': 1, 'explanation': 'Platform engineering mengurangi cognitive load dengan abstraksi dan golden paths.'},
                {'id': 'q-07-07', 'order': 7, 'prompt': 'DX metrics contoh?', 'options': ['Deployment frequency, lead time', 'Jumlah meeting', 'Ukuran monitor', 'Warna IDE'], 'correctOptionIndex': 0, 'explanation': 'Developer experience diukur dengan DORA metrics: deployment frequency, lead time, MTTR, change failure rate.'},
                {'id': 'q-07-08', 'order': 8, 'prompt': 'Thinnest viable platform?', 'options': ['Platform seminimal mungkin yang memberikan value', 'Platform paling kompleks', 'Tidak ada platform', 'Hanya SaaS'], 'correctOptionIndex': 0, 'explanation': 'Thinnest viable platform: mulai minimal, iterasi berdasarkan feedback developer.'},
            ],
        },
        'lesson': {
            'id': 'lesson-ch-07-platform-engineering',
            'estimatedMinutes': 45,
            'sections': [
                {'id': 'sec-07-basic', 'type': 'markdown', 'level': 'basic', 'title': 'Internal Developer Platform (IDP)', 'content': '## Apa itu IDP?\nInternal Developer Platform adalah layer abstraksi di atas infrastruktur yang menyediakan self-service capabilities untuk developer. IDP bukan sekadar tooling — ini adalah **produk internal** dengan customer (developer teams) dan roadmap.\n\n## Mengapa Platform Engineering?\n- Tim developer tumbuh, kebutuhan infrastruktur bervariasi.\n- Ticket queue ke ops/platform team menjadi bottleneck.\n- Cognitive load developer meningkat dengan kompleksitas cloud native.\n\n## Platform vs DevOps\nDevOps fokus pada culture dan collaboration. Platform engineering fokus pada **produk platform** yang mempercepat delivery dengan golden paths dan self-service.'},
                {'id': 'sec-07-js', 'type': 'code-example', 'codeExample': {'id': 'code-07-js', 'filename': 'manual-setup.js', 'language': 'javascript', 'title': 'JavaScript: Manual Setup vs Platform', 'code': "const manualSteps = [\n  'Create GitHub repo',\n  'Setup CI pipeline YAML',\n  'Create K8s namespace',\n  'Configure RBAC',\n  'Setup monitoring dashboard',\n  'Configure secrets in vault',\n  'Setup ingress and DNS',\n  'Write deployment manifest',\n]\n\nconst platformSteps = [\n  'Open Backstage portal',\n  'Select \"Node.js Microservice\" template',\n  'Fill service name and team',\n  'Click Create — all above automated',\n]\n\nconsole.log('Manual:', manualSteps.length, 'steps')\nconsole.log('Platform:', platformSteps.length, 'steps')", 'explanation': 'Perbandingan langkah manual vs self-service platform untuk provisioning service baru.'}},
                {'id': 'sec-07-intermediate', 'type': 'markdown', 'level': 'intermediate', 'title': 'Golden Paths dan Self-Service', 'content': '## Golden Paths\nGolden path adalah cara standar, didukung, dan terdokumentasi untuk common tasks:\n- **Create new service**: template → repo → CI → deploy → monitoring.\n- **Add database**: self-service PostgreSQL instance dengan backup otomatis.\n- **Setup observability**: dashboard dan alert otomatis dari service template.\n\n## Self-Service Infrastructure\nDeveloper dapat provisioning resource tanpa ticket:\n- Namespace, database, cache, message queue via portal atau CLI.\n- Policy enforcement otomatis (resource limits, network policy, RBAC).\n\n## Backstage / Port\n- **Backstage**: open source, plugin ecosystem, software templates (Cookiecutter).\n- **Port**: no-code, action-based automation, software catalog.'},
                {'id': 'sec-07-ts', 'type': 'code-example', 'codeExample': {'id': 'code-07-ts', 'filename': 'platform-template.ts', 'language': 'typescript', 'title': 'TypeScript: Model Software Template', 'code': "interface SoftwareTemplate {\n  apiVersion: 'scaffolder.backstage.io/v1beta3'\n  kind: 'Template'\n  metadata: { name: string; title: string; description: string; tags: string[] }\n  spec: {\n    owner: string\n    type: 'service'\n    parameters: { title: string; properties: Record<string, { type: string; description: string }> }[]\n    steps: { id: string; name: string; action: string; input: Record<string, unknown> }[]\n  }\n}\n\nconst nodeTemplate: SoftwareTemplate = {\n  apiVersion: 'scaffolder.backstage.io/v1beta3',\n  kind: 'Template',\n  metadata: {\n    name: 'node-microservice',\n    title: 'Node.js Microservice',\n    description: 'Golden path untuk service Node.js dengan CI/CD dan monitoring',\n    tags: ['nodejs', 'recommended'],\n  },\n  spec: {\n    owner: 'platform-team',\n    type: 'service',\n    parameters: [{ title: 'Service Info', properties: { name: { type: 'string', description: 'Service name' } } }],\n    steps: [\n      { id: 'create-repo', name: 'Create GitHub Repo', action: 'publish:github', input: {} },\n      { id: 'setup-ci', name: 'Setup CI', action: 'github:actions:dispatch', input: {} },\n    ],\n  },\n}\nconsole.log(nodeTemplate.metadata.title)", 'explanation': 'Model Backstage software template yang mendefinisikan golden path untuk microservice Node.js.'}},
                {'id': 'sec-07-advanced', 'type': 'markdown', 'level': 'advanced', 'title': 'Developer Experience Metrics', 'content': '## DX Metrics\n- **DORA metrics**: deployment frequency, lead time for changes, MTTR, change failure rate.\n- **Developer satisfaction**: survey periodik (SPACE framework).\n- **Platform adoption**: berapa % team menggunakan golden path vs manual.\n\n## Cognitive Load Reduction\nPlatform team bertanggung jawab mengurangi cognitive load stream-aligned teams:\n- Abstraksi kompleksitas infrastruktur.\n- Dokumentasi terintegrasi di portal.\n- Feedback loop: platform roadmap driven by developer pain points.\n\n## Thinnest Viable Platform\nMulai dengan golden path untuk 1-2 use case paling common. Iterasi berdasarkan adoption dan feedback. Jangan over-engineer platform sebelum ada demand.'},
                {'id': 'sec-07-go', 'type': 'code-example', 'codeExample': {'id': 'code-07-go', 'filename': 'platform-cli.go', 'language': 'go', 'title': 'Go: Platform CLI Stub', 'code': "package main\n\nimport (\n\t\"fmt\"\n\t\"os\"\n)\n\nfunc main() {\n\tif len(os.Args) < 2 {\n\t\tfmt.Println(\"Usage: platform create <service-name>\")\n\t\tos.Exit(1)\n\t}\n\tname := os.Args[1]\n\tfmt.Printf(\"Creating service %q via golden path...\\n\", name)\n\tfmt.Println(\"  ✓ GitHub repo created\")\n\tfmt.Println(\"  ✓ CI pipeline configured\")\n\tfmt.Println(\"  ✓ K8s namespace provisioned\")\n\tfmt.Println(\"  ✓ Monitoring dashboard ready\")\n\tfmt.Printf(\"Service %q ready at https://backstage.example.com/catalog/%s\\n\", name, name)\n}", 'explanation': 'CLI stub yang mensimulasikan self-service provisioning via platform golden path.'}},
                {'id': 'sec-07-callout', 'type': 'callout', 'calloutType': 'tip', 'content': '**Kesimpulan:** Platform engineering memperlakukan platform sebagai produk. Ukur adoption, kurangi cognitive load, dan iterasi golden paths berdasarkan feedback developer.'},
            ],
        },
    }
    chapters.append(ch7)

    ch8 = {
        'slug': 'ch-08-capstone-devops-project',
        'title': 'Capstone DevOps Project',
        'summary': 'Proyek end-to-end: pipeline CI/CD dari commit ke deploy K8s via ArgoCD, observability, alerting, rollback, dan security scanning untuk aplikasi full-stack.',
        'estimatedMinutes': 60,
        'learningObjectives': [
            'Merancang pipeline end-to-end dari commit sampai production.',
            'Mengintegrasikan GitHub Actions, Docker build, dan ArgoCD deploy.',
            'Menambahkan observability stack (Prometheus, Grafana).',
            'Menerapkan rollback strategy dan security scanning.',
            'Menyusun runbook dan incident response plan.',
        ],
        'summaryPoints': [
            'Capstone menggabungkan semua konsep DevOps dari M18-M20.',
            'Pipeline: lint → test → build → scan → push → deploy via GitOps.',
            'Observability: metrics, logs, traces, dan SLO-based alerting.',
            'Rollback via ArgoCD history atau progressive delivery abort.',
            'Security scanning di CI mencegah vulnerable image masuk production.',
        ],
        'references': [
            {'id': 'ref-08-01', 'title': 'GitHub Actions — Deployment', 'url': 'https://docs.github.com/en/actions/deployment', 'description': 'Dokumentasi deployment dengan GitHub Actions.', 'type': 'documentation'},
            {'id': 'ref-08-02', 'title': 'Docker Docs — CI/CD Best Practices', 'url': 'https://docs.docker.com/build/ci/', 'description': 'Best practices build container image di pipeline CI/CD.', 'type': 'documentation'},
            {'id': 'ref-08-03', 'title': 'ArgoCD — Getting Started', 'url': 'https://argo-cd.readthedocs.io/en/stable/getting_started/', 'description': 'Panduan memulai ArgoCD untuk GitOps deployment.', 'type': 'documentation'},
            {'id': 'ref-08-04', 'title': 'Prometheus — Getting Started', 'url': 'https://prometheus.io/docs/prometheus/latest/getting_started/', 'description': 'Panduan memulai monitoring dengan Prometheus.', 'type': 'documentation'},
            {'id': 'ref-08-05', 'title': 'Kubernetes — Production Best Practices', 'url': 'https://kubernetes.io/docs/setup/best-practices/', 'description': 'Best practices menjalankan Kubernetes di production.', 'type': 'documentation'},
        ],
        'quiz': {
            'id': 'quiz-ch-08-capstone-devops-project',
            'title': 'Quiz: Capstone DevOps Project',
            'passingScore': 8,
            'questions': [
                {'id': 'q-08-01', 'order': 1, 'prompt': 'Urutan pipeline CI yang benar?', 'options': ['Deploy → Test → Build', 'Lint → Test → Build → Scan → Push', 'Push → Build → Test', 'Scan → Deploy → Lint'], 'correctOptionIndex': 1, 'explanation': 'Pipeline standar: lint, test, build image, security scan, push ke registry, lalu deploy.'},
                {'id': 'q-08-02', 'order': 2, 'prompt': 'ArgoCD deploy dari?', 'options': ['Manual kubectl', 'Git repository sebagai source of truth', 'SSH ke server', 'Email notification'], 'correctOptionIndex': 1, 'explanation': 'ArgoCD menyinkronkan cluster state dengan manifest di Git repository (GitOps).'},
                {'id': 'q-08-03', 'order': 3, 'prompt': 'Rollback di ArgoCD?', 'options': ['Revert ke revision sebelumnya di Git history', 'Hapus cluster', 'Rebuild dari scratch', 'Tidak mungkin'], 'correctOptionIndex': 0, 'explanation': 'ArgoCD dapat rollback ke revision Git sebelumnya atau sync ke commit tertentu.'},
                {'id': 'q-08-04', 'order': 4, 'prompt': 'Security scanning di CI mencegah?', 'options': ['Vulnerable image masuk registry', 'Syntax error', 'Merge conflict', 'Slow build'], 'correctOptionIndex': 0, 'explanation': 'Image scanner (Trivy, Grype) mendeteksi CVE sebelum image di-push ke registry production.'},
                {'id': 'q-08-05', 'order': 5, 'prompt': 'Observability stack capstone?', 'options': ['Prometheus + Grafana + alerting', 'Hanya console.log', 'Spreadsheet', 'Email saja'], 'correctOptionIndex': 0, 'explanation': 'Stack observability: Prometheus untuk metrics, Grafana untuk dashboard, Alertmanager untuk alerting.'},
                {'id': 'q-08-06', 'order': 6, 'prompt': 'Progressive delivery abort?', 'options': ['Otomatis rollback jika analysis gagal', 'Deploy tanpa test', 'Skip canary', 'Force deploy'], 'correctOptionIndex': 0, 'explanation': 'Argo Rollouts dapat abort canary deployment jika analysis metrics gagal threshold.'},
                {'id': 'q-08-07', 'order': 7, 'prompt': 'Runbook berisi?', 'options': ['Langkah troubleshooting untuk alert', 'Source code', 'Dockerfile saja', 'Git history'], 'correctOptionIndex': 0, 'explanation': 'Runbook mendokumentasikan langkah diagnosis dan remediation untuk setiap alert/incident type.'},
                {'id': 'q-08-08', 'order': 8, 'prompt': 'Arsitektur capstone?', 'options': ['React frontend + Go/Node backend + PostgreSQL', 'Monolith PHP', 'Desktop app', 'Static HTML saja'], 'correctOptionIndex': 0, 'explanation': 'Capstone menggunakan stack full-stack modern: React, Go/Node backend, PostgreSQL, di-deploy ke K8s.'},
            ],
        },
        'lesson': {
            'id': 'lesson-ch-08-capstone-devops-project',
            'estimatedMinutes': 60,
            'sections': [
                {'id': 'sec-08-basic', 'type': 'markdown', 'level': 'basic', 'title': 'End-to-End Pipeline Overview', 'content': '## Arsitektur Capstone\nAplikasi full-stack:\n- **Frontend**: React (Vite) di-deploy sebagai static assets atau SSR.\n- **Backend**: Go atau Node.js REST API.\n- **Database**: PostgreSQL dengan migration.\n\n## Pipeline Flow\n```\nCommit → GitHub Actions → Lint/Test → Docker Build → Trivy Scan → Push Registry → Update GitOps Repo → ArgoCD Sync → K8s Deploy\n```\n\n## Komponen\n1. **CI** (GitHub Actions): build, test, scan, push image.\n2. **Registry** (GHCR/ECR): menyimpan container image.\n3. **GitOps repo**: manifest K8s dengan image tag dari CI.\n4. **ArgoCD**: sync manifest ke cluster.\n5. **Observability**: Prometheus scrape metrics, Grafana dashboard.'},
                {'id': 'sec-08-js', 'type': 'code-example', 'codeExample': {'id': 'code-08-js', 'filename': 'pipeline-stages.js', 'language': 'javascript', 'title': 'JavaScript: Pipeline Stage Runner', 'code': "const stages = [\n  { name: 'lint', run: async () => { console.log('✓ ESLint passed') } },\n  { name: 'test', run: async () => { console.log('✓ 42 tests passed') } },\n  { name: 'build', run: async () => { console.log('✓ Docker image built: app:v1.2.3') } },\n  { name: 'scan', run: async () => { console.log('✓ Trivy: 0 critical CVEs') } },\n  { name: 'push', run: async () => { console.log('✓ Pushed to ghcr.io/org/app:v1.2.3') } },\n  { name: 'deploy', run: async () => { console.log('✓ ArgoCD synced to cluster') } },\n]\n\nasync function runPipeline() {\n  for (const stage of stages) {\n    console.log(`[${stage.name}]`)\n    await stage.run()\n  }\n  console.log('Pipeline complete ✓')\n}\nrunPipeline()", 'explanation': 'Simulasi pipeline CI/CD end-to-end dari lint hingga deploy.'}},
                {'id': 'sec-08-intermediate', 'type': 'markdown', 'level': 'intermediate', 'title': 'GitHub Actions → Docker → ArgoCD', 'content': '## GitHub Actions Workflow\n```yaml\non: push:\n  branches: [main]\njobs:\n  ci:\n    runs-on: ubuntu-latest\n    steps:\n      - uses: actions/checkout@v4\n      - run: npm ci && npm test\n      - run: docker build -t ghcr.io/org/app:${{ github.sha }} .\n      - run: trivy image --exit-code 1 ghcr.io/org/app:${{ github.sha }}\n      - run: docker push ghcr.io/org/app:${{ github.sha }}\n      - run: yq -i \'.spec.template.spec.containers[0].image = \"ghcr.io/org/app:${{ github.sha }}\"\' k8s/deployment.yaml\n      - run: git commit -am \"deploy ${{ github.sha }}\" && git push\n```\n\n## ArgoCD Application\nArgoCD memonitor GitOps repo. Saat manifest berubah (image tag baru), ArgoCD otomatis sync ke cluster.\n\n## Health Checks\nDeployment manifest harus include liveness dan readiness probe agar K8s dapat mendeteksi unhealthy pod.'},
                {'id': 'sec-08-ts', 'type': 'code-example', 'codeExample': {'id': 'code-08-ts', 'filename': 'argocd-app.ts', 'language': 'typescript', 'title': 'TypeScript: Model ArgoCD Application', 'code': "interface ArgoCDApplication {\n  apiVersion: 'argoproj.io/v1alpha1'\n  kind: 'Application'\n  metadata: { name: string; namespace: string }\n  spec: {\n    project: string\n    source: { repoURL: string; path: string; targetRevision: string }\n    destination: { server: string; namespace: string }\n    syncPolicy: {\n      automated: { prune: boolean; selfHeal: boolean }\n      syncOptions: string[]\n    }\n  }\n}\n\nconst capstoneApp: ArgoCDApplication = {\n  apiVersion: 'argoproj.io/v1alpha1',\n  kind: 'Application',\n  metadata: { name: 'mari-belajar-api', namespace: 'argocd' },\n  spec: {\n    project: 'default',\n    source: {\n      repoURL: 'https://github.com/org/gitops.git',\n      path: 'apps/mari-belajar-api',\n      targetRevision: 'main',\n    },\n    destination: { server: 'https://kubernetes.default.svc', namespace: 'production' },\n    syncPolicy: {\n      automated: { prune: true, selfHeal: true },\n      syncOptions: ['CreateNamespace=true'],\n    },\n  },\n}\nconsole.log(capstoneApp.metadata.name)", 'explanation': 'ArgoCD Application dengan auto-sync dan self-heal untuk capstone deployment.'}},
                {'id': 'sec-08-advanced', 'type': 'markdown', 'level': 'advanced', 'title': 'Observability, Rollback, dan Security', 'content': '## Observability Stack\n- **Metrics**: Prometheus scrape `/metrics` dari backend Go/Node.\n- **Dashboards**: Grafana panel untuk request rate, error rate, latency p99.\n- **Alerting**: SLO-based alert jika error rate > 1% selama 5 menit.\n- **Logs**: structured JSON log ke Loki atau cloud logging.\n\n## Rollback Strategy\n1. **ArgoCD rollback**: revert ke Git revision sebelumnya.\n2. **Progressive delivery abort**: Argo Rollouts abort canary jika analysis gagal.\n3. **Database migration rollback**: backward-compatible migration + down script.\n\n## Security Scanning\n- Trivy scan image di CI (block jika critical CVE).\n- OPA/Gatekeeper policy: wajib non-root, resource limits.\n- NetworkPolicy: hanya frontend → backend → database.\n\n## Incident Response\nRunbook untuk setiap alert. Postmortem blameless setelah incident. Error budget policy menentukan freeze release jika SLO violated.'},
                {'id': 'sec-08-go', 'type': 'code-example', 'codeExample': {'id': 'code-08-go', 'filename': 'health-handler.go', 'language': 'go', 'title': 'Go: Health Check Handler untuk K8s Probes', 'code': "package main\n\nimport (\n\t\"encoding/json\"\n\t\"net/http\"\n\t\"time\"\n)\n\ntype HealthResponse struct {\n\tStatus    string `json:\"status\"`\n\tTimestamp string `json:\"timestamp\"`\n\tVersion   string `json:\"version\"`\n}\n\nfunc healthHandler(w http.ResponseWriter, r *http.Request) {\n\tw.Header().Set(\"Content-Type\", \"application/json\")\n\tjson.NewEncoder(w).Encode(HealthResponse{\n\t\tStatus:    \"ok\",\n\t\tTimestamp: time.Now().UTC().Format(time.RFC3339),\n\t\tVersion:   \"v1.2.3\",\n\t})\n}\n\nfunc readinessHandler(db func() error) http.HandlerFunc {\n\treturn func(w http.ResponseWriter, r *http.Request) {\n\t\tif err := db(); err != nil {\n\t\t\tw.WriteHeader(http.StatusServiceUnavailable)\n\t\t\treturn\n\t\t}\n\t\tw.WriteHeader(http.StatusOK)\n\t}\n}\n\nfunc main() {\n\thttp.HandleFunc(\"/healthz\", healthHandler)\n\thttp.HandleFunc(\"/readyz\", readinessHandler(func() error { return nil }))\n\thttp.ListenAndServe(\":8080\", nil)\n}", 'explanation': 'Health dan readiness handler untuk Kubernetes liveness/readiness probes di capstone project.'}},
                {'id': 'sec-08-callout', 'type': 'callout', 'calloutType': 'info', 'content': '**Kesimpulan:** Capstone DevOps menggabungkan CI/CD, GitOps, observability, security, dan incident response. Ini adalah fondasi untuk membangun dan mengoperasikan sistem production-grade.'},
            ],
        },
    }
    chapters.append(ch8)

    return chapters
