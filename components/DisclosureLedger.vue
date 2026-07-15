<script setup lang="ts">
import ledger from '~/content/vulns.json'

const open = ref<string[]>([ledger[0]?.ref])
function toggle(ref: string) {
  open.value = open.value.includes(ref)
    ? open.value.filter((r) => r !== ref)
    : [...open.value, ref]
}

const legend = [
  { label: 'Critical', dot: 'bg-critical' },
  { label: 'High', dot: 'bg-high' },
  { label: 'Medium', dot: 'bg-medium' },
  { label: 'Low', dot: 'bg-acid' },
]
</script>

<template>
  <section id="disclosures" class="scroll-mt-20 border-t border-line">
    <div class="mx-auto max-w-shell px-5 py-20 sm:px-8">
      <Reveal>
        <SectionHeader
          index="03"
          eyebrow="Disclosure ledger"
          title="The running tally"
          description="A live index of CVEs, advisories, and vendor coordinations credited to LoSec. Every entry expands to the full technical breakdown — vector, impact and status."
        />
      </Reveal>

      <div class="mt-12 grid gap-8 lg:grid-cols-[204px_minmax(0,1fr)]">
        <!-- sticky rail -->
        <aside class="hidden lg:block">
          <div class="sticky top-24 flex flex-col gap-6">
            <div class="border border-line bg-surface p-4">
              <p class="status-line mb-3 flex items-center gap-2">
                <span class="h-1.5 w-1.5 rounded-full bg-mint animate-ember" />
                losec://targets
              </p>
              <p class="font-display text-3xl font-bold tracking-tightest text-fg">147</p>
              <p class="mt-1 font-mono text-[0.66rem] uppercase tracking-[0.1em] text-haze">
                total disclosures
              </p>
            </div>

            <div class="border border-line bg-surface p-4">
              <p class="kicker mb-3">Severity</p>
              <ul class="space-y-2">
                <li v-for="l in legend" :key="l.label" class="flex items-center gap-2 font-mono text-[0.72rem] text-muted">
                  <span class="h-1.5 w-1.5 rounded-full" :class="l.dot" />
                  {{ l.label }}
                </li>
              </ul>
            </div>

            <p class="px-1 font-mono text-[0.66rem] leading-relaxed text-haze">
              Showing {{ ledger.length }} of 147 entries.
            </p>
          </div>
        </aside>

        <!-- catalog -->
        <div class="scanlines border border-line-strong bg-surface shadow-hud">
          <!-- header -->
          <div class="hidden grid-cols-[2.25rem_1fr_8.5rem_7rem] items-center gap-4 border-b border-line px-5 py-3 font-mono text-[0.62rem] uppercase tracking-[0.14em] text-haze md:grid">
            <span>#</span>
            <span>Advisory</span>
            <span>Severity</span>
            <span class="text-right">Status</span>
          </div>

          <ul>
            <li v-for="(v, i) in ledger" :key="v.ref" class="border-b border-line last:border-0">
              <button
                type="button"
                class="grid w-full grid-cols-1 items-center gap-3 px-5 py-4 text-left transition-colors duration-150 hover:bg-raised/60 md:grid-cols-[2.25rem_1fr_8.5rem_7rem] md:gap-4"
                :aria-expanded="open.includes(v.ref)"
                @click="toggle(v.ref)"
              >
                <span class="font-mono text-[0.72rem] text-acid">{{ String(i + 1).padStart(2, '0') }}</span>

                <span class="min-w-0">
                  <span class="flex flex-wrap items-center gap-x-3 gap-y-1">
                    <span class="font-mono text-[0.78rem] text-fg">{{ v.cveId }}</span>
                    <span class="font-mono text-[0.64rem] uppercase tracking-[0.08em] text-haze">{{ v.cwe }}</span>
                  </span>
                  <span class="mt-1 block truncate text-[0.86rem] text-muted">{{ v.title }}</span>
                </span>

                <span class="md:justify-self-start"><SeverityBadge :level="v.severity" :cvss="v.cvss" /></span>

                <span class="flex items-center gap-2 md:justify-end">
                  <span class="h-1.5 w-1.5 rounded-full" :class="status(v.status).dot" />
                  <span class="font-mono text-[0.68rem]" :class="status(v.status).text">{{ v.status }}</span>
                  <span
                    aria-hidden="true"
                    class="ml-1 font-mono text-xs text-haze transition-transform duration-200"
                    :class="open.includes(v.ref) ? 'rotate-90 text-acid' : ''"
                  >›</span>
                </span>
              </button>

              <!-- expanded detail -->
              <Transition
                enter-active-class="transition-all duration-200 ease-out"
                enter-from-class="opacity-0 max-h-0"
                enter-to-class="opacity-100 max-h-[40rem]"
                leave-active-class="transition-all duration-150 ease-in"
                leave-from-class="opacity-100 max-h-[40rem]"
                leave-to-class="opacity-0 max-h-0"
              >
                <div v-if="open.includes(v.ref)" class="overflow-hidden">
                  <div class="grid gap-6 border-t border-line bg-panel/60 px-5 py-6 md:grid-cols-[1fr_16rem]">
                    <div class="space-y-4">
                      <div>
                        <p class="kicker mb-1.5">Description</p>
                        <p class="text-[0.88rem] leading-relaxed text-muted">{{ v.description }}</p>
                      </div>
                      <div>
                        <p class="kicker mb-1.5">Impact</p>
                        <p class="text-[0.88rem] leading-relaxed text-muted">{{ v.impact }}</p>
                      </div>
                    </div>

                    <dl class="space-y-3 font-mono text-[0.72rem]">
                      <div class="flex justify-between gap-3 border-b border-line pb-2">
                        <dt class="text-haze">REF</dt><dd class="text-fg">{{ v.ref }}</dd>
                      </div>
                      <div class="flex justify-between gap-3 border-b border-line pb-2">
                        <dt class="text-haze">CVSS</dt><dd class="text-fg">{{ v.cvss }}</dd>
                      </div>
                      <div class="flex justify-between gap-3 border-b border-line pb-2">
                        <dt class="text-haze">Product</dt><dd class="max-w-[9rem] truncate text-right text-fg">{{ v.product }}</dd>
                      </div>
                      <div class="flex justify-between gap-3 border-b border-line pb-2">
                        <dt class="text-haze">Disclosed</dt><dd class="text-fg">{{ v.disclosedDate }}</dd>
                      </div>
                      <div class="border-b border-line pb-2">
                        <dt class="mb-1 text-haze">Vector</dt>
                        <dd class="break-all text-[0.68rem] text-acid-dim">{{ v.vector }}</dd>
                      </div>
                      <div class="flex justify-between gap-3">
                        <dt class="text-haze">Credit</dt><dd class="text-right text-muted">{{ v.researcher }}</dd>
                      </div>
                    </dl>
                  </div>
                </div>
              </Transition>
            </li>
          </ul>

          <!-- footer -->
          <div class="flex flex-col items-start justify-between gap-3 border-t border-line px-5 py-4 font-mono text-[0.68rem] text-haze sm:flex-row sm:items-center">
            <span class="flex items-center gap-2">
              <span class="h-1.5 w-1.5 rounded-full bg-acid" />
              Showing {{ ledger.length }} of 147 entries · continuously updated
            </span>
            <NuxtLink to="/contact" class="link-underline">Request full ledger access →</NuxtLink>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
