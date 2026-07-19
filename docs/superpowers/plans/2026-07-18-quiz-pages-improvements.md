# Quiz Pages Improvements Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use subagent-driven-development or executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Upgrade 4 student quiz pages (list, soal, review, sentence) with multi-soal flow, drag-reorder, bug fixes, empty states, keyboard shortcuts, and polish.

**Architecture:** All pages are client components under `src/app/m/kuis/`. Each page gets targeted improvements independently. No new pages, no structural changes to routing.

**Tech Stack:** Next.js 15 (App Router), React 19, Framer Motion 11, Tailwind CSS, Lucide React, @dnd-kit/core + @dnd-kit/sortable (for drag-reorder).

## Global Constraints

- No emoji in student page content — use Lucide icons instead (Award, TrendingUp, BookOpen, Sparkles, Dices, etc.)
- Use existing design tokens: `text-ink`, `text-ink-soft`, `bg-indigo`, `bg-paper`, `border-line`, `text-success`, `text-error`, `-vermillion`, `-gold`
- Use existing components: `Card`, `Badge`, `Button`, `KanjiText`, `RingProgress`, `ProgressBar`, `AnimatedPage`, `StudentShell`
- Follow existing animation patterns: `framer-motion` with `AnimatePresence`, `staggerContainer`, `staggerItem`
- All pages already use `StudentShell` with appropriate header (title/noHeader) — do NOT change header configuration

---

### Task 1: Fix Sentence Builder Bug (CRITICAL)

**Files:**
- Modify: `src/app/m/kuis/sentence/page.tsx`

**Interfaces:**
- Consumes: existing `POOL`, `answer`, `pool` state
- Produces: correct sentence validation

- [ ] **Step 1: Fix correct answer check**

Change the `correct` constant from checking only `"私は ご飯 を"` to the full correct sentence `"私は ご飯 を 食べます"`.

Also update the display of correct answer in the result section.

**Changes in `sentence/page.tsx`:**

Line 35: change `const correct = answer.join(" ") === "私は ご飯 を";`
To: `const correct = answer.join(" ") === "私は ご飯 を 食べます";`

Line 158: change the correct answer display from `"Jawaban: 私は ご飯 を 食べます"` — this text is already correct, just making sure it stays.

- [ ] **Step 2: Verify the fix**

Run the dev server, open `/m/kuis/sentence`, tap words in correct order `私は → ご飯 → を → 食べます`, submit. Should show "Benar!".

- [ ] **Step 3: Commit**

### Task 2: Multi-Soal Flow with Keyboard Shortcuts

**Files:**
- Modify: `src/app/m/kuis/soal/page.tsx`

**Interfaces:**
- Consumes: existing `StudentShell`, `KanjiText`, `Button`, `AnimatedPage`
- Produces: multi-question flow with keyboard (1-4) support, loading skeleton, auto-advance

- [ ] **Step 1: Refactor soal data into an array and add state management**

Replace the single `const soal` object with an array `const soalList` containing 5+ questions. Add `currentIndex` state, `isCorrect` state, and derived `currentSoal`.

```typescript
const soalList = [
  {
    id: 1,
    kanji: "食べる",
    furigana: "たべる",
    question: "Apa arti kata di atas?",
    options: [
      { id: "A", text: "Makan" },
      { id: "B", text: "Minum" },
      { id: "C", text: "Tidur" },
      { id: "D", text: "Berjalan" },
    ],
    correct: "A",
  },
  {
    id: 2,
    kanji: "飲む",
    furigana: "のむ",
    question: "Apa arti kata di atas?",
    options: [
      { id: "A", text: "Makan" },
      { id: "B", text: "Minum" },
      { id: "C", text: "Tidur" },
      { id: "D", text: "Berjalan" },
    ],
    correct: "B",
  },
  {
    id: 3,
    kanji: "学校",
    furigana: "がっこう",
    question: "Apa arti kata di atas?",
    options: [
      { id: "A", text: "Rumah" },
      { id: "B", text: "Toko" },
      { id: "C", text: "Sekolah" },
      { id: "D", text: "Kantor" },
    ],
    correct: "C",
  },
  {
    id: 4,
    kanji: "高い",
    furigana: "たかい",
    question: "Apa arti kata di atas?",
    options: [
      { id: "A", text: "Murah" },
      { id: "B", text: "Tinggi/Mahal" },
      { id: "C", text: "Cepat" },
      { id: "D", text: "Pendek" },
    ],
    correct: "B",
  },
  {
    id: 5,
    kanji: "猫",
    furigana: "ねこ",
    question: "Apa arti kata di atas?",
    options: [
      { id: "A", text: "Anjing" },
      { id: "B", text: "Burung" },
      { id: "C", text: "Ikan" },
      { id: "D", text: "Kucing" },
    ],
    correct: "D",
  },
];
```

