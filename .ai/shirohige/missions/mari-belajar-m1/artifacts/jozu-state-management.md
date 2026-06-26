# Jozu — State Management Design

## Mission Context

Mari Belajar is a static SPA. All learning content is imported from TypeScript modules. The only mutable state is the learner's progress, persisted in `localStorage` and managed by Zustand.

---

## 1. State Shape

### 1.1. Progress Store

```ts
interface ProgressState {
  // --- Persisted slice ---
  progress: UserProgress;

  // --- Derived / runtime state (NOT persisted) ---
  activeQuiz: ActiveQuiz | null;

  // --- Actions ---
  hydrate: () => void;
  startQuiz: (chapterId: string) => void;
  selectAnswer: (questionIndex: number, optionIndex: number) => void;
  submitQuiz: () => SubmitQuizResult;
  resetQuiz: () => void;
  markChapterCompleted: (courseId: string, chapterId: string) => void;
}

interface ActiveQuiz {
  courseId: string;
  chapterId: string;
  answers: (number | null)[]; // selected option index per question, null = unanswered
  status: 'idle' | 'in-progress' | 'submitted';
  submittedAt: string | null;
}

interface SubmitQuizResult {
  score: number;
  totalQuestions: number;
  passed: boolean;
  nextChapterUnlocked: boolean;
}
```

### 1.2. Initial Progress

```ts
const initialProgress: UserProgress = {
  version: 1,
  courseProgress: [],
  lastUpdatedAt: new Date().toISOString(),
};
```

- `courseProgress` is empty on first visit; gating logic treats missing records as "no chapters completed".
- Chapter 1 is still considered unlocked via the derived `isChapterUnlocked` selector.

---

## 2. Persistence Middleware

Use Zustand's `persist` middleware with a custom `localStorage` storage adapter.

```ts
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

const useProgressStore = create<ProgressState>()(
  persist(
    (set, get) => ({
      progress: initialProgress,
      activeQuiz: null,
      // actions defined below
    }),
    {
      name: 'mari-belajar-progress',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ progress: state.progress }),
      onRehydrateStorage: () => (state, error) => {
        if (error || !state) {
          // Log to console; do not throw during app bootstrap.
          // Fall back to initialProgress in the store initializer.
        }
      },
      version: 1,
      migrate: (persistedState, version) => {
        if (version < 1) {
          return { progress: initialProgress };
        }
        return persistedState as { progress: UserProgress };
      },
    }
  )
);
```

### 2.1. Storage Adapter Requirements

- Wrap `localStorage.getItem` / `setItem` in `try/catch`.
- On `QuotaExceededError`, silently keep state in memory only.
- On parse error, reset to `initialProgress`.
- Key: `mari-belajar-progress`.

### 2.2. Hydration Pattern

- Zustand `persist` rehydrates automatically after mount.
- Components that depend on persisted data should handle the initial `undefined` / default state gracefully (e.g., show skeleton or assume no progress).
- `hydrate()` action is exposed for explicit rehydration after import or migration.

---

## 3. Actions Specification

### 3.1. `hydrate()`

```ts
hydrate: () => {
  // No-op placeholder if using Zustand persist auto-rehydration.
  // Can be used to force a storage re-read in tests.
}
```

### 3.2. `startQuiz(courseId, chapterId)`

```ts
startQuiz: (courseId: string, chapterId: string) => {
  const chapter = getChapterById(courseId, chapterId);
  if (!chapter) return;

  set({
    activeQuiz: {
      courseId,
      chapterId,
      answers: new Array(chapter.quiz.questions.length).fill(null),
      status: 'in-progress',
      submittedAt: null,
    },
  });
}
```

- Resets any previous active quiz for the same or other chapter.
- Initializes `answers` to `null` for each question.

### 3.3. `selectAnswer(questionIndex, optionIndex)`

```ts
selectAnswer: (questionIndex: number, optionIndex: number) => {
  const { activeQuiz } = get();
  if (!activeQuiz || activeQuiz.status !== 'in-progress') return;

  const nextAnswers = [...activeQuiz.answers];
  nextAnswers[questionIndex] = optionIndex;

  set({ activeQuiz: { ...activeQuiz, answers: nextAnswers } });
}
```

### 3.4. `submitQuiz()`

