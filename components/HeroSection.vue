<script setup lang="ts">
import copy from '~/content/copy.json'

const hero = copy.hero
const stats = copy.stats

// split the headline around its accent fragment
const parts = computed(() => {
  const [before, after] = hero.headline.split(hero.headlineAccent)
  return { before, accent: hero.headlineAccent, after }
})

// colorize a terminal line by its leading token
function lineClass(line: string) {
  if (line.startsWith('$')) return 'text-fg'
  if (line.includes('[+]')) return 'text-acid'
  if (line.includes('[!]')) return 'text-ember'
  if (line.includes('[✓]')) return 'text-success'
  if (line.includes('[>]')) return 'text-muted'
  return 'text-muted'
}

// --- real-terminal state machine: type command → run → stream output → loop ---
const command = hero.terminalLines[0].replace(/^\$\s*/, '')
const output = hero.terminalLines.slice(1)

type Phase = 'typing' | 'running' | 'output' | 'done'
const typed = ref('')
const outCount = ref(0)
const phase = ref<Phase>('typing')
const runs = ref(0) // bumps each scan so the beam replays

const scanning = computed(() => phase.value === 'running' || phase.value === 'output')
const statusLabel = computed(() =>
  phase.value === 'done' ? 'complete' : phase.value === 'typing' ? 'ready' : 'scanning',
)

let alive = true
const timers: number[] = []
const wait = (ms: number) =>
  new Promise<void>((resolve) => timers.push(window.setTimeout(resolve, ms)))

async function loop() {
  while (alive) {
    typed.value = ''
    outCount.value = 0
    phase.value = 'typing'
    await wait(650)

    // type the command out, char by char (small pause on spaces)
    for (let i = 1; i <= command.length; i++) {
      if (!alive) return
      typed.value = command.slice(0, i)
      await wait(command[i - 1] === ' ' ? 66 : 32)
    }
    if (!alive) return

    // command executes
    phase.value = 'running'
    runs.value += 1
    await wait(700)

    // scanner output streams in
    phase.value = 'output'
    for (let i = 1; i <= output.length; i++) {
      if (!alive) return
      outCount.value = i
      await wait(460)
    }
    if (!alive) return

    // idle at the returned prompt, then restart
    phase.value = 'done'
    await wait(3200)
  }
}

// The scanner always animates. Reduced-motion only drops the big sweeping beam;
// the typewriter + line streaming stay so the panel still reads as a live
// terminal.
const showBeam = ref(true)
onMounted(() => {
  showBeam.value = !window.matchMedia('(prefers-reduced-motion: reduce)').matches
  loop()
})
onUnmounted(() => {
  alive = false
  timers.forEach((t) => clearTimeout(t))
})
</script>

