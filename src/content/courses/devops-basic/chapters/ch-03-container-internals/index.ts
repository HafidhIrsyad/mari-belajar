import type { Chapter } from '@/content/types'
import { ch03Lesson } from './lesson'
import { ch03Quiz } from './quiz'
import { ch03References } from './references'

export const ch03ContainerInternals: Chapter = {
  id: 'ch-03-container-internals',
  slug: 'ch-03-container-internals',
  order: 3,
  title: 'Container Internals: Docker, Namespaces, cgroups & OverlayFS',
  summary:
    'Memahami internalitas container dari perbedaan dengan VM, image/layer, hingga Linux namespaces, cgroups, OverlayFS, dan ekosistem runtime seperti runc dan containerd.',
  estimatedMinutes: 50,
  learningObjectives: [
    'Membedakan container dengan virtual machine dari sudut pandang isolasi dan resource.',
    'Menjelaskan image, layer, dan cara container dibuat dari image.',
    'Memahami peran Linux namespaces dalam isolasi process, network, filesystem, dan user.',
    'Menjelaskan cgroups sebagai mekanisme pembatasan resource.',
    'Menguraikan cara OverlayFS menggabungkan layer read-only dan writable.',
  ],
  summaryPoints: [
    'Container berbagi kernel host dan menggunakan isolasi OS-level, berbeda dengan VM yang menyimulasikan hardware.',
    'Image container tersusun dari layer-layer read-only yang di-cache secara content-addressable.',
    'Linux namespaces mengisolasi pandangan process terhadap sistem.',
    'cgroups membatasi dan mengukur penggunaan CPU, memory, disk I/O, dan network.',
    'OverlayFS memungkinkan container layer writable di atas image layer read-only secara efisien.',
  ],
  references: ch03References,
  lesson: ch03Lesson,
  quiz: ch03Quiz,
}