Add states:
```typescript
const [currentIndex, setCurrentIndex] = useState(0);
const [picked, setPicked] = useState<string | null>(null);
const [answers, setAnswers] = useState<Record<number, string>>({});
const [showResult, setShowResult] = useState(false);
const [time, setTime] = useState(45);
const [timeoutTriggered, setTimeoutTriggered] = useState(false);
const [isTransitioning, setIsTransitioning] = useState(false);
```

Derived values:
```typescript
const currentSoal = soalList[currentIndex];
const answered = picked !== null || timeoutTriggered;
const isCorrect = picked === currentSoal.correct;
const total = soalList.length;
const progress = ((currentIndex + 1) / total) * 100;
```

- [ ] **Step 2: Add keyboard shortcut handler**

Add `useEffect` for keyboard events:

```typescript
useEffect(() => {
  if (answered || isTransitioning) return;
  function handleKey(e: KeyboardEvent) {
    const keyMap: Record<string, string> = { "1": "A", "2": "B", "3": "C", "4": "D" };
    const optionId = keyMap[e.key];
    if (optionId && currentSoal.options.find((o) => o.id === optionId)) {
      setPicked(optionId);
    }
  }
  window.addEventListener("keydown", handleKey);
  return () => window.removeEventListener("keydown", handleKey);
}, [answered, isTransitioning, currentSoal]);
```

- [ ] **Step 3: Update timer to reset per question**

Modify the existing timer `useEffect` to depend on `currentIndex` so it resets:

```typescript
useEffect(() => {
  setTime(45);
  setTimeoutTriggered(false);
}, [currentIndex]);
```

The countdown effect already depends on `answered`, just make sure it runs fresh per question.

- [ ] **Step 4: Add "Next Question" / "Finish" logic**

After answering, instead of "Lanjut ke Review", show:
- If not last question: "Soal Selanjutnya" → increment `currentIndex`, reset state
- If last question: "Lihat Review" → `router.push("/m/kuis/review")`

```typescript
function handleNext() {
  // Save answer
  setAnswers((prev) => ({ ...prev, [currentSoal.id]: picked || "" }));
  
  if (currentIndex < total - 1) {
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentIndex((i) => i + 1);
      setPicked(null);
      setTimeoutTriggered(false);
      setShowResult(false);
      setIsTransitioning(false);
    }, 300);
  } else {
    router.push("/m/kuis/review");
  }
}
```

- [ ] **Step 5: Update question rendering with AnimatePresence for question transitions**

Wrap the question + options in `<AnimatePresence mode="wait">` with `key={currentSoal.id}`:

```tsx
<AnimatePresence mode="wait">
  <motion.div
    key={currentSoal.id}
    initial={{ opacity: 0, x: 40 }}
    animate={{ opacity: 1, x: 0 }}
    exit={{ opacity: 0, x: -40 }}
    transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
  >
    {/* Progress bar */}
    {/* Question */}
    {/* Options */}
  </motion.div>
</AnimatePresence>
```

- [ ] **Step 6: Wire progress bar to real progress**

Change progress bar width from hardcoded `"40%"` to `{progress + "%"}` and counter from `"4/10"` to `` `${currentIndex + 1}/${total}` ``.

- [ ] **Step 7: Verify**

Run dev server, navigate through multiple questions using click and keyboard (1-4). Verify timer resets, progress bar moves, last question navigates to review.

- [ ] **Step 8: Commit**

### Task 3: Sentence Builder Drag-to-Reorder + Partial Feedback

**Files:**
- Modify: `src/app/m/kuis/sentence/page.tsx` (already fixed in Task 1)