<template>
  <section class="relative overflow-hidden">
    <!-- localized plasma glow behind the scanner -->
    <div aria-hidden="true" class="fx-plasma pointer-events-none absolute right-0 top-0 h-[80%] w-[70%] opacity-70" />

    <div class="relative mx-auto grid max-w-shell items-center gap-14 px-5 pb-16 pt-14 sm:px-8 lg:grid-cols-[1.05fr_0.95fr] lg:gap-10 lg:pb-24 lg:pt-20">
      <!-- copy column -->
      <div>
        <div class="mb-7 inline-flex items-center gap-2.5 border border-line bg-surface/60 px-3 py-1.5">
          <span class="h-1.5 w-1.5 rounded-full bg-mint animate-ember" />
          <span class="kicker text-muted">{{ hero.eyebrow }}</span>
          <span class="hidden font-mono text-[0.6rem] uppercase tracking-[0.22em] text-acid-dim sm:inline">· zero days, minus one</span>
        </div>

        <h1 class="text-display text-fg">
          {{ parts.before }}<span class="text-acid">{{ parts.accent }}</span>{{ parts.after }}
        </h1>

        <p class="mt-7 max-w-xl text-[1.05rem] leading-relaxed text-muted">
          {{ hero.subheadline }}
        </p>

        <div class="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
          <NuxtLink to="/contact" class="btn-primary">
            {{ hero.primaryCta }}
            <span aria-hidden="true">→</span>
          </NuxtLink>
          <NuxtLink to="/#disclosures" class="btn-ghost">
            {{ hero.secondaryCta }}
          </NuxtLink>
        </div>

        <!-- inline stat strip -->
        <dl class="mt-12 grid grid-cols-2 gap-x-8 gap-y-6 border-t border-line pt-8 sm:grid-cols-4 sm:gap-x-4">
          <div v-for="s in stats" :key="s.label" class="min-w-0">
            <dt class="font-display text-2xl font-bold tracking-tightest text-fg sm:text-[1.75rem]">{{ s.value }}</dt>
            <dd class="mt-1 font-mono text-[0.66rem] uppercase leading-tight tracking-[0.08em] text-haze">{{ s.label }}</dd>
          </div>
        </dl>
      </div>

      <!-- live scanner -->
      <ReticleFrame always label="losec://scanner · REF 0x2F">
        <div class="scanlines relative overflow-hidden border border-line-strong bg-[#08090c] shadow-hud">
          <!-- terminal chrome -->
          <div class="flex items-center justify-between border-b border-line px-4 py-2.5">
            <div class="flex items-center gap-1.5">
              <span class="h-2.5 w-2.5 rounded-full border border-line-strong" />
              <span class="h-2.5 w-2.5 rounded-full border border-line-strong" />
              <span class="h-2.5 w-2.5 rounded-full border border-line-strong" />
            </div>
            <span class="hidden font-mono text-[0.66rem] uppercase tracking-[0.14em] text-haze sm:inline">exhaustive scan</span>
            <span
              class="inline-flex items-center gap-1.5 font-mono text-[0.66rem] uppercase tracking-[0.14em]"
              :class="phase === 'done' ? 'text-success' : 'text-mint'"
            >
              <span
                class="h-1.5 w-1.5 rounded-full"
                :class="[phase === 'done' ? 'bg-success' : 'bg-mint', scanning ? 'animate-ember' : '']"
              />
              {{ statusLabel }}
            </span>
          </div>

          <!-- scan beam — replays on each scan run (skipped under reduced-motion) -->
          <div
            v-if="scanning && showBeam"
            :key="runs"
            aria-hidden="true"
            class="pointer-events-none absolute inset-x-0 top-0 z-10 h-16 animate-scanbeam"
            style="background: linear-gradient(to bottom, transparent, rgb(var(--c-acid) / 0.14), transparent)"
          />

          <!-- log body -->
          <div class="relative min-h-[15.5rem] px-4 py-4 font-mono text-[0.78rem] leading-[1.7] sm:text-[0.82rem]">
            <!-- command line (typed out) -->
            <p class="whitespace-pre-wrap break-words text-fg">
              <span class="text-acid-dim">$</span> <span>{{ typed }}</span><span
                v-if="phase === 'typing' || phase === 'running'"
                aria-hidden="true"
                class="ml-px inline-block h-[1.05em] w-[0.55ch] translate-y-[0.15em] bg-acid animate-cursor"
              />
            </p>

            <!-- streamed scanner output -->
            <p
              v-for="(line, i) in output.slice(0, outCount)"
              :key="i"
              :class="lineClass(line)"
              class="whitespace-pre-wrap break-words"
            >{{ line }}</p>

            <!-- returned prompt -->
            <p v-if="phase === 'done'" class="text-acid">
              <span class="text-acid-dim">losec@lab</span>:~$ <span
                aria-hidden="true"
                class="inline-block h-[1.05em] w-[0.55ch] translate-y-[0.15em] bg-acid animate-cursor"
              />
            </p>
          </div>

          <!-- footer status -->
          <div class="flex items-center justify-between border-t border-line px-4 py-2 font-mono text-[0.64rem] text-haze">
            <span>CAL 07.2026</span>
            <span class="inline-flex items-center gap-1.5">
              <span class="h-1.5 w-1.5 rounded-full bg-ember" />
              breach · 0-day #147 · CVSS 9.8
            </span>
          </div>
        </div>
      </ReticleFrame>
    </div>
  </section>
</template>