```ts
submitQuiz: () => {
  const { activeQuiz, progress } = get();
  if (!activeQuiz || activeQuiz.status !== 'in-progress') {
    return { score: 0, totalQuestions: 0, passed: false, nextChapterUnlocked: false };
  }

  const chapter = getChapterById(activeQuiz.courseId, activeQuiz.chapterId);
  if (!chapter) {
    return { score: 0, totalQuestions: 0, passed: false, nextChapterUnlocked: false };
  }

  const answers = activeQuiz.answers.map((a) => a ?? -1);
  const { score, passed } = evaluateQuiz(chapter.quiz, answers);
  const totalQuestions = chapter.quiz.questions.length;

  const nextProgress = produce(progress, (draft) => {
    let courseRecord = draft.courseProgress.find(
      (cp) => cp.courseId === activeQuiz.courseId
    );
    if (!courseRecord) {
      courseRecord = {
        courseId: activeQuiz.courseId,
        completedChapterIds: [],
        quizAttempts: [],
      };
      draft.courseProgress.push(courseRecord);
    }

    courseRecord.quizAttempts.push({
      chapterId: activeQuiz.chapterId,
      submittedAt: new Date().toISOString(),
      answers,
      score,
      totalQuestions,
      passed,
    });

    if (passed && !courseRecord.completedChapterIds.includes(activeQuiz.chapterId)) {
      courseRecord.completedChapterIds.push(activeQuiz.chapterId);
    }

    draft.lastUpdatedAt = new Date().toISOString();
  });

  const nextChapter = getNextChapter(activeQuiz.courseId, activeQuiz.chapterId);
  const nextChapterUnlocked = passed && !!nextChapter;

  set({
    progress: nextProgress,
    activeQuiz: {
      ...activeQuiz,
      status: 'submitted',
      submittedAt: new Date().toISOString(),
    },
  });

  return { score, totalQuestions, passed, nextChapterUnlocked };
}
```

### 3.5. `resetQuiz()`

```ts
resetQuiz: () => {
  set({ activeQuiz: null });
}
```

### 3.6. `markChapterCompleted(courseId, chapterId)` (Escape Hatch)

```ts
markChapterCompleted: (courseId: string, chapterId: string) => {
  const nextProgress = produce(get().progress, (draft) => {
    let record = draft.courseProgress.find((cp) => cp.courseId === courseId);
    if (!record) {
      record = { courseId, completedChapterIds: [], quizAttempts: [] };
      draft.courseProgress.push(record);
    }
    if (!record.completedChapterIds.includes(chapterId)) {
      record.completedChapterIds.push(chapterId);
    }
    draft.lastUpdatedAt = new Date().toISOString();
  });
  set({ progress: nextProgress });
}
```

> Milestone 1 does not expose a UI button for this action. It exists for tests and future admin/debug tooling.

---

## 4. Derived Selectors (Pure Functions)

These live in `src/lib/progress.ts` and are used by components and store actions.

### 4.1. `getCourseProgress(progress, courseId)`

```ts
function getCourseProgress(progress: UserProgress, courseId: string): CourseProgress | undefined
```

### 4.2. `isChapterUnlocked(course, chapter, progress)`

```ts
function isChapterUnlocked(
  course: Course,
  chapter: Chapter,
  progress: UserProgress
): boolean {
  if (chapter.order === 1) return true;

  const previousChapter = course.chapters.find((c) => c.order === chapter.order - 1);
  if (!previousChapter) return false;

  const courseRecord = getCourseProgress(progress, course.id);
  if (!courseRecord) return false;

  return courseRecord.completedChapterIds.includes(previousChapter.id);
}
```

### 4.3. `isChapterCompleted(courseId, chapterId, progress)`

```ts
function isChapterCompleted(
  courseId: string,
  chapterId: string,
  progress: UserProgress
): boolean {
  const record = getCourseProgress(progress, courseId);
  return record?.completedChapterIds.includes(chapterId) ?? false;
}
```

### 4.4. `evaluateQuiz(quiz, answers)`

```ts
function evaluateQuiz(quiz: Quiz, answers: number[]): { score: number; passed: boolean } {
  let score = 0;
  quiz.questions.forEach((question, index) => {
    if (answers[index] === question.correctOptionIndex) {
      score += 1;
    }
  });
  const passed = score === quiz.questions.length;
  return { score, passed };
}
```

### 4.5. `getNextChapter(course, currentChapterId)`

```ts
function getNextChapter(course: Course, currentChapterId: string): Chapter | undefined {
  const current = course.chapters.find((c) => c.id === currentChapterId);
  if (!current) return undefined;
  return course.chapters.find((c) => c.order === current.order + 1);
}
```

