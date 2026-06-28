#!/usr/bin/env python3
"""Generate the devops-advanced course content files."""
import json
import re
from pathlib import Path

ROOT = Path('src/content/courses/devops-advanced')

def to_ts_value(value, indent=0):
    sp = '  ' * indent
    if isinstance(value, dict):
        if not value:
            return '{}'
        lines = []
        for key, val in value.items():
            lines.append(f'{sp}  {key}: {to_ts_value(val, indent + 1)},')
        return '{\n' + '\n'.join(lines) + f'\n{sp}}}'
    if isinstance(value, list):
        if not value:
            return '[]'
        lines = []
        for item in value:
            lines.append(f'{sp}  {to_ts_value(item, indent + 1)},')
        return '[\n' + '\n'.join(lines) + f'\n{sp}]'
    if isinstance(value, str):
        escaped = (
            value.replace('\\', '\\\\')
            .replace("'", "\\'")
            .replace('\n', '\\n')
            .replace('\r', '\\r')
            .replace('\t', '\\t')
        )
        return f"'{escaped}'"
    if isinstance(value, bool):
        return 'true' if value else 'false'
    if value is None:
        return 'null'
    return str(value)

def write_ts(path: Path, imports: str, var_name: str, ts_type: str, data):
    body = to_ts_value(data, indent=0)
    path.write_text(f"{imports}\n\nexport const {var_name}: {ts_type} = {body}\n", encoding='utf-8')

chapters = []

