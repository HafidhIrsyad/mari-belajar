import type { Lesson } from '@/content/types'

export const ch01KubernetesControllersOperatorsApiServerLesson: Lesson = {
  id: 'lesson-ch-01-kubernetes-controllers-operators-api-server',
  estimatedMinutes: 55,
  sections: [
    {
      id: 'sec-01-basic',
      type: 'markdown',
      level: 'basic',
      title: 'State Desired vs Actual',
      content: '## Version Control dan GitOps\nKubernetes adalah sistem deklaratif. Anda mengirimkan manifest yang menjelaskan *desired state*; control plane bekerja agar *actual state* mendekati desired state. Jika Pod mati, Deployment controller membuat Pod baru.\n\n## kubectl dan API Server\nSetiap perintah `kubectl` diterjemahkan menjadi permintaan HTTP ke kube-apiserver. API server adalah gateway utama; semua komponen termasuk controller berkomunikasi melaluinya.\n\n## Objek Dasar\n- Pod: unit terkecil yang menjalankan container.\n- Deployment: mengelola ReplicaSet untuk menjaga jumlah replika.\n- Service: menyediakan endpoint stabil untuk Pod.',
    },
    {
      id: 'sec-01-js',
      type: 'code-example',
      codeExample: {
        id: 'code-01-js',
        filename: 'controller-sim.js',
        language: 'javascript',
        title: 'JavaScript: Simulasi Controller Reconcile',
        code: 'const desiredState = {\n  deployment: \'web\',\n  replicas: 3\n}\nconst actualPods = [\'web-1\', \'web-2\']\n\nfunction reconcile(desired, actualCount) {\n  if (actualCount < desired.replicas) {\n    console.log(`Create ${desired.replicas - actualCount} pod(s)`)\n  } else if (actualCount > desired.replicas) {\n    console.log(`Remove ${actualCount - desired.replicas} pod(s)`)\n  } else {\n    console.log(\'State converged\')\n  }\n}\n\nreconcile(desiredState, actualPods.length)',
        explanation: 'Simulasi loop rekonsiliasi yang membandingkan replika yang diinginkan dengan jumlah Pod aktual.',
      },
    },
    {
      id: 'sec-01-intermediate',
      type: 'markdown',
      level: 'intermediate',
      title: 'Controller Pattern, Informer, dan Workqueue',
      content: '## Pola Controller\nSetiap controller mengikuti loop:\n1. **Watch**: pantau perubahan objek via API server.\n2. **Diff**: bandingkan desired state dan actual state.\n3. **Act**: lakukan aksi untuk mendekatkan keduanya.\n\n## Informer dan SharedInformer\nInformer adalah abstraksi client-go yang menggabungkan `List`, `Watch`, dan cache lokal. SharedInformer memungkinkan banyak controller berbagi cache yang sama untuk mengurangi beban API server.\n\n## Workqueue\nEvent dari informer tidak langsung diproses; dimasukkan ke workqueue. Workqueue mendeduplikasi event, menangani retry, dan mendukung rate limiting.\n\n## Leader Election\nDalam deployment HA, hanya satu instance controller yang aktif sebagai leader. Jika leader gagal, follower mengambil alih melalui mekanisme lease di API server.',
    },
    {
      id: 'sec-01-ts',
      type: 'code-example',
      codeExample: {
        id: 'code-01-ts',
        filename: 'deployment-controller.ts',
        language: 'typescript',
        title: 'TypeScript: Typed Deployment Controller',
        code: 'interface DeploymentSpec {\n  name: string\n  replicas: number\n}\ninterface Pod {\n  id: string\n  deployment: string\n}\n\nclass DeploymentController {\n  private pods: Pod[] = []\n\n  reconcile(spec: DeploymentSpec): void {\n    const owned = this.pods.filter(p => p.deployment === spec.name)\n    const diff = spec.replicas - owned.length\n    if (diff > 0) {\n      for (let i = 0; i < diff; i++) {\n        this.pods.push({ id: crypto.randomUUID(), deployment: spec.name })\n      }\n    } else if (diff < 0) {\n      this.pods.splice(0, -diff)\n    }\n    console.log(`${spec.name}: ${this.pods.length} pods`)\n  }\n}\n\nconst ctl = new DeploymentController()\nctl.reconcile({ name: \'api\', replicas: 3 })',
        explanation: 'TypeScript memastikan perubahan spec dan state memiliki tipe yang jelas sehingga rekonsiliasi lebih aman.',
      },
    },
    {
      id: 'sec-01-advanced',
      type: 'markdown',
      level: 'advanced',
      title: 'CRD, Operator, Admission Webhooks, dan etcd Watch',
      content: '## CRD dan Aggregasi API\nCustom Resource Definition (CRD) memperluas skema API Kubernetes. Setelah CRD didefinisikan, Anda dapat membuat objek custom seperti `DatabaseClaim`. API server aggregation memungkinkan menambahkan API group tambahan melalui APIService.\n\n## Operator\nOperator = CRD + custom controller + sumber daya pendukung (RBAC, ServiceAccount). Operator SDK dan kubebuilder menyediakan scaffolding, code generation, dan testing.\n\n## Admission Webhooks\n- **Validating webhook**: menolak objek yang tidak memenuhi kebijakan.\n- **Mutating webhook**: mengubah objek sebelum disimpan, misalnya menyuntikkan sidecar.\n\n## etcd Watch Streams\nAPI server mengubah watch request menjadi streaming response HTTP. etcd memberikan event perubahan key; API server memfilter dan mengirimkan event ke client.',
    },
    {
      id: 'sec-01-go',
      type: 'code-example',
      codeExample: {
        id: 'code-01-go',
        filename: 'reconcile.go',
        language: 'go',
        title: 'Go: Fungsi Reconcile Idempoten',
        code: 'package main\n\nimport (\n\t"fmt"\n)\n\ntype Deployment struct {\n\tName     string\n\tReplicas int\n}\n\ntype Pod struct {\n\tID string\n}\n\nfunc reconcile(d Deployment, pods []Pod) []Pod {\n\tdiff := d.Replicas - len(pods)\n\tif diff > 0 {\n\t\tfor i := 0; i < diff; i++ {\n\t\t\tpods = append(pods, Pod{ID: fmt.Sprintf("%s-%d", d.Name, len(pods)+1)})\n\t\t}\n\t} else if diff < 0 {\n\t\tpods = pods[:len(pods)+diff]\n\t}\n\treturn pods\n}\n\nfunc main() {\n\td := Deployment{Name: "api", Replicas: 3}\n\tpods := reconcile(d, nil)\n\tfmt.Println("initial:", len(pods))\n\td.Replicas = 2\n\tpods = reconcile(d, pods)\n\tfmt.Println("after scale down:", len(pods))\n}',
        explanation: 'Fungsi reconcile idempoten menambah atau memangkas Pod sesuai desired replicas.',
      },
    },
    {
      id: 'sec-01-callout',
      type: 'callout',
      calloutType: 'info',
      content: '**Kesimpulan:** Controller harus idempoten, graceful saat error, dan tidak bergantung pada urutan event. Gunakan workqueue dan leader election untuk production.',
    },
  ],
}
