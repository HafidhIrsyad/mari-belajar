import type { Lesson } from '@/content/types'

export const ch01CloudDeploymentLesson: Lesson = {
  id: "lesson-ch-01-cloud-deployment",
  estimatedMinutes: 45,
  sections: [
    {
      id: "sec-01-basic-cloud-models",
      type: 'markdown',
      level: "basic",
      title: "Model Layanan dan Deployment Cloud",
      content: "## Model Layanan Cloud\n\nCloud computing menawarkan tiga model layanan utama:\n\n1. **IaaS (Infrastructure as a Service)**: Anda menyewa VM, storage, dan jaringan. Contoh: AWS EC2, Google Compute Engine, Azure VM.\n2. **PaaS (Platform as a Service)**: Provider mengelola runtime, database, dan middleware; Anda fokus pada aplikasi. Contoh: Heroku, Google App Engine, Azure App Service.\n3. **SaaS (Software as a Service)**: Aplikasi siap pakai yang diakses melalui browser. Contoh: Gmail, Slack, Salesforce.\n\n## Model Deployment\n\n- **Public cloud**: Infrastruktur dimiliki provider, dibagi antar tenant. Cocok untuk beban kerja elastis dan skala global.\n- **Private cloud**: Infrastruktur khusus untuk satu organisasi, bisa on-premise atau managed. Memberikan kontrol kepatuhan tinggi.\n- **Hybrid cloud**: Menggabungkan public dan private untuk fleksibilitas, misalnya data sensitif di private dan frontend di public.\n- **Multi-cloud**: Menggunakan lebih dari satu provider untuk mengurangi vendor lock-in dan meningkatkan availability.\n\n## Shared Responsibility Model\n\nProvider bertanggung jawab atas keamanan **of** the cloud (fasilitas, hardware, hypervisor, jaringan fisik). Customer bertanggung jawab atas keamanan **in** the cloud (data, konfigurasi IAM, enkripsi, patching OS untuk IaaS). Tanggung jawab bergeser ke provider seiring naiknya abstraction level.",
    },
    {
      id: "sec-01-js-example",
      type: 'code-example',
      codeExample: {
        id: "code-01-js",
        filename: "cloud-deploy.js",
        language: "javascript",
        title: "JavaScript: Simulasi Deployment ke PaaS",
        code: "const deployment = {\n  name: 'api-prod',\n  provider: 'paas',\n  region: 'ap-southeast-1',\n  instances: 2,\n  env: { NODE_ENV: 'production', PORT: '8080' },\n  healthCheck: '/healthz',\n}\n\nasync function deploy(config) {\n  console.log(`Memulai deploy ${config.name} di ${config.region}...`)\n  await provisionBuildpack(config)\n  await scaleInstances(config.instances)\n  const ok = await healthCheck(config.healthCheck)\n  if (!ok) {\n    throw new Error('Health check gagal setelah deploy')\n  }\n  console.log('Deploy berhasil dan lulus health check')\n}\n\nfunction provisionBuildpack(config) {\n  return new Promise((resolve) => setTimeout(resolve, 500))\n}\nfunction scaleInstances(n) {\n  return new Promise((resolve) => setTimeout(resolve, 300))\n}\nfunction healthCheck(path) {\n  return new Promise((resolve) => setTimeout(() => resolve(true), 200))\n}\n\ndeploy(deployment).catch((err) => console.error(err.message))",
        explanation: "Simulasi ini mengabstraksi langkah deployment di PaaS: provision runtime, scale instance, dan verifikasi health check. PaaS menyederhanakan operasi namun membatasi kontrol infrastruktur.",
      },
    },
    {
      id: "sec-01-intermediate-cloud-components",
      type: 'markdown',
      level: "intermediate",
      title: "VM, Container, Serverless, dan Edge",
      content: "## VM Deployment\n\nVirtual machine menjalankan OS penuh di atas hypervisor. Anda bertanggung jawab penuh atas OS, patch, runtime, dan aplikasi. VM cocok untuk workload lama, kebutuhan kernel khusus, atau lisensi perangkat lunak tertentu.\n\n## Container Deployment\n\nContainer berbagi kernel host, lebih ringan dari VM, dan dikemas dalam image yang immutable. Orkestrasi dengan Kubernetes memberikan skalabilitas, self-healing, dan rolling update. Container sering dijalankan di managed service seperti AWS ECS, Google Cloud Run, atau Azure Container Apps.\n\n## Serverless\n\nFunction-as-a-Service (FaaS) menjalankan kode sebagai respons terhadap event tanpa mengelola server. Provider menangkap provisioning, scaling, dan billing per permintaan. Contoh: AWS Lambda, Google Cloud Functions, Azure Functions.\n\n## Edge Deployment\n\nEdge computing menempatkan compute di lokasi dekat pengguna akhir, seringkali di CDN node. Edge function berjalan dalam isolat V8 dengan cold start yang sangat rendah, ideal untuk rendering, A/B testing, dan autentikasi. Contoh: Cloudflare Workers, Vercel Edge Functions, Lambda@Edge.\n\n## Load Balancer dan Auto Scaling\n\nLoad balancer mendistribusikan lalu lintas ke instance yang sehat. Auto scaling group menambah atau mengurangi instance berdasarkan metrik seperti CPU, memory, atau custom metric. Kombinasi keduanya memastikan availability dan efisiensi biaya.",
    },
    {
      id: "sec-01-ts-example",
      type: 'code-example',
      codeExample: {
        id: "code-01-ts",
        filename: "cloud-manifest.ts",
        language: "typescript",
        title: "TypeScript: Typed Deployment Manifest",
        code: "type DeploymentModel = 'vm' | 'container' | 'serverless' | 'edge'\ntype CloudProvider = 'aws' | 'gcp' | 'azure'\n\ninterface ScalingPolicy {\n  metric: 'cpu' | 'memory' | 'requests'\n  target: number\n  min: number\n  max: number\n}\n\ninterface DeploymentManifest {\n  name: string\n  provider: CloudProvider\n  model: DeploymentModel\n  region: string\n  scaling: ScalingPolicy\n  healthCheck: string\n}\n\nfunction validateManifest(m: DeploymentManifest): string[] {\n  const errors: string[] = []\n  if (!m.healthCheck.startsWith('/')) {\n    errors.push('healthCheck harus dimulai dengan /')\n  }\n  if (m.scaling.min > m.scaling.max) {\n    errors.push('scaling.min tidak boleh lebih besar dari max')\n  }\n  if (m.model === 'serverless' && m.scaling.max > 1000) {\n    errors.push('serverless concurrency limit biasanya lebih rendah')\n  }\n  return errors\n}\n\nconst manifest: DeploymentManifest = {\n  name: 'order-service',\n  provider: 'aws',\n  model: 'container',\n  region: 'ap-southeast-1',\n  scaling: { metric: 'cpu', target: 60, min: 2, max: 20 },\n  healthCheck: '/healthz',\n}\n\nconsole.log('Validation:', validateManifest(manifest))",
        explanation: "Manifest yang diberi tipe memastikan konfigurasi deployment valid sebelum dikirim ke cloud provider. Validasi menjebak kesalahan umum seperti health check path yang salah atau batas concurrency yang tidak realistis.",
      },
    },
    {
      id: "sec-01-advanced-serverless-edge",
      type: 'markdown',
      level: "advanced",
      title: "Internalitas Serverless, Edge, dan Cloud Economics",
      content: "## Internalitas Serverless\n\nSaat fungsi dipanggil, provider harus menyiapkan execution environment. Jika belum ada instance yang aktif, terjadi **cold start**: inisialisasi runtime, loading dependency, dan eksekusi handler. Setelah invokasi selesai, environment dapat dipertahankan beberapa saat untuk **warm start** berikutnya.\n\nConcurrency model FaaS:\n\n- **Synchronous invocation**: caller menunggu hasil; concurrency naik dengan jumlah permintaan bersamaan.\n- **Asynchronous/event-driven**: event queue menyerap lonjakan; throttling dapat terjadi jika batas concurrency tercapai.\n- **Reserved concurrency**: menjamin kapasitas maksimum untuk fungsi tertentu.\n\n## Edge Runtime\n\nEdge function berjalan di isolat V8, bukan container penuh. Isolat memiliki startup time <1 ms dan overhead memori rendah. Namun, batas CPU dan memory ketat, dan tidak semua API Node.js tersedia.\n\n## Cloud Economics\n\n- **On-demand**: bayar per detik/permintaan; fleksibel tetapi bisa mahal untuk beban tetap tinggi.\n- **Reserved / Savings Plans**: komitmen penggunaan 1-3 tahun untuk diskon signifikan.\n- **Spot / Preemptible**: instance murah yang dapat direbut kapan saja; cocok untuk workload fault-tolerant.\n\n## Tenancy dan Compliance\n\n- **Single-tenancy**: dedicated hardware untuk satu customer; mahal tetapi cocok untuk regulasi ketat.\n- **Multi-tenancy**: resources dibagi; lebih efisien tetapi memerlukan isolasi kuat.\n\nMemilih model deployment yang tepat memerlukan analisis latency, throughput, kontrol, biaya, dan kepatuhan.",
    },
    {
      id: "sec-01-go-example",
      type: 'code-example',
      codeExample: {
        id: "code-01-go",
        filename: "vps-server.go",
        language: "go",
        title: "Go: Binary Production di VPS dengan Graceful Shutdown",
        code: "package main\n\nimport (\n\t\"context\"\n\t\"fmt\"\n\t\"net/http\"\n\t\"os\"\n\t\"os/signal\"\n\t\"syscall\"\n\t\"time\"\n)\n\nfunc main() {\n\tmux := http.NewServeMux()\n\tmux.HandleFunc(\"/healthz\", func(w http.ResponseWriter, r *http.Request) {\n\t\tw.WriteHeader(http.StatusOK)\n\t\tfmt.Fprintln(w, `ok`)\n\t})\n\n\tsrv := &http.Server{\n\t\tAddr:    \":8080\",\n\t\tHandler: mux,\n\t}\n\n\tgo func() {\n\t\tfmt.Println(\"server listening on\", srv.Addr)\n\t\tif err := srv.ListenAndServe(); err != nil && err != http.ErrServerClosed {\n\t\t\tfmt.Fprintln(os.Stderr, err)\n\t\t}\n\t}()\n\n\tstop := make(chan os.Signal, 1)\n\tsignal.Notify(stop, syscall.SIGINT, syscall.SIGTERM)\n\t<-stop\n\n\tctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)\n\tdefer cancel()\n\tfmt.Println(\"shutting down gracefully...\")\n\tif err := srv.Shutdown(ctx); err != nil {\n\t\tfmt.Fprintln(os.Stderr, \"shutdown error:\", err)\n\t}\n}",
        explanation: "Binary Go statis dapat di-deploy ke VPS dengan systemd atau container. Graceful shutdown memastikan permintaan yang sedang berjalan selesai sebelum proses berhenti, praktik penting untuk deployment production.",
      },
    },
    {
      id: "sec-01-summary",
      type: 'callout',
      calloutType: "info",
      content: "**Kesimpulan:** Pilihan model cloud dan deployment bergantung pada trade-off kontrol, skalabilitas, biaya, dan latensi. Memahami internalitas serverless, edge runtime, dan cloud economics membantu tim membuat keputusan yang terukur.",
    },
  ],
}