# ---------- Chapter 1 ----------
ch1 = {
    'slug': 'ch-01-kubernetes-controllers-operators-api-server',
    'title': 'Kubernetes Controllers, Operators & API Server Internals',
    'summary': 'Memahami pola controller, informer, workqueue, leader election, CRD, operator, admission webhook, dan alur permintaan di API server Kubernetes.',
    'estimatedMinutes': 55,
    'learningObjectives': [
        'Menjelaskan perbedaan state desired dan actual di Kubernetes.',
        'Memahami pola controller watch-diff-act dan peran informer.',
        'Menggunakan workqueue dan leader election untuk controller konkuren.',
        'Merancang CRD dan custom controller sederhana.',
        'Menjelaskan admission webhooks dan aggregasi API server.',
    ],
    'summaryPoints': [
        'Controller terus-menerus merekonsiliasi desired state dengan actual state.',
        'Informer menyediakan cache lokal dan event handler berbasis watch dari API server.',
        'CRD memperluas API Kubernetes tanpa mengubah kode API server.',
        'Operator mengemas custom controller, CRD, dan sumber daya terkait.',
        'Admission webhooks dapat memvalidasi atau memutasikan objek sebelum disimpan etcd.',
    ],
    'references': [
        {'id': 'ref-01-01', 'title': 'Kubernetes Docs — Extending Kubernetes', 'url': 'https://kubernetes.io/docs/concepts/extend-kubernetes/', 'description': 'Dokumentasi resmi tentang cara memperluas Kubernetes dengan CRD, operator, dan aggregation layer.', 'type': 'documentation'},
        {'id': 'ref-01-02', 'title': 'Kubernetes by Example', 'url': 'https://kubernetesbyexample.com/', 'description': 'Tutorial interaktif untuk memahami konsep Kubernetes secara praktis.', 'type': 'interactive'},
        {'id': 'ref-01-03', 'title': 'Kubernetes Patterns', 'url': 'https://k8spatterns.io/', 'description': 'Buku referensi pola desain Kubernetes termasuk controller dan operator patterns.', 'type': 'book'},
        {'id': 'ref-01-04', 'title': 'Operator SDK', 'url': 'https://sdk.operatorframework.io/', 'description': 'Dokumentasi SDK untuk membangun operator Kubernetes dengan Go, Ansible, atau Helm.', 'type': 'documentation'},
        {'id': 'ref-01-05', 'title': 'client-go Docs', 'url': 'https://github.com/kubernetes/client-go', 'description': 'Library Go resmi untuk berinteraksi dengan API server Kubernetes.', 'type': 'documentation'},
    ],
    'quiz': {
        'id': 'quiz-ch-01-kubernetes-controllers-operators-api-server',
        'title': 'Quiz: Kubernetes Controllers, Operators & API Server Internals',
        'passingScore': 8,
        'questions': [
            {'id': 'q-01-01', 'order': 1, 'prompt': 'Apa tugas utama controller Kubernetes?', 'options': ['Menyimpan data di etcd', 'Merekonsiliasi desired state dengan actual state', 'Mengompilasi container image', 'Mengatur DNS cluster'], 'correctOptionIndex': 1, 'explanation': 'Controller terus membandingkan desired state dengan actual state lalu mengambil aksi rekonsiliasi.'},
            {'id': 'q-01-02', 'order': 2, 'prompt': 'Apa keuntungan SharedInformer?', 'options': ['Menghilangkan kebutuhan RBAC', 'Mengurangi beban API server dengan cache bersama', 'Menjalankan container secara langsung', 'Menggantikan scheduler'], 'correctOptionIndex': 1, 'explanation': 'SharedInformer memungkinkan banyak controller berbagi cache lokal sehingga mengurangi jumlah watch ke API server.'},
            {'id': 'q-01-03', 'order': 3, 'prompt': 'Komponen apa yang mendeduplikasi event dan menangani retry?', 'options': ['kubelet', 'workqueue', 'kube-proxy', 'etcd'], 'correctOptionIndex': 1, 'explanation': 'Workqueue menyimpan key objek yang perlu diproses, mendeduplikasi, dan menangani retry dengan rate limiting.'},
            {'id': 'q-01-04', 'order': 4, 'prompt': 'CRD digunakan untuk?', 'options': ['Mengganti Deployment bawaan', 'Memperluas API Kubernetes dengan resource custom', 'Menghapus namespace otomatis', 'Mengatur HPA'], 'correctOptionIndex': 1, 'explanation': 'Custom Resource Definition memperluas skema API Kubernetes sehingga kita dapat membuat resource sendiri.'},
            {'id': 'q-01-05', 'order': 5, 'prompt': 'Operator terdiri dari?', 'options': ['Hanya Pod', 'CRD + custom controller + resource pendukung', 'Sebuah Service', 'Hanya ConfigMap'], 'correctOptionIndex': 1, 'explanation': 'Operator adalah paket yang berisi CRD, custom controller, dan resource pendukung seperti RBAC dan ServiceAccount.'},
            {'id': 'q-01-06', 'order': 6, 'prompt': 'Admission webhook mutating berfungsi?', 'options': ['Menolak objek tidak valid', 'Mengubah objek sebelum disimpan', 'Mengarsipkan log', 'Mengupdate image registry'], 'correctOptionIndex': 1, 'explanation': 'Mutating admission webhook dapat memodifikasi objek, misalnya menyuntikkan sidecar atau default field.'},
            {'id': 'q-01-07', 'order': 7, 'prompt': 'API server aggregation memungkinkan?', 'options': ['Menambahkan API group eksternal', 'Menghapus etcd', 'Mengganti kubelet', 'Menghentikan scheduler'], 'correctOptionIndex': 0, 'explanation': 'Aggregation layer memungkinkan menambahkan API group baru melalui APIService yang merujuk ke service eksternal.'},
            {'id': 'q-01-08', 'order': 8, 'prompt': 'Mengapa leader election penting untuk controller HA?', 'options': ['Agar semua instance aktif bersamaan', 'Menghindari race condition dengan satu leader', 'Mengurangi jumlah Pod', 'Mempercepat scheduling'], 'correctOptionIndex': 1, 'explanation': 'Leader election memastikan hanya satu instance controller yang aktif memproses event, mencegah konflik.'},
        ],
    },
    'lesson': {
        'id': 'lesson-ch-01-kubernetes-controllers-operators-api-server',
        'estimatedMinutes': 55,
        'sections': [
            {
                'id': 'sec-01-basic',
                'type': 'markdown',
                'level': 'basic',
                'title': 'State Desired vs Actual',
                'content': '## Version Control dan GitOps\nKubernetes adalah sistem deklaratif. Anda mengirimkan manifest yang menjelaskan *desired state*; control plane bekerja agar *actual state* mendekati desired state. Jika Pod mati, Deployment controller membuat Pod baru.\n\n## kubectl dan API Server\nSetiap perintah `kubectl` diterjemahkan menjadi permintaan HTTP ke kube-apiserver. API server adalah gateway utama; semua komponen termasuk controller berkomunikasi melaluinya.\n\n## Objek Dasar\n- Pod: unit terkecil yang menjalankan container.\n- Deployment: mengelola ReplicaSet untuk menjaga jumlah replika.\n- Service: menyediakan endpoint stabil untuk Pod.'
            },
            {
                'id': 'sec-01-js',
                'type': 'code-example',
                'codeExample': {
                    'id': 'code-01-js',
                    'filename': 'controller-sim.js',
                    'language': 'javascript',
                    'title': 'JavaScript: Simulasi Controller Reconcile',
                    'code': "const desiredState = {\n  deployment: 'web',\n  replicas: 3\n}\nconst actualPods = ['web-1', 'web-2']\n\nfunction reconcile(desired, actualCount) {\n  if (actualCount < desired.replicas) {\n    console.log(`Create ${desired.replicas - actualCount} pod(s)`)\n  } else if (actualCount > desired.replicas) {\n    console.log(`Remove ${actualCount - desired.replicas} pod(s)`)\n  } else {\n    console.log('State converged')\n  }\n}\n\nreconcile(desiredState, actualPods.length)",
                    'explanation': 'Simulasi loop rekonsiliasi yang membandingkan replika yang diinginkan dengan jumlah Pod aktual.'
                }
            },
            {
                'id': 'sec-01-intermediate',
                'type': 'markdown',
                'level': 'intermediate',
                'title': 'Controller Pattern, Informer, dan Workqueue',
                'content': '## Pola Controller\nSetiap controller mengikuti loop:\n1. **Watch**: pantau perubahan objek via API server.\n2. **Diff**: bandingkan desired state dan actual state.\n3. **Act**: lakukan aksi untuk mendekatkan keduanya.\n\n## Informer dan SharedInformer\nInformer adalah abstraksi client-go yang menggabungkan `List`, `Watch`, dan cache lokal. SharedInformer memungkinkan banyak controller berbagi cache yang sama untuk mengurangi beban API server.\n\n## Workqueue\nEvent dari informer tidak langsung diproses; dimasukkan ke workqueue. Workqueue mendeduplikasi event, menangani retry, dan mendukung rate limiting.\n\n## Leader Election\nDalam deployment HA, hanya satu instance controller yang aktif sebagai leader. Jika leader gagal, follower mengambil alih melalui mekanisme lease di API server.'
            },
            {
                'id': 'sec-01-ts',
                'type': 'code-example',
                'codeExample': {
                    'id': 'code-01-ts',
                    'filename': 'deployment-controller.ts',
                    'language': 'typescript',
                    'title': 'TypeScript: Typed Deployment Controller',
                    'code': "interface DeploymentSpec {\n  name: string\n  replicas: number\n}\ninterface Pod {\n  id: string\n  deployment: string\n}\n\nclass DeploymentController {\n  private pods: Pod[] = []\n\n  reconcile(spec: DeploymentSpec): void {\n    const owned = this.pods.filter(p => p.deployment === spec.name)\n    const diff = spec.replicas - owned.length\n    if (diff > 0) {\n      for (let i = 0; i < diff; i++) {\n        this.pods.push({ id: crypto.randomUUID(), deployment: spec.name })\n      }\n    } else if (diff < 0) {\n      this.pods.splice(0, -diff)\n    }\n    console.log(`${spec.name}: ${this.pods.length} pods`)\n  }\n}\n\nconst ctl = new DeploymentController()\nctl.reconcile({ name: 'api', replicas: 3 })",
                    'explanation': 'TypeScript memastikan perubahan spec dan state memiliki tipe yang jelas sehingga rekonsiliasi lebih aman.'
                }
            },
            {
                'id': 'sec-01-advanced',
                'type': 'markdown',
                'level': 'advanced',
                'title': 'CRD, Operator, Admission Webhooks, dan etcd Watch',
                'content': '## CRD dan Aggregasi API\nCustom Resource Definition (CRD) memperluas skema API Kubernetes. Setelah CRD didefinisikan, Anda dapat membuat objek custom seperti `DatabaseClaim`. API server aggregation memungkinkan menambahkan API group tambahan melalui APIService.\n\n## Operator\nOperator = CRD + custom controller + sumber daya pendukung (RBAC, ServiceAccount). Operator SDK dan kubebuilder menyediakan scaffolding, code generation, dan testing.\n\n## Admission Webhooks\n- **Validating webhook**: menolak objek yang tidak memenuhi kebijakan.\n- **Mutating webhook**: mengubah objek sebelum disimpan, misalnya menyuntikkan sidecar.\n\n## etcd Watch Streams\nAPI server mengubah watch request menjadi streaming response HTTP. etcd memberikan event perubahan key; API server memfilter dan mengirimkan event ke client.'
            },
            {
                'id': 'sec-01-go',
                'type': 'code-example',
                'codeExample': {
                    'id': 'code-01-go',
                    'filename': 'reconcile.go',
                    'language': 'go',
                    'title': 'Go: Fungsi Reconcile Idempoten',
                    'code': "package main\n\nimport (\n\t\"fmt\"\n)\n\ntype Deployment struct {\n\tName     string\n\tReplicas int\n}\n\ntype Pod struct {\n\tID string\n}\n\nfunc reconcile(d Deployment, pods []Pod) []Pod {\n\tdiff := d.Replicas - len(pods)\n\tif diff > 0 {\n\t\tfor i := 0; i < diff; i++ {\n\t\t\tpods = append(pods, Pod{ID: fmt.Sprintf(\"%s-%d\", d.Name, len(pods)+1)})\n\t\t}\n\t} else if diff < 0 {\n\t\tpods = pods[:len(pods)+diff]\n\t}\n\treturn pods\n}\n\nfunc main() {\n\td := Deployment{Name: \"api\", Replicas: 3}\n\tpods := reconcile(d, nil)\n\tfmt.Println(\"initial:\", len(pods))\n\td.Replicas = 2\n\tpods = reconcile(d, pods)\n\tfmt.Println(\"after scale down:\", len(pods))\n}",
                    'explanation': 'Fungsi reconcile idempoten menambah atau memangkas Pod sesuai desired replicas.'
                }
            },
            {
                'id': 'sec-01-callout',
                'type': 'callout',
                'calloutType': 'info',
                'content': '**Kesimpulan:** Controller harus idempoten, graceful saat error, dan tidak bergantung pada urutan event. Gunakan workqueue dan leader election untuk production.'
            },
        ],
    },
}
chapters.append(ch1)