**Dependencies:**
- Install: `@dnd-kit/core` and `@dnd-kit/sortable` and `@dnd-kit/utilities`

- [ ] **Step 1: Install @dnd-kit packages**

```bash
npm install @dnd-kit/core @dnd-kit/sortable @dnd-kit/utilities
```

- [ ] **Step 2: Add DnD context to answer area**

Import DnD kit and wrap the answer area:

```typescript
import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from "@dnd-kit/core";
import {
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
  horizontalListSortingStrategy,
  arrayMove,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
```

- [ ] **Step 3: Create SortableChip component**

```typescript
function SortableChip({ id, word, onRemove }: { id: string; word: string; onRemove: () => void }) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 50 : undefined,
  };

  return (
    <motion.button
      ref={setNodeRef}
      style={style}
      layout
      initial={{ opacity: 0, scale: 0.8, y: -10 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.8, y: -10 }}
      transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
      onClick={onRemove}
      className="jp rounded-full bg-indigo px-3.5 py-1.5 text-sm font-semibold text-white transition-all hover:bg-vermillion active:scale-90 touch-none"
      {...attributes}
      {...listeners}
    >
      {word}
    </motion.button>
  );
}
```

- [ ] **Step 4: Replace answer area div with DnD context**

Replace the answer mapping loop with `DndContext` + `SortableContext`:

```tsx
{answer.length === 0 ? (
  <motion.p className="pt-6 text-center text-sm text-ink-soft" ...>
    Tap kata di bawah untuk menyusun kalimat
  </motion.p>
) : (
  <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
    <SortableContext items={answerIds} strategy={horizontalListSortingStrategy}>
      <div className="flex flex-wrap gap-2 pt-6">
        <AnimatePresence mode="popLayout">
          {answer.map((w, i) => (
            <SortableChip key={`ans-${w}-${i}`} id={`ans-${w}-${i}`} word={w} onRemove={() => remove(i)} />
          ))}
        </AnimatePresence>
      </div>
    </SortableContext>
  </DndContext>
)}
```

Add `answerIds` derived state and `handleDragEnd`:

```typescript
const answerIds = answer.map((_, i) => `ans-${answer[i]}-${i}`);

function handleDragEnd(event: DragEndEvent) {
  const { active, over } = event;
  if (!over || active.id === over.id) return;
  
  const oldIndex = answerIds.indexOf(active.id as string);
  const newIndex = answerIds.indexOf(over.id as string);
  const newAnswer = arrayMove(answer, oldIndex, newIndex);
  setAnswer(newAnswer);
  setShowResult(false);
}
```

Add sensors:
```typescript
const sensors = useSensors(
  useSensor(PointerSensor, { activationConstraint: { distance: 8 } })
);
```

- [ ] **Step 5: Add partial feedback (show which words are correct)**

After submission, show which words are in the right position:

```typescript
const correctWords = ["私は", "ご飯", "を", "食べます"];
const wordResults = answer.map((w, i) => ({
  word: w,
  correctPosition: correctWords[i] === w,
  exists: correctWords.includes(w),
}));
```

Display in the result section:
```tsx
{submitted && !correct && (
  <div className="mt-3 space-y-2">
    <div className="rounded-btn bg-error/10 px-4 py-3 text-center">
      <p className="text-sm font-bold text-error">Belum tepat</p>
      <p className="mt-1 text-xs text-ink-soft">Kata yang benar posisinya:</p>
    </div>
    <div className="flex flex-wrap gap-2 justify-center">
      {correctWords.map((w, i) => (
        <span
          key={w}
          className={`jp rounded-full px-3 py-1 text-xs font-semibold ${
            answer[i] === w
              ? "bg-success/20 text-success"
              : "bg-indigo-tint-soft text-ink-soft"
          }`}
        >
          {w}
        </span>
      ))}
    </div>
  </div>
)}
```

- [ ] **Step 6: Update pool to dim (not remove) selected words**

Instead of filtering out words from pool, keep them but add `opacity-30 pointer-events-none` class:

Change `add()` function:
```typescript
function add(word: string) {
  setAnswer((a) => [...a, word]);
  setShowResult(false);
}
```

