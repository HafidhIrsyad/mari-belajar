import type { Lesson } from '@/content/types'

export const ch03KubernetesInternalsLesson: Lesson = {
  id: "lesson-ch-03-kubernetes-internals",
  estimatedMinutes: 55,
  sections: [
    {
      id: "sec-03-basic-k8s-recap",
      type: 'markdown',
      level: "basic",
      title: "Pod, Service, Deployment, dan kubectl Request Flow",
      content: "## Resource Dasar Kubernetes\n\n- **Pod**: unit deploy terkecil, berisi satu atau lebih container yang berbagi network dan storage.\n- **Deployment**: mengelola ReplicaSet untuk rolling update dan rollback pod.\n- **Service**: memberikan stable endpoint ke kumpulan pod melalui label selector.\n- **ConfigMap dan Secret**: menyimpan konfigurasi non-sensitive dan sensitive yang dapat dipasang ke pod.\n\n## kubectl Request Flow\n\nSaat Anda menjalankan `kubectl apply -f deployment.yaml`, request dikirim ke API server. API server mengautentikasi dan mengotorisasi request, lalu menulis objek ke etcd. Controller dan scheduler kemudian mengamati perubahan dan mengambil tindakan untuk mencapai desired state.",
    },
    {
      id: "sec-03-js-example",
      type: 'code-example',
      codeExample: {
        id: "code-03-js",
        filename: "k8s-reconcile.js",
        language: "javascript",
        title: "JavaScript: Simulasi Reconciliasi Desired State",
        code: "const desired = { replicas: 3 }\nlet actual = { replicas: 1 }\n\nfunction reconcile(current, target) {\n  if (current.replicas < target.replicas) {\n    console.log(`Scale up: ${current.replicas} -> ${target.replicas}`)\n    return { replicas: target.replicas }\n  }\n  if (current.replicas > target.replicas) {\n    console.log(`Scale down: ${current.replicas} -> ${target.replicas}`)\n    return { replicas: target.replicas }\n  }\n  console.log('State sudah sesuai')\n  return current\n}\n\nactual = reconcile(actual, desired)\nconsole.log('Actual replicas:', actual.replicas)",
        explanation: "Controller Kubernetes beroperasi dalam loop reconciliasi: membandingkan desired state di etcd dengan actual state di cluster, lalu mengambil tindakan untuk menyamakannya.",
      },
    },
    {
      id: "sec-03-intermediate-control-plane",
      type: 'markdown',
      level: "intermediate",
      title: "Control Plane, etcd, dan CNI Networking",
      content: "## Control Plane Components\n\n- **kube-apiserver**: frontend untuk API Kubernetes; semua komponen berkomunikasi melaluinya.\n- **etcd**: distributed key-value store yang menyimpan seluruh state cluster.\n- **kube-scheduler**: memilih node terbaik untuk pod yang belum di-schedule.\n- **kube-controller-manager**: menjalankan controller seperti Deployment, ReplicaSet, Node, Endpoint.\n- **cloud-controller-manager**: mengintegrasikan cloud provider untuk load balancer, node, dan route.\n\n## Node Components\n\n- **kubelet**: agen di setiap node yang memastikan container di pod berjalan dan sehat.\n- **kube-proxy**: mengelola network rules untuk Service melalui iptables atau IPVS.\n- **Container runtime**: menjalankan container, biasanya containerd atau CRI-O.\n\n## etcd dan RAFT\n\netcd menggunakan algoritma RAFT untuk konsensus. Cluster etcd memilih satu leader; semua writes dialirkan ke leader dan direplikasi ke follower. Jika leader gagal, cluster melakukan election untuk memilih leader baru.\n\n## CNI Networking Basics\n\nSetiap pod mendapatkan IP unik di dalam cluster. CNI plugin bertanggung jawab:\n\n- Membuat network namespace untuk pod.\n- Membuat veth pair antara namespace pod dan host.\n- Mengatur routing dan overlay network antar node.\n- Mengimplementasikan network policy untuk isolasi.",
    },
    {
      id: "sec-03-ts-example",
      type: 'code-example',
      codeExample: {
        id: "code-03-ts",
        filename: "scheduler-filter.ts",
        language: "typescript",
        title: "TypeScript: Simulasi Filter Scheduler Sederhana",
        code: "interface Node {\n  name: string\n  cpuAvailable: number\n  memoryAvailable: number\n  labels: Record<string, string>\n}\n\ninterface PodRequest {\n  cpu: number\n  memory: number\n  nodeSelector: Record<string, string>\n}\n\nfunction fitsNode(pod: PodRequest, node: Node): boolean {\n  if (node.cpuAvailable < pod.cpu) return false\n  if (node.memoryAvailable < pod.memory) return false\n  for (const [key, value] of Object.entries(pod.nodeSelector)) {\n    if (node.labels[key] !== value) return false\n  }\n  return true\n}\n\nconst nodes: Node[] = [\n  { name: 'node-a', cpuAvailable: 2, memoryAvailable: 4096, labels: { zone: 'a', gpu: 'false' } },\n  { name: 'node-b', cpuAvailable: 4, memoryAvailable: 8192, labels: { zone: 'b', gpu: 'true' } },\n]\n\nconst pod: PodRequest = { cpu: 3, memory: 2048, nodeSelector: { gpu: 'true' } }\n\nconst candidates = nodes.filter((n) => fitsNode(pod, n))\nconsole.log('Cocok untuk pod:', candidates.map((n) => n.name))",
        explanation: "Kubernetes scheduler menggunakan predicates untuk memfilter node yang tidak memenuhi syarat, seperti resource requests dan nodeSelector. Ini adalah representasi sederhana dari tahap filter.",
      },
    },
    {
      id: "sec-03-advanced-scheduler",
      type: 'markdown',
      level: "advanced",
      title: "Scheduler Algorithm, Controller Pattern, dan CRI/CNI/CSI",
      content: "## Scheduler Algorithm\n\nProses scheduling terdiri dari dua fase:\n\n1. **Predicates (filter)**: membuang node yang tidak memenuhi syarat hard requirements seperti resource, nodeSelector, tolerations, anti-affinity, dan port availability.\n2. **Priorities (score)**: memberi skor pada node tersisa berdasarkan preferensi seperti resource utilization, pod topology spread, dan locality.\n\nNode dengan skor tertinggi dipilih. Scheduler tidak menjalankan pod; scheduler hanya mengupdate PodSpec dengan nama node. kubelet di node yang ditunjuk kemudian membuat container.\n\n## Controller Pattern dan Informers\n\nController berjalan dalam loop:\n\n1. **Watch**: mengamati perubahan resource melalui API server.\n2. **Diff**: membandingkan desired state dengan actual state.\n3. **Act**: mengambil tindakan untuk menyelaraskan state.\n\nInformers menyediakan cache lokal dari resource untuk mengurangi beban API server. Shared informers digunakan oleh banyak controller dalam satu proses.\n\n## Admission Webhooks\n\nAdmission controller mengintervensi request ke API server sebelum objek disimpan. Dua jenis:\n\n- **MutatingAdmissionWebhook**: mengubah objek, misalnya menambahkan sidecar.\n- **ValidatingAdmissionWebhook**: menolak objek yang melanggar kebijakan.\n\n## CRI, CNI, CSI\n\n- **CRI (Container Runtime Interface)**: mengabstraksi container runtime sehingga Kubernetes dapat menggunakan containerd, CRI-O, atau runtime lain.\n- **CNI (Container Network Interface)**: standar plugin jaringan seperti Calico, Cilium, Flannel.\n- **CSI (Container Storage Interface)**: standar penyedia storage untuk volume persisten.\n\n## HPA Internals\n\nHorizontal Pod Autoscaler mengamati metrics dari metrics-server atau custom metrics API. HPA menghitung desired replicas berdasarkan rasio current/target utilization dan mengupdate Deployment.\n\n## etcd Watch Streams\n\nKomponen Kubernetes menggunakan watch stream dari API server (yang didukung oleh etcd watch) untuk menerima notifikasi perubahan secara realtime. Watch memungkinkan reaksi cepat terhadap perubahan state cluster.",
    },
    {
      id: "sec-03-go-example",
      type: 'code-example',
      codeExample: {
        id: "code-03-go",
        filename: "scheduler-score.go",
        language: "go",
        title: "Go: Scoring Node untuk Scheduler",
        code: "package main\n\nimport (\n\t\"fmt\"\n)\n\ntype Node struct {\n\tName           string\n\tCPUAvailable   int\n\tMemoryAvailable int\n}\n\ntype PodRequest struct {\n\tCPU    int\n\tMemory int\n}\n\nfunc scoreNode(req PodRequest, node Node) float64 {\n\tcpuRatio := float64(req.CPU) / float64(node.CPUAvailable)\n\tmemRatio := float64(req.Memory) / float64(node.MemoryAvailable)\n\treturn (cpuRatio + memRatio) / 2\n}\n\nfunc main() {\n\tnodes := []Node{\n\t\t{Name: \"node-a\", CPUAvailable: 4, MemoryAvailable: 8192},\n\t\t{Name: \"node-b\", CPUAvailable: 8, MemoryAvailable: 16384},\n\t}\n\treq := PodRequest{CPU: 2, Memory: 4096}\n\n\tbest := nodes[0]\n\tbestScore := scoreNode(req, best)\n\tfor _, n := range nodes[1:] {\n\t\ts := scoreNode(req, n)\n\t\tif s > bestScore {\n\t\t\tbest = n\n\t\t\tbestScore = s\n\t\t}\n\t}\n\tfmt.Printf(\"Node terpilih: %s (score %.2f)\\n\", best.Name, bestScore)\n}",
        explanation: "Setelah filter predicates, scheduler memberi skor node. Program Go ini mensimulasikan scoring berdasarkan utilization; node yang lebih terutilisasi sesuai request mendapat skor lebih tinggi.",
      },
    },
    {
      id: "sec-03-summary",
      type: 'callout',
      calloutType: "info",
      content: "**Kesimpulan:** Kubernetes adalah sistem control loop terdistribusi. Memahami etcd RAFT, scheduler predicates/priorities, controller pattern, dan antarmuka CRI/CNI/CSI membantu engineer mendiagnosis masalah cluster dan merancang workload yang efisien.",
    },
  ],
}