# ---------- Chapter 2 ----------
ch2 = {
    'slug': 'ch-02-service-mesh-concept',
    'title': 'Service Mesh (Konsep)',
    'summary': 'Memahami arsitektur service mesh, sidecar proxy, mTLS, traffic management, observability, dan zero-trust networking.',
    'estimatedMinutes': 50,
    'learningObjectives': [
        'Menjelaskan peran data plane dan control plane.',
        'Memahami sidecar pattern dan injeksi proses.',
        'Mengkonfigurasi traffic split, retries, dan mTLS.',
        'Mengidentifikasi keuntungan dan biaya service mesh.',
        'Memahami zero-trust networking di mesh.',
    ],
    'summaryPoints': [
        'Service mesh menyediakan komunikasi service-to-service yang aman dan terobservasi.',
        'Sidecar proxy mengintersep lalu lintas keluar-masuk Pod.',
        'mTLS otomatis memastikan autentikasi dan enkripsi antar service.',
        'Traffic management: split, retries, timeouts, circuit breaker.',
        'Zero-trust: tidak ada trust implisit berdasarkan network location.',
    ],
    'references': [
        {'id': 'ref-02-01', 'title': 'Istio Docs', 'url': 'https://istio.io/latest/docs/', 'description': 'Dokumentasi resmi Istio service mesh.', 'type': 'documentation'},
        {'id': 'ref-02-02', 'title': 'Linkerd Docs', 'url': 'https://linkerd.io/2/overview/', 'description': 'Dokumentasi resmi Linkerd, service mesh yang ringan.', 'type': 'documentation'},
        {'id': 'ref-02-03', 'title': 'CNCF — What is a Service Mesh', 'url': 'https://www.cncf.io/blog/2021/07/28/what-is-a-service-mesh/', 'description': 'Artikel CNCF yang menjelaskan konsep dan manfaat service mesh.', 'type': 'article'},
        {'id': 'ref-02-04', 'title': 'Buoyant — Service Mesh 101', 'url': 'https://buoyant.io/service-mesh-101', 'description': 'Video dan artikel pengantar service mesh dari pembuat Linkerd.', 'type': 'video'},
        {'id': 'ref-02-05', 'title': 'NGINX — What is a Service Mesh', 'url': 'https://www.nginx.com/blog/what-is-a-service-mesh/', 'description': 'Artikel praktis tentang use case dan komponen service mesh.', 'type': 'article'},
    ],
    'quiz': {
        'id': 'quiz-ch-02-service-mesh-concept',
        'title': 'Quiz: Service Mesh (Konsep)',
        'passingScore': 8,
        'questions': [
            {'id': 'q-02-01', 'order': 1, 'prompt': 'Apa peran data plane?', 'options': ['Menyimpan konfigurasi etcd', 'Mengirim dan menerima traffic via proxy sidecar', 'Mengelola DNS', 'Mengompilasi image'], 'correctOptionIndex': 1, 'explanation': 'Data plane terdiri dari proxy sidecar yang menangani lalu lintas aplikasi.'},
            {'id': 'q-02-02', 'order': 2, 'prompt': 'Sidecar proxy biasanya berjalan sebagai?', 'options': ['Container terpisah dalam Pod yang sama', 'VM terpisah', 'Proses di node', 'Bagian dari kernel'], 'correctOptionIndex': 0, 'explanation': 'Sidecar proxy berjalan sebagai container tambahan dalam Pod yang sama dengan aplikasi.'},
            {'id': 'q-02-03', 'order': 3, 'prompt': 'mTLS memastikan?', 'options': ['Hanya client memverifikasi server', 'Kedua sisi memverifikasi identitas satu sama lain', 'Tidak ada enkripsi', 'Penggunaan HTTP/1.1'], 'correctOptionIndex': 1, 'explanation': 'Mutual TLS memastikan kedua pihak saling mengautentikasi dan mengenkripsi komunikasi.'},
            {'id': 'q-02-04', 'order': 4, 'prompt': 'Konfigurasi apa yang mendefinisikan routing rules di Istio?', 'options': ['DestinationRule', 'VirtualService', 'PodSecurityPolicy', 'NetworkPolicy'], 'correctOptionIndex': 1, 'explanation': 'VirtualService mendefinisikan aturan routing traffic di Istio.'},
            {'id': 'q-02-05', 'order': 5, 'prompt': 'Zero-trust mengasumsikan?', 'options': ['Semua host di dalam cluster aman', 'Tidak ada trust implisit berdasarkan lokasi jaringan', 'Firewall cukup', 'VPN wajib'], 'correctOptionIndex': 1, 'explanation': 'Zero-trust selalu memverifikasi identitas dan izin, tanpa mengandalkan lokasi jaringan.'},
            {'id': 'q-02-06', 'order': 6, 'prompt': 'eBPF dalam service mesh digunakan untuk?', 'options': ['Mengganti container runtime', 'Mengurangi overhead sidecar dengan kernel-level interception', 'Menyimpan secret', 'Mengelola etcd'], 'correctOptionIndex': 1, 'explanation': 'eBPF memungkinkan interception di kernel sehingga mengurangi kebutuhan sidecar.'},
            {'id': 'q-02-07', 'order': 7, 'prompt': 'SPIFFE adalah?', 'options': ['Framework identity untuk workload', 'Container registry', 'Log aggregator', 'Build tool'], 'correctOptionIndex': 0, 'explanation': 'SPIFFE menyediakan standard identity untuk workload yang digunakan service mesh untuk mTLS.'},
            {'id': 'q-02-08', 'order': 8, 'prompt': 'Kapan service mesh kurang tepat?', 'options': ['Cluster kecil dengan sedikit service', 'Kebutuhan mTLS dan observability tinggi', 'Arsitektur microservices', 'Multi-cluster'], 'correctOptionIndex': 0, 'explanation': 'Service mesh menambah kompleksitas dan overhead, sehingga kurang tepat untuk cluster sederhana.'},
        ],
    },
    'lesson': {
        'id': 'lesson-ch-02-service-mesh-concept',
        'estimatedMinutes': 50,
        'sections': [
            {
                'id': 'sec-02-basic',
                'type': 'markdown',
                'level': 'basic',
                'title': 'Apa itu Service Mesh?',
                'content': '## Definisi\nService mesh adalah lapisan infrastruktur yang mengelola komunikasi antar service dalam aplikasi terdistribusi tanpa mengubah kode aplikasi.\n\n## Data Plane vs Control Plane\n- **Data plane**: kumpulan proxy sidecar yang mengirim dan menerima traffic.\n- **Control plane**: mengatur kebijakan, certificate, dan konfigurasi proxy.\n\n## Sidecar Pattern\nSetiap Pod aplikasi mendapat container proxy tambahan (misal Istio/Envoy). Aplikasi berkomunikasi melalui localhost ke proxy; proxy menangani discovery, load balancing, dan keamanan.'
            },
            {
                'id': 'sec-02-js',
                'type': 'code-example',
                'codeExample': {
                    'id': 'code-02-js',
                    'filename': 'mesh-headers.js',
                    'language': 'javascript',
                    'title': 'JavaScript: Simulasi Sidecar Header Injection',
                    'code': "const express = require('express')\nconst app = express()\n\napp.use((req, res, next) => {\n  req.headers['x-mesh-trace-id'] = Math.random().toString(36).slice(2)\n  next()\n})\n\napp.get('/users', (req, res) => {\n  res.json({ service: 'users', trace: req.headers['x-mesh-trace-id'] })\n})\n\napp.listen(3000, () => console.log('service listening with mesh headers'))",
                    'explanation': 'Middleware ini meniru sidecar yang menyuntikkan header tracing sebelum request mencapai aplikasi.'
                }
            },
            {
                'id': 'sec-02-intermediate',
                'type': 'markdown',
                'level': 'intermediate',
                'title': 'mTLS, Traffic Management, dan Observability',
                'content': '## mTLS dan Identitas Service\nService mesh secara otomatis mengeluarkan sertifikat untuk setiap workload. Setiap sisi koneksi memverifikasi identitas lawan, menghasilkan mutual TLS.\n\n## Traffic Management\n- **VirtualService**: mendefinisikan routing rules.\n- **DestinationRule**: kebijakan untuk subset service.\n- **Retry dan timeout**: meningkatkan reliability.\n- **Traffic split**: canary dan A/B testing.\n\n## Observability Sidecar\nProxy mengumpulkan metrics (Prometheus), logs, dan traces secara seragam tanpa perubahan kode aplikasi.'
            },
            {
                'id': 'sec-02-ts',
                'type': 'code-example',
                'codeExample': {
                    'id': 'code-02-ts',
                    'filename': 'istio-config.ts',
                    'language': 'typescript',
                    'title': 'TypeScript: Model VirtualService Canary',
                    'code': "interface DestinationRule {\n  host: string\n  subsets: { name: string; labels: Record<string, string> }[]\n}\n\ninterface VirtualService {\n  hosts: string[]\n  http: {\n    route: { destination: { host: string; subset?: string }; weight: number }[]\n    retries?: { attempts: number; perTryTimeout: string }\n  }[]\n}\n\nconst canary: VirtualService = {\n  hosts: ['reviews'],\n  http: [{\n    route: [\n      { destination: { host: 'reviews', subset: 'v1' }, weight: 90 },\n      { destination: { host: 'reviews', subset: 'v2' }, weight: 10 },\n    ],\n    retries: { attempts: 3, perTryTimeout: '2s' },\n  }],\n}\nconsole.log(JSON.stringify(canary, null, 2))",
                    'explanation': 'Konfigurasi traffic split canary 90/10 dengan retry policy, didefinisikan secara type-safe.'
                }
            },
            {
                'id': 'sec-02-advanced',
                'type': 'markdown',
                'level': 'advanced',
                'title': 'Zero-Trust, Sidecar-less, dan SMI',
                'content': '## Zero-Trust Networking\nPrinsip: "never trust, always verify". Setiap request diautentikasi dan diautorisasi. Network segmentation saja tidak cukup; identitas workload menjadi dasar kebijakan.\n\n## Sidecar-less dan eBPF\nTeknologi baru seperti Cilium Service Mesh menggunakan eBPF untuk mengurangi overhead sidecar. Ambient mesh memisahkan peran ztunnel dan waypoint proxy.\n\n## SMI dan Gateway API\nService Mesh Interface (SMI) adalah spesifikasi vendor-neutral untuk konfigurasi mesh. Kubernetes Gateway API menyediakan abstraksi routing yang dapat diadopsi mesh.'
            },
            {
                'id': 'sec-02-go',
                'type': 'code-example',
                'codeExample': {
                    'id': 'code-02-go',
                    'filename': 'mesh-mtls.go',
                    'language': 'go',
                    'title': 'Go: HTTP Server dengan mTLS',
                    'code': "package main\n\nimport (\n\t\"crypto/tls\"\n\t\"fmt\"\n\t\"net/http\"\n)\n\nfunc main() {\n\tconfig := &tls.Config{\n\t\tClientAuth: tls.RequireAndVerifyClientCert,\n\t\tMinVersion: tls.VersionTLS13,\n\t}\n\tserver := &http.Server{\n\t\tAddr:      \":8443\",\n\t\tTLSConfig: config,\n\t\tHandler: http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {\n\t\t\tfmt.Fprintln(w, \"hello from meshed service\")\n\t\t}),\n\t}\n\tfmt.Println(server.ListenAndServeTLS(\"server.crt\", \"server.key\"))\n}",
                    'explanation': 'Konfigurasi Go ini menunjukkan penerapan mTLS yang menjadi dasar keamanan service mesh.'
                }
            },
            {
                'id': 'sec-02-callout',
                'type': 'callout',
                'calloutType': 'info',
                'content': '**Kesimpulan:** Service mesh menambah kompleksitas dan overhead latensi. Evaluasi ukuran cluster dan kebutuhan keamanan sebelum mengadopsi. Sidecar-less mesh dapat mengurangi overhead di cluster besar.'
            },
        ],
    },
}
chapters.append(ch2)