Change pool rendering:
```typescript
{pool.map((w) => {
  const isUsed = answer.includes(w);
  return (
    <motion.button
      key={w}
      layout
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: isUsed ? 0.3 : 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      transition={{ duration: 0.2 }}
      onClick={() => !isUsed && add(w)}
      disabled={isUsed}
      className={`jp rounded-full border border-indigo bg-paper px-3.5 py-1.5 text-sm font-semibold transition-all ${
        isUsed
          ? "text-ink-soft/40 cursor-not-allowed"
          : "text-indigo hover:bg-indigo hover:text-white active:scale-90"
      }`}
    >
      {w}
    </motion.button>
  );
})}
```

Wait — this has a problem. If the word "を" appears only once in the pool but can be used once in the answer, we need to track usage count. Let me think... The pool has unique words. If user adds "を" to answer, it should be dimmed in pool. If user removes it, it should be re-enabled. Simple `answer.includes(w)` check works since each word is unique in the pool.

- [ ] **Step 7: Fix "Hapus" button positioning**

Move from absolute to flex layout:

```tsx
<div className="relative ...">
  <div className="flex items-center justify-between mb-1">
    <span className="text-xs text-ink-soft">Susunan kamu:</span>
    <button onClick={clearAll} className="flex items-center gap-1 text-xs font-semibold text-ink-soft hover:text-error transition-colors">
      <Trash2 size={14} /> Hapus
    </button>
  </div>
  {/* ... answer area ... */}
</div>
```

- [ ] **Step 8: Verify**

Test full flow: tap words, drag to reorder, submit, see partial feedback, clear all.

- [ ] **Step 9: Commit**

### Task 4: Kuis List Empty States + Harian Content + Icons

**Files:**
- Modify: `src/app/m/kuis/page.tsx`

- [ ] **Step 1: Add empty state component**

Add empty state for when there are no Tugas Guru items:

```tsx
function EmptyState({ icon: Icon, title, desc }: { icon: React.ElementType; title: string; desc: string }) {
  return (
    <motion.div variants={staggerItem} className="mt-8 flex flex-col items-center text-center">
      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-indigo-tint-soft">
        <Icon size={28} className="text-indigo" />
      </div>
      <p className="mt-3 text-sm font-bold text-ink">{title}</p>
      <p className="mt-1 text-xs text-ink-soft">{desc}</p>
    </motion.div>
  );
}
```

Import `ClipboardList` and `Sparkles` from lucide-react.

Use it conditionally:
```tsx
{tab === "guru" && (
  <>
    {showTasks ? (
      <div className="mt-4 space-y-3">
        {/* existing task cards */}
      </div>
    ) : (
      <EmptyState
        icon={ClipboardList}
        title="Tidak ada tugas"
        desc="Gurumu belum memberikan tugas. Santai dulu!"
      />
    )}
  </>
)}
```

For now, keep `showTasks = true` (the mock data is there). The empty state is ready for when real data is empty.

- [ ] **Step 2: Enrich Harian tab content**

Add multiple daily challenge options with Lucide `Dices` icon (replacing 🎲):

```tsx
{tab === "harian" && (
  <div className="mt-4 space-y-3">
    <Card className="border-2 border-indigo transition-all hover:shadow-soft-lg" padded>
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-indigo-tint-soft">
          <Dices size={20} className="text-indigo" />
        </div>
        <div>
          <p className="text-sm font-bold text-ink">Kuis Hari Ini — N5 Random</p>
          <p className="text-xs text-ink-soft">10 soal · ±5 menit</p>
        </div>
      </div>
      <Button fullWidth className="mt-4" onClick={() => router.push("/m/kuis/soal")}>
        Mulai
      </Button>
    </Card>
    <Card className="transition-all hover:shadow-soft-lg" padded>
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gold/10">
          <Zap size={20} className="text-gold" />
        </div>
        <div>
          <p className="text-sm font-bold text-ink">Mode Cepat — 30 Detik</p>
          <p className="text-xs text-ink-soft">5 soal · tebak cepat</p>
        </div>
      </div>
      <Button variant="outline" fullWidth className="mt-4">
        Mulai
      </Button>
    </Card>
    <Card className="transition-all hover:shadow-soft-lg" padded>
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-success/10">
          <Trophy size={20} className="text-success" />
        </div>
        <div>
          <p className="text-sm font-bold text-ink">Tantangan Mingguan</p>
          <p className="text-xs text-ink-soft">Kumpulkan 100 poin · 3 hari lagi</p>
        </div>
      </div>
      <Button variant="outline" fullWidth className="mt-4">
        Mulai
      </Button>
    </Card>
  </div>
)}
```