### 4.6. `courseCompletionPercentage(course, progress)`

```ts
function courseCompletionPercentage(course: Course, progress: UserProgress): number {
  const record = getCourseProgress(progress, course.id);
  const completed = record?.completedChapterIds.length ?? 0;
  return Math.round((completed / course.chapters.length) * 100);
}
```

---

## 5. Quiz Gating Logic

### 5.1. Unlock Rules

| Condition | Result |
|-----------|--------|
| `chapter.order === 1` | Unlocked |
| Previous chapter completed | Unlocked |
| Previous chapter not completed | Locked |

### 5.2. Completion Rules

| Condition | Result |
|-----------|--------|
| Quiz score === total questions | Chapter completed, next chapter unlocks |
| Quiz score < total questions | Chapter not completed, next chapter stays locked |

### 5.3. UI Implications

- Locked chapters are visible but navigation is disabled or shows a lock icon.
- The "Next Chapter" button on the lesson/quiz page is enabled only when the next chapter is unlocked.
- After a passing quiz, show immediate feedback and a CTA to the newly unlocked next chapter.
- After a failing quiz, show correct answers per question and allow retry.

---

## 6. Active Quiz Lifecycle

```
idle
 |
 v
startQuiz(courseId, chapterId)
 |
 v
in-progress  <---->  selectAnswer(questionIndex, optionIndex)
 |
 v
submitQuiz()
 |
 +---> passed === true  ---> chapter completed, progress persisted, next chapter unlocked
 |
 +---> passed === false ---> progress persisted, chapter remains locked, retry allowed
 |
 v
submitted
 |
 v
resetQuiz()  ---> idle
```

- The active quiz state is intentionally **not persisted** to localStorage. If the user refreshes mid-quiz, they restart the quiz from question 1.
- Quiz attempts and outcomes are persisted.

---

## 7. localStorage Schema

```json
{
  "state": {
    "progress": {
      "version": 1,
      "courseProgress": [
        {
          "courseId": "cs-fundamentals",
          "completedChapterIds": ["cara-kerja-komputer"],
          "quizAttempts": [
            {
              "chapterId": "cara-kerja-komputer",
              "submittedAt": "2026-06-26T14:12:00.000Z",
              "answers": [0, 2, 1, 0, 1, 2],
              "score": 6,
              "totalQuestions": 6,
              "passed": true
            }
          ]
        }
      ],
      "lastUpdatedAt": "2026-06-26T14:12:00.000Z"
    }
  },
  "version": 1
}
```

Zustand `persist` wraps the store state; the JSON above represents the persisted subset (`{ progress }`) plus the middleware's own `version` field.

---

## 8. Error & Edge Cases

| Scenario | Handling |
|----------|----------|
| localStorage unavailable (private mode, quota) | Keep progress in memory only; degrade gracefully. |
| Corrupt localStorage data | Reset to `initialProgress` and log warning. |
| Schema version mismatch | Run `migrate`; if unsupported, reset. |
| Quiz submitted with unanswered questions | Treat unanswered as `-1` (incorrect). Score normally. |
| Chapter missing from course data | Guard in selectors; return `false` for unlock/completed. |
| Duplicate completed chapter IDs | Use `Set`-like logic when adding to avoid duplicates. |
| User manually edits localStorage | Next load resets if JSON is invalid; undefined behavior if valid but inconsistent. |

---

## 9. Component Wiring Recommendations

- Use `useProgressStore.getState()` only inside event handlers / non-React helpers.
- Use the `useProgressStore((state) => state.progress)` selector in components to subscribe only to progress changes.
- Use `shallow` from zustand when selecting arrays to avoid unnecessary re-renders.
- Keep quiz UI state local to the quiz page; only call store actions for answer submission and persistence.

---

## 10. Implementation Checklist

- [ ] Zustand store created with `persist` middleware.
- [ ] `partialize` excludes `activeQuiz` from persistence.
- [ ] `migrate` resets to `initialProgress` on version mismatch.
- [ ] `evaluateQuiz` is a pure function with no store side effects.
- [ ] `isChapterUnlocked` derives state from content + progress, not from a stored `unlocked` flag.
- [ ] `submitQuiz` updates progress immutably (e.g., using Immer's `produce`).
- [ ] All timestamps stored as ISO strings.