# ---------- Chapter 3 ----------
ch3 = {
    'slug': 'ch-03-gitops-lanjutan',
    'title': 'GitOps Lanjutan',
    'summary': 'Menguasai ArgoCD ApplicationSet, penyimpanan secret aman, progressive delivery, multi-cluster GitOps, dan kebijakan.',
    'estimatedMinutes': 50,
    'learningObjectives': [
        'Memahami ArgoCD Application dan ApplicationSet.',
        'Mengelola secret di Git dengan SOPS/Sealed Secrets.',
        'Menerapkan progressive delivery dengan Argo Rollouts.',
        'Merancang multi-cluster GitOps.',
        'Mengintegrasikan policy enforcement.',
    ],
    'summaryPoints': [
        'Git adalah single source of truth untuk desired state cluster.',
        'ApplicationSet membuat banyak Application dari generator.',
        'Secret di Git harus dienkripsi atau diambil dari vault.',
        'Progressive delivery mengurangi risiko deployment.',
        'Policy enforcement memastikan manifest memenuhi standar.',
    ],
    'references': [
        {'id': 'ref-03-01', 'title': 'ArgoCD Docs', 'url': 'https://argo-cd.readthedocs.io/', 'description': 'Dokumentasi resmi ArgoCD untuk GitOps pada Kubernetes.', 'type': 'documentation'},
        {'id': 'ref-03-02', 'title': 'Argo Rollouts', 'url': 'https://argoproj.github.io/rollouts/', 'description': 'Dokumentasi progressive delivery dengan canary dan blue-green deployment.', 'type': 'documentation'},
        {'id': 'ref-03-03', 'title': 'Flux Docs', 'url': 'https://fluxcd.io/', 'description': 'Dokumentasi GitOps operator alternatif yang native di Kubernetes.', 'type': 'documentation'},
        {'id': 'ref-03-04', 'title': 'GitOps.tech', 'url': 'https://www.gitops.tech/', 'description': 'Artikel komprehensif yang menjelaskan prinsip dan praktik GitOps.', 'type': 'article'},
        {'id': 'ref-03-05', 'title': 'ValueStreamAI — GitOps 2026', 'url': 'https://valuestreamai.com/blog/ai-deployment-automation-guide-2026', 'description': 'Artikel tren GitOps dan otomasi deployment modern.', 'type': 'article'},
    ],
    'quiz': {
        'id': 'quiz-ch-03-gitops-lanjutan',
        'title': 'Quiz: GitOps Lanjutan',
        'passingScore': 8,
        'questions': [
            {'id': 'q-03-01', 'order': 1, 'prompt': 'Prinsip utama GitOps?', 'options': ['State cluster disimpan di database SQL', 'Git sebagai single source of truth', 'Deployment manual via kubectl', 'Image tag selalu latest'], 'correctOptionIndex': 1, 'explanation': 'GitOps menggunakan Git sebagai sumber kebenaran untuk desired state cluster.'},
            {'id': 'q-03-02', 'order': 2, 'prompt': 'Apa fungsi ApplicationSet?', 'options': ['Mengelola secret', 'Menghasilkan banyak Application dari generator', 'Mengganti kube-apiserver', 'Membangun image'], 'correctOptionIndex': 1, 'explanation': 'ApplicationSet menghasilkan banyak ArgoCD Application dari generator seperti list, cluster, atau git.'},
            {'id': 'q-03-03', 'order': 3, 'prompt': 'Solusi mana yang aman untuk menyimpan secret di Git?', 'options': ['Sealed Secrets', 'Secret plaintext', 'ConfigMap tanpa encoding', 'Helm values terbuka'], 'correctOptionIndex': 0, 'explanation': 'Sealed Secrets mengenkripsi Kubernetes Secret sehingga aman untuk disimpan di Git.'},
            {'id': 'q-03-04', 'order': 4, 'prompt': 'Progressive delivery bertujuan?', 'options': ['Deploy sekaligus ke semua pod', 'Mengurangi risiko dengan rollout bertahap', 'Menghapus rollback', 'Menonaktifkan monitoring'], 'correctOptionIndex': 1, 'explanation': 'Progressive delivery seperti canary mengurangi risiko dengan melepas perubahan secara bertahap.'},
            {'id': 'q-03-05', 'order': 5, 'prompt': 'Multi-cluster GitOps memerlukan?', 'options': ['ArgoCD di setiap cluster atau management cluster', 'Tidak perlu kubeconfig', 'Hanya satu node', 'Database bersama'], 'correctOptionIndex': 0, 'explanation': 'Multi-cluster GitOps membutuhkan ArgoCD yang dapat mengakses kubeconfig setiap target cluster.'},
            {'id': 'q-03-06', 'order': 6, 'prompt': 'Drift terjadi ketika?', 'options': ['Cluster state berbeda dari Git', 'Git dan cluster identik', 'Tidak ada perubahan', 'Image belum di-build'], 'correctOptionIndex': 0, 'explanation': 'Drift adalah perbedaan antara state cluster dan state yang didefinisikan di Git.'},
            {'id': 'q-03-07', 'order': 7, 'prompt': 'OPA/Gatekeeper digunakan untuk?', 'options': ['Menyimpan log', 'Policy enforcement', 'Build container', 'Scheduling pod'], 'correctOptionIndex': 1, 'explanation': 'OPA/Gatekeeper menegakkan kebijakan terhadap manifest sebelum diterapkan ke cluster.'},
            {'id': 'q-03-08', 'order': 8, 'prompt': 'Disaster recovery GitOps mengandalkan?', 'options': ['Backup seluruh etcd saja', 'Repository Git sebagai desired state', 'Snapshot VM manual', 'Secret di clipboard'], 'correctOptionIndex': 1, 'explanation': 'Karena seluruh desired state didokumentasikan di Git, recovery dapat dilakukan dengan mengarahkan cluster baru ke repository.'},
        ],
    },
    'lesson': {
        'id': 'lesson-ch-03-gitops-lanjutan',
        'estimatedMinutes': 50,
        'sections': [
            {
                'id': 'sec-03-basic',
                'type': 'markdown',
                'level': 'basic',
                'title': 'Git sebagai Single Source of Truth',
                'content': '## GitOps Workflow\nDalam GitOps, setiap perubahan infrastruktur diajukan melalui pull request ke repository Git. Tool seperti ArgoCD atau Flux terus menyinkronkan state cluster dengan state Git.\n\n## Sinkronisasi dan Drift\n- **Sync**: menerapkan manifest Git ke cluster.\n- **Drift**: perbedaan antara cluster dan Git. ArgoCD mendeteksi drift dan dapat auto-sync.\n- **Sync waves**: mengatur urutan deployment antar resource.'
            },
            {
                'id': 'sec-03-js',
                'type': 'code-example',
                'codeExample': {
                    'id': 'code-03-js',
                    'filename': 'gitops-drift.js',
                    'language': 'javascript',
                    'title': 'JavaScript: Deteksi Drift Sederhana',
                    'code': "const gitState = { replicas: 3, image: 'app:v2' }\nconst clusterState = { replicas: 3, image: 'app:v1' }\n\nfunction detectDrift(git, cluster) {\n  const diffs = []\n  for (const key of Object.keys(git)) {\n    if (git[key] !== cluster[key]) {\n      diffs.push(`${key}: ${cluster[key]} -> ${git[key]}`)\n    }\n  }\n  return diffs\n}\n\nconst drift = detectDrift(gitState, clusterState)\nconsole.log(drift.length ? 'Drift detected:' : 'In sync')\ndrift.forEach(d => console.log(' -', d))",
                    'explanation': 'Deteksi drift sederhana untuk memahami mengapa GitOps tool perlu melakukan sync.'
                }
            },
            {
                'id': 'sec-03-intermediate',
                'type': 'markdown',
                'level': 'intermediate',
                'title': 'ApplicationSet, Secret, dan Progressive Delivery',
                'content': '## ApplicationSet\nApplicationSet menghasilkan satu atau banyak ArgoCD Application dari generator seperti List, Cluster, Git, atau Matrix. Berguna untuk multi-tenant dan multi-cluster.\n\n## Secret di Git\nSecret tidak boleh disimpan plaintext. Solusi:\n- **Sealed Secrets**: mengenkripsi Secret menjadi SealedSecret yang aman untuk Git.\n- **SOPS**: mengenkripsi file YAML/JSON dengan KMS/PGP.\n- **External Secrets Operator**: mengambil secret dari Vault atau cloud secret manager.\n\n## Progressive Delivery\nArgo Rollouts menyediakan BlueGreen, Canary, dan AnalysisRun. Deployment bergradasi sambil memantau metrics; rollback otomatis jika gagal.'
            },
            {
                'id': 'sec-03-ts',
                'type': 'code-example',
                'codeExample': {
                    'id': 'code-03-ts',
                    'filename': 'applicationset.ts',
                    'language': 'typescript',
                    'title': 'TypeScript: Model ApplicationSet',
                    'code': "interface ApplicationSet {\n  name: string\n  generators: { list: { elements: { cluster: string; url: string }[] } }[]\n  template: {\n    metadata: { name: string }\n    spec: {\n      project: string\n      source: { repoURL: string; path: string; targetRevision: string }\n      destination: { server: string; namespace: string }\n    }\n  }\n}\n\nconst multiCluster: ApplicationSet = {\n  name: 'guestbook',\n  generators: [{\n    list: {\n      elements: [\n        { cluster: 'prod-us', url: 'https://prod-us.k8s.local' },\n        { cluster: 'prod-eu', url: 'https://prod-eu.k8s.local' },\n      ],\n    },\n  }],\n  template: {\n    metadata: { name: '{{cluster}}-guestbook' },\n    spec: {\n      project: 'default',\n      source: { repoURL: 'https://github.com/org/apps.git', path: 'guestbook', targetRevision: 'HEAD' },\n      destination: { server: '{{url}}', namespace: 'guestbook' },\n    },\n  },\n}\nconsole.log(multiCluster.template.metadata.name)",
                    'explanation': 'Model ApplicationSet dengan generator list untuk deploy ke beberapa cluster.'
                }
            },
            {
                'id': 'sec-03-advanced',
                'type': 'markdown',
                'level': 'advanced',
                'title': 'Multi-Cluster, Disaster Recovery, dan Policy Enforcement',
                'content': '## Multi-Cluster GitOps\n- Management cluster menjalankan ArgoCD dan mengelola remote clusters.\n- Cluster secrets menyimpan kubeconfig setiap target cluster.\n- ApplicationSet memudahkan propagasi aplikasi ke banyak cluster.\n\n## Disaster Recovery\nKarena state cluster didokumentasikan di Git, pemulihan cluster baru dapat dilakukan dengan menginstal GitOps tool dan menunjuk ke repository. RTO/RPO menjadi lebih dapat diprediksi.\n\n## Policy Enforcement\nIntegrasikan OPA/Gatekeeper atau Kyverno untuk memvalidasi manifest sebelum deployment. Kebijakan dapat melarang image tag `:latest`, memaksa label, atau membatasi resource limits.'
            },
            {
                'id': 'sec-03-go',
                'type': 'code-example',
                'codeExample': {
                    'id': 'code-03-go',
                    'filename': 'manifest-generator.go',
                    'language': 'go',
                    'title': 'Go: Generator Manifest Kubernetes',
                    'code': "package main\n\nimport (\n\t\"fmt\"\n)\n\ntype Manifest struct {\n\tAPIVersion string\n\tKind       string\n\tMetadata   map[string]string\n\tSpec       map[string]interface{}\n}\n\nfunc (m Manifest) String() string {\n\treturn fmt.Sprintf(\"apiVersion: %s\\nkind: %s\\nmetadata:\\n  name: %s\", m.APIVersion, m.Kind, m.Metadata[\"name\"])\n}\n\nfunc main() {\n\tdeploy := Manifest{\n\t\tAPIVersion: \"apps/v1\",\n\t\tKind:       \"Deployment\",\n\t\tMetadata:   map[string]string{\"name\": \"api\"},\n\t\tSpec: map[string]interface{}{\n\t\t\t\"replicas\": 3,\n\t\t},\n\t}\n\tfmt.Println(deploy)\n}",
                    'explanation': 'Generator manifest ini meniru proses template yang menghasilkan YAML untuk GitOps repository.'
                }
            },
            {
                'id': 'sec-03-callout',
                'type': 'callout',
                'calloutType': 'info',
                'content': '**Kesimpulan:** Gunakan branch protection, required review, dan CI untuk validasi manifest. Jangan menyimpan secret plaintext di Git meskipun repository private.'
            },
        ],
    },
}
chapters.append(ch3)