Import `Dices`, `Zap`, `Trophy` from lucide-react.

- [ ] **Step 3: Add mini progress bar to "Sudah Dikerjakan" cards**

For completed tasks, add a mini progress bar:

```tsx
<div className="mt-2">
  <ProgressBar value={85} color="success" height={4} />
</div>
```

- [ ] **Step 4: Add scroll indicator or section group labels**

Group Tugas Guru items by due date:

```tsx
{/* Kelompok: Mendesak */}
<p className="mb-2 mt-4 text-xs font-bold uppercase tracking-wider text-error">Mendesak</p>
{/* ... urgent items ... */}

{/* Kelompok: Lainnya */}
<p className="mb-2 mt-4 text-xs font-bold uppercase tracking-wider text-ink-soft">Lainnya</p>
{/* ... other items ... */}
```

- [ ] **Step 5: Add active scale to all interactive cards**

Add `active:scale-[0.98]` to card hover classes.

- [ ] **Step 6: Verify**

Navigate to `/m/kuis`, switch tabs, check icons render correctly, progress bar visible.

- [ ] **Step 7: Commit**

### Task 5: Review Page Retry Button + Emoji→Icons

**Files:**
- Modify: `src/app/m/kuis/review/page.tsx`

- [ ] **Step 1: Replace emoji score messages with Lucide icons**

Replace the score heading:

```tsx
<div className="mt-3 flex items-center justify-center gap-2">
  {score >= 80 ? (
    <Award size={24} className="text-success" />
  ) : score >= 60 ? (
    <TrendingUp size={24} className="text-gold" />
  : (
    <BookOpen size={24} className="text-error" />
  )}
  <motion.h1
    className="text-xl font-bold"
    initial={{ opacity: 0, y: 8 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 0.2 }}
    style={{ color: ... }}
  >
    {score >= 80 ? "Lulus!" : score >= 60 ? "Hampir Lulus!" : "Ayo belajar lagi!"}
  </motion.h1>
</div>
```

Replace emoji in teacher comment: `"💪"` → remove.

Import `Award`, `TrendingUp`, `BookOpen` from lucide-react.

- [ ] **Step 2: Add "Coba Lagi" retry button**

Add a secondary button after "Kembali ke Dashboard":

```tsx
<motion.div variants={staggerItem} className="mt-3">
  <Button
    fullWidth
    variant="outline"
    size="lg"
    onClick={() => router.push("/m/kuis/soal")}
    className="transition-all active:scale-[0.98]"
  >
    <RefreshCw size={16} className="mr-1" /> Coba Lagi
  </Button>
</motion.div>
```

Import `RefreshCw` from lucide-react.

- [ ] **Step 3: Improve stats clarity**

Change "Kelas" label to "Peringkat" if it's a rank, or keep "Kelas #5" but add a subtitle:

```tsx
{ v: "#5", l: "Peringkat Kelas" },
```

- [ ] **Step 4: Make XP dynamic (placeholder with API-ready state)**

Change hardcoded "+40" to a dynamic calculation:

```tsx
const baseXP = correctCount * 10;
const bonusXP = score >= 80 ? 20 : score >= 60 ? 10 : 0;
const totalXP = baseXP + bonusXP;

// In stats:
{ v: `+${totalXP}`, l: "XP" },
```

- [ ] **Step 5: Add Share button (nice-to-have)**

```tsx
<Button
  fullWidth
  variant="ghost"
  size="sm"
  onClick={() => {/* TODO: share sheet */}}
  className="transition-all active:scale-[0.98]"
>
  <Share2 size={14} className="mr-1" /> Bagikan Hasil
</Button>
```

- [ ] **Step 6: Verify**

Navigate to `/m/kuis/review`, check icons render, retry button navigates to soal, stats update.

- [ ] **Step 7: Commit**