# ---------- Chapter 4 ----------
ch4 = {
    'slug': 'ch-04-sre-practices',
    'title': 'SRE Practices',
    'summary': 'Menerapkan SLO, SLI, SLA, error budget, toil reduction, dan kebijakan error budget untuk sistem yang andal.',
    'estimatedMinutes': 45,
    'learningObjectives': [
        'Membedakan SLI, SLO, SLA, dan error budget.',
        'Menghitung error budget dan burn rate.',
        'Mengidentifikasi toil dan strategi reduksinya.',
        'Merancang error budget policy.',
        'Menyusun reliability roadmap.',
    ],
    'summaryPoints': [
        'SLI mengukur performa service; SLO adalah target SLI; SLA adalah komitmen bisnis.',
        'Error budget = 1 - SLO dalam periode waktu tertentu.',
        'Toil adalah pekerjaan manual, berulang, dan otomatisabel yang harus dikurangi.',
        'Error budget policy menentukan aksi saat budget habis.',
        'Reliability roadmap memprioritaskan investasi berdasarkan risiko.',
    ],
    'references': [
        {'id': 'ref-04-01', 'title': 'Google SRE Book', 'url': 'https://sre.google/sre-book/table-of-contents/', 'description': 'Buku referensi utama tentang Site Reliability Engineering.', 'type': 'book'},
        {'id': 'ref-04-02', 'title': 'Google SRE Workbook', 'url': 'https://sre.google/workbook/table-of-contents/', 'description': 'Buku praktis implementasi SLO, error budget, dan alerting.', 'type': 'book'},
        {'id': 'ref-04-03', 'title': 'DORA — Metrics', 'url': 'https://dora.dev/', 'description': 'Dokumentasi metrik DevOps Research and Assessment.', 'type': 'documentation'},
        {'id': 'ref-04-04', 'title': 'Service Level Objectives', 'url': 'https://sre.google/workbook/implementing-slos/', 'description': 'Panduan implementasi SLO dari Google SRE Workbook.', 'type': 'documentation'},
        {'id': 'ref-04-05', 'title': 'Atlassian — SRE', 'url': 'https://www.atlassian.com/incident-management/devops/sre', 'description': 'Artikel perbandingan SRE dan DevOps serta praktiknya.', 'type': 'article'},
    ],
    'quiz': {
        'id': 'quiz-ch-04-sre-practices',
        'title': 'Quiz: SRE Practices',
        'passingScore': 8,
        'questions': [
            {'id': 'q-04-01', 'order': 1, 'prompt': 'Apa yang diukur oleh SLI?', 'options': ['Komitmen bisnis', 'Performa service seperti availability/latency', 'Jumlah karyawan', 'Biaya cloud'], 'correctOptionIndex': 1, 'explanation': 'SLI adalah metrik kuantitatif performa service seperti availability, latency, atau error rate.'},
            {'id': 'q-04-02', 'order': 2, 'prompt': 'Jika SLO availability 99.9% per bulan, error budget adalah?', 'options': ['0.01%', '0.1%', '1%', '10%'], 'correctOptionIndex': 1, 'explanation': 'Error budget = 100% - 99.9% = 0.1% dari total request dalam periode tersebut.'},
            {'id': 'q-04-03', 'order': 3, 'prompt': 'Toil adalah?', 'options': ['Pekerjaan kreatif', 'Pekerjaan manual berulang yang dapat diotomatisasi', 'Incident handling', 'Code review'], 'correctOptionIndex': 1, 'explanation': 'Toil adalah pekerjaan manual yang berulang dan dapat diotomatisasi.'},
            {'id': 'q-04-04', 'order': 4, 'prompt': 'Error budget policy menentukan?', 'options': ['Warna dashboard', 'Aksi saat budget habis', 'Jumlah server', 'Nama service'], 'correctOptionIndex': 1, 'explanation': 'Error budget policy menjelaskan apa yang harus dilakukan saat budget habis, seperti freeze release.'},
            {'id': 'q-04-05', 'order': 5, 'prompt': 'Burn rate mengukur?', 'options': ['Kecepatan penggunaan error budget', 'Kapasitas CPU', 'Biaya deployment', 'Jumlah commit'], 'correctOptionIndex': 0, 'explanation': 'Burn rate mengukur seberapa cepat error budget terpakai relatif terhadap periode SLO.'},
            {'id': 'q-04-06', 'order': 6, 'prompt': 'SLA berbeda dari SLO karena?', 'options': ['SLA adalah komitmen bisnis dengan konsekuensi', 'SLA hanya untuk developer', 'SLA tidak terukur', 'SLA selalu lebih tinggi'], 'correctOptionIndex': 0, 'explanation': 'SLA adalah perjanjian dengan pelanggan yang biasanya memiliki konsekuensi finansial jika dilanggar.'},
            {'id': 'q-04-07', 'order': 7, 'prompt': 'Tujuan toil reduction?', 'options': ['Menambah pekerjaan manual', 'Membebaskan waktu untuk engineering', 'Menghapus otomasi', 'Meningkatkan handovers'], 'correctOptionIndex': 1, 'explanation': 'Mengurangi toil membebaskan waktu tim untuk pekerjaan engineering yang bernilai lebih tinggi.'},
            {'id': 'q-04-08', 'order': 8, 'prompt': 'Capacity planning penting untuk?', 'options': ['Mencegah kekurangan resource yang merusak SLO', 'Menghapus monitoring', 'Mengurangi jumlah test', 'Mempercepat commit'], 'correctOptionIndex': 0, 'explanation': 'Capacity planning memastikan sistem memiliki resource yang cukup untuk memenuhi SLO.'},
        ],
    },
    'lesson': {
        'id': 'lesson-ch-04-sre-practices',
        'estimatedMinutes': 45,
        'sections': [
            {
                'id': 'sec-04-basic',
                'type': 'markdown',
                'level': 'basic',
                'title': 'SLI, SLO, SLA, dan Error Budget',
                'content': '## Definisi\n- **SLI (Service Level Indicator)**: metrik seperti availability, latency, throughput.\n- **SLO (Service Level Objective)**: target SLI, misalnya availability 99.9%.\n- **SLA (Service Level Agreement)**: komitmen ke pelanggan dengan konsekuensi jika tidak terpenuhi.\n\n## Error Budget\nJika SLO availability 99.9% per bulan, error budget Anda adalah 0.1% dari total request. Budget ini memungkinkan tim melakukan release dan eksperimen tanpa langsung melanggar SLO.'
            },
            {
                'id': 'sec-04-js',
                'type': 'code-example',
                'codeExample': {
                    'id': 'code-04-js',
                    'filename': 'error-budget.js',
                    'language': 'javascript',
                    'title': 'JavaScript: Kalkulator Error Budget',
                    'code': 'function calculateErrorBudget(sloPercent, totalRequests) {\n  const errorBudget = (1 - sloPercent / 100) * totalRequests\n  const used = 12\n  return { total: errorBudget, remaining: errorBudget - used, used }\n}\n\nconst budget = calculateErrorBudget(99.9, 1_000_000)\nconsole.log(`Total budget: ${budget.total.toFixed(0)} errors`)\nconsole.log(`Remaining: ${budget.remaining.toFixed(0)}`)',
                    'explanation': 'Kalkulasi error budget dari SLO dan jumlah request.'
                }
            },
            {
                'id': 'sec-04-intermediate',
                'type': 'markdown',
                'level': 'intermediate',
                'title': 'Toil Reduction, Monitoring for SLOs, dan Error Budget Policy',
                'content': '## Toil Reduction\nToil adalah pekerjaan manual yang berulang dan tidak memerlukan kreativitas. Contoh: reset password manual, deploy via klik UI, membersihkan log. SRE mengurangi toil melalui otomasi, self-service, dan tooling.\n\n## Monitoring for SLOs\nDashboard SLO harus menunjukkan burn rate dan remaining budget. Alert sebaiknya berbasis SLO, bukan hanya threshold sederhana.\n\n## Error Budget Policy\nKebijakan yang menjelaskan:\n- Siapa yang bertanggung jawab.\n- Apa yang terjadi saat budget terbakar cepat.\n- Proses eskalasi.'
            },
            {
                'id': 'sec-04-ts',
                'type': 'code-example',
                'codeExample': {
                    'id': 'code-04-ts',
                    'filename': 'burn-rate.ts',
                    'language': 'typescript',
                    'title': 'TypeScript: Burn Rate Alert',
                    'code': "type BurnRateAlert = {\n  severity: 'page' | 'ticket'\n  multiplier: number\n  window: string\n}\n\nconst alerts: BurnRateAlert[] = [\n  { severity: 'page', multiplier: 14.4, window: '1h' },\n  { severity: 'page', multiplier: 6, window: '6h' },\n  { severity: 'ticket', multiplier: 2, window: '3d' },\n]\n\nfunction burnRate(budgetUsed: number, elapsedHours: number, periodHours: number): number {\n  return (budgetUsed / elapsedHours) * periodHours\n}\n\nconsole.log(burnRate(0.02, 1, 720))",
                    'explanation': 'Burn rate mengukur seberapa cepat error budget terpakai relatif terhadap periode SLO.'
                }
            },
            {
                'id': 'sec-04-advanced',
                'type': 'markdown',
                'level': 'advanced',
                'title': 'Error Budget Policy, Capacity Planning, dan Reliability Roadmap',
                'content': '## Error Budget Policy Lanjutan\nKebijakan dapat memasukkan multi-tier SLO, graceful degradation, dan freeze release saat budget habis. Tujuannya bukan menghindari kegagalan, melainkan mengelola risiko kegagalan secara eksplisit.\n\n## Capacity Planning\nProyeksikan pertumbuhan traffic, resource usage, dan bottleneck. Gunakan load test dan historical data. Capacity planning terkait dengan reliability: kekurangan kapasitas menyebabkan SLO violation.\n\n## Reliability Roadmap\nPrioritaskan pekerjaan berdasarkan risiko kegagalan, frekuensi toil, ketergantungan antar sistem, dan hasil postmortem.'
            },
            {
                'id': 'sec-04-go',
                'type': 'code-example',
                'codeExample': {
                    'id': 'code-04-go',
                    'filename': 'availability.go',
                    'language': 'go',
                    'title': 'Go: Perhitungan Availability',
                    'code': "package main\n\nimport (\n\t\"fmt\"\n\t\"time\"\n)\n\nfunc availability(uptime, total time.Duration) float64 {\n\treturn 100.0 * float64(uptime) / float64(total)\n}\n\nfunc main() {\n\tmonth := 30 * 24 * time.Hour\n\tdowntime := 43 * time.Minute\n\tuptime := month - downtime\n\tfmt.Printf(\"Availability: %.3f%%\\n\", availability(uptime, month))\n}",
                    'explanation': 'Menghitung availability bulanan dari total uptime.'
                }
            },
            {
                'id': 'sec-04-callout',
                'type': 'callout',
                'calloutType': 'info',
                'content': '**Kesimpulan:** SLO harus realistis dan disepakati bersama tim produk. Error budget adalah alat untuk menyeimbangkan velocity dan reliability.'
            },
        ],
    },
}
chapters.append(ch4)

from _devops_advanced_ch5_8 import get_chapters_5_8
chapters.extend(get_chapters_5_8())


def slug_to_export_name(slug: str) -> str:
    m = re.match(r'ch-(\d+)-(.+)', slug)
    if not m:
        raise ValueError(f'Invalid chapter slug: {slug}')
    num, rest = m.group(1), m.group(2)
    camel = ''.join(part.capitalize() for part in rest.split('-'))
    return f'ch{num}{camel}'


def generate():
    chapter_exports = []

    for i, ch in enumerate(chapters, 1):
        slug = ch['slug']
        export_name = slug_to_export_name(slug)
        chapter_dir = ROOT / 'chapters' / slug
        chapter_dir.mkdir(parents=True, exist_ok=True)

        refs_var = f'{export_name}References'
        quiz_var = f'{export_name}Quiz'
        lesson_var = f'{export_name}Lesson'

        write_ts(
            chapter_dir / 'references.ts',
            "import type { Reference } from '@/content/types'",
            refs_var,
            'Reference[]',
            ch['references'],
        )
        write_ts(
            chapter_dir / 'quiz.ts',
            "import type { Quiz } from '@/content/types'",
            quiz_var,
            'Quiz',
            ch['quiz'],
        )
        write_ts(
            chapter_dir / 'lesson.ts',
            "import type { Lesson } from '@/content/types'",
            lesson_var,
            'Lesson',
            ch['lesson'],
        )

        objectives = json.dumps(ch['learningObjectives'], indent=4, ensure_ascii=False)
        objectives_lines = objectives.replace('\n', '\n  ')
        summary_points = json.dumps(ch['summaryPoints'], indent=4, ensure_ascii=False)
        summary_points_lines = summary_points.replace('\n', '\n  ')

        index_content = f"""import type {{ Chapter }} from '@/content/types'
import {{ {lesson_var} }} from './lesson'
import {{ {quiz_var} }} from './quiz'
import {{ {refs_var} }} from './references'

export const {export_name}: Chapter = {{
  id: {json.dumps(slug)},
  slug: {json.dumps(slug)},
  order: {i},
  title: {json.dumps(ch['title'])},
  summary: {json.dumps(ch['summary'])},
  estimatedMinutes: {ch['estimatedMinutes']},
  learningObjectives: {objectives_lines},
  summaryPoints: {summary_points_lines},
  references: {refs_var},
  lesson: {lesson_var},
  quiz: {quiz_var},
}}
"""
        (chapter_dir / 'index.ts').write_text(index_content, encoding='utf-8')
        chapter_exports.append(export_name)

    lines = []
    for name, ch in zip(chapter_exports, chapters):
        lines.append(f"export {{ {name} }} from './{ch['slug']}'")
    (ROOT / 'chapters' / 'index.ts').write_text('\n'.join(lines) + '\n', encoding='utf-8')

    meta_content = """import type { CourseMeta } from '@/content/types'

export const devopsAdvancedMeta: CourseMeta = {
  id: 'devops-advanced',
  slug: 'devops-advanced',
  title: 'DevOps Advanced',
  description:
    'Menguasai Kubernetes controllers dan operators, service mesh, GitOps lanjutan, SRE practices, advanced monitoring, cloud native security, platform engineering, dan capstone DevOps project untuk sistem production-grade.',
  estimatedHours: 32,
  tags: ['devops', 'kubernetes', 'gitops', 'sre', 'security', 'platform-engineering', 'indonesian'],
  createdAt: '2026-06-28T00:00:00.000Z',
  chaptersCount: 8,
  firstChapterSlug: 'ch-01-kubernetes-controllers-operators-api-server',
}
"""
    (ROOT / 'meta.ts').write_text(meta_content, encoding='utf-8')

    imports = ',\n  '.join(chapter_exports)
    course_index = f"""import type {{ Course }} from '@/content/types'
import {{ devopsAdvancedMeta }} from './meta'
import {{
  {imports},
}} from './chapters'

export const devopsAdvanced: Course = {{
  ...devopsAdvancedMeta,
  chapters: [
    {',\n    '.join(chapter_exports)},
  ],
}}
"""
    (ROOT / 'index.ts').write_text(course_index, encoding='utf-8')
    print(f'Generated devops-advanced course with {len(chapters)} chapters at {ROOT}')


if __name__ == '__main__':
    generate()
