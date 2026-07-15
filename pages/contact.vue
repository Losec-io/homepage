<script setup lang="ts">
useSeo({
  title: 'Contact',
  description:
    'Request a threat briefing, report a vulnerability, or start a partnership with the LoSec AI security research lab.',
})

const inquiryTypes = [
  'Threat briefing',
  'Vulnerability report',
  'Partnership / engagement',
  'Press / media',
  'Other',
]

const form = reactive({
  name: '',
  email: '',
  company: '',
  inquiry: inquiryTypes[0],
  message: '',
})

function submit() {
  const subject = `[${form.inquiry}] Inbound from ${form.name || 'website'}`
  const body = [
    `Name: ${form.name}`,
    `Email: ${form.email}`,
    `Company: ${form.company}`,
    `Inquiry: ${form.inquiry}`,
    '',
    form.message,
  ].join('\n')
  const target = form.inquiry === 'Partnership / engagement' ? siteConfig.businessEmail : siteConfig.email
  window.location.href = `mailto:${target}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
}

const channels = [
  { label: 'General', value: siteConfig.email, href: `mailto:${siteConfig.email}` },
  { label: 'Business', value: siteConfig.businessEmail, href: `mailto:${siteConfig.businessEmail}` },
  { label: 'X / Twitter', value: siteConfig.socials.xHandle, href: siteConfig.socials.x },
  { label: 'GitHub', value: siteConfig.socials.githubHandle, href: siteConfig.socials.github },
]
</script>

<template>
  <div>
    <PageHero
      eyebrow="Engage the lab"
      code="losec://contact"
      title="Request a threat briefing"
      description="Tell us about your attack surface, a bug you've found, or a research collaboration. Confidential, researcher-led, and fast — we usually reply within one business day."
    />

    <section class="mx-auto max-w-shell px-5 py-16 sm:px-8">
      <div class="grid gap-12 lg:grid-cols-[1.3fr_1fr]">
        <!-- form -->
        <Reveal>
          <ReticleFrame always label="losec://intake">
            <form class="scanlines border border-line-strong bg-surface p-6 shadow-hud sm:p-8" @submit.prevent="submit">
              <div class="grid gap-5 sm:grid-cols-2">
                <label class="block">
                  <span class="mb-2 block font-mono text-[0.68rem] uppercase tracking-[0.12em] text-haze">Name</span>
                  <input v-model="form.name" type="text" required class="lo-input" placeholder="Jane Operator" />
                </label>
                <label class="block">
                  <span class="mb-2 block font-mono text-[0.68rem] uppercase tracking-[0.12em] text-haze">Email</span>
                  <input v-model="form.email" type="email" required class="lo-input" placeholder="jane@company.com" />
                </label>
              </div>

              <label class="mt-5 block">
                <span class="mb-2 block font-mono text-[0.68rem] uppercase tracking-[0.12em] text-haze">Company <span class="text-faint">(optional)</span></span>
                <input v-model="form.company" type="text" class="lo-input" placeholder="Acme Corp" />
              </label>

              <label class="mt-5 block">
                <span class="mb-2 block font-mono text-[0.68rem] uppercase tracking-[0.12em] text-haze">Inquiry type</span>
                <select v-model="form.inquiry" class="lo-input">
                  <option v-for="t in inquiryTypes" :key="t" :value="t">{{ t }}</option>
                </select>
              </label>

              <label class="mt-5 block">
                <span class="mb-2 block font-mono text-[0.68rem] uppercase tracking-[0.12em] text-haze">Message</span>
                <textarea v-model="form.message" rows="5" required class="lo-input resize-y" placeholder="What would you like us to look at?" />
              </label>

              <button type="submit" class="btn-primary mt-6 w-full sm:w-auto">
                Transmit request →
              </button>
              <p class="mt-4 font-mono text-[0.66rem] leading-relaxed text-haze">
                Opens your mail client, encrypted in transit by your provider. Prefer PGP? Ask and we'll share a key.
              </p>
            </form>
          </ReticleFrame>
        </Reveal>

        <!-- channels -->
        <Reveal :delay="80">
          <div class="flex flex-col gap-6">
            <div class="border border-line bg-surface p-6">
              <p class="kicker mb-5">Direct channels</p>
              <ul class="divide-y divide-line">
                <li v-for="c in channels" :key="c.label" class="flex items-center justify-between gap-4 py-3.5">
                  <span class="font-mono text-[0.68rem] uppercase tracking-[0.1em] text-haze">{{ c.label }}</span>
                  <a :href="c.href" target="_blank" rel="noopener" class="font-mono text-[0.82rem] text-fg transition-colors hover:text-acid">
                    {{ c.value }}
                  </a>
                </li>
              </ul>
            </div>

            <div class="border border-acid/25 bg-acid/[0.04] p-6">
              <p class="kicker mb-3 text-acid">Responsible disclosure</p>
              <p class="text-[0.85rem] leading-relaxed text-muted">
                Found a bug in our own infrastructure? We welcome coordinated
                disclosure. Email
                <a :href="`mailto:${siteConfig.email}`" class="text-acid underline decoration-acid/40 hover:decoration-acid">{{ siteConfig.email }}</a>
                with steps to reproduce; we'll acknowledge within 24 hours.
              </p>
            </div>

            <div class="flex items-center gap-2 font-mono text-[0.7rem] text-haze">
              <span class="h-1.5 w-1.5 rounded-full bg-mint animate-ember" />
              losec://intake · online · avg reply &lt; 24h
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  </div>
</template>

<style scoped>
.lo-input {
  width: 100%;
  background: rgb(var(--c-ink));
  border: 1px solid rgb(var(--c-line-strong));
  color: rgb(var(--c-fg));
  font-family: 'IBM Plex Mono', ui-monospace, monospace;
  font-size: 0.85rem;
  padding: 0.7rem 0.85rem;
  transition: border-color 0.15s var(--ease-out);
}
.lo-input::placeholder {
  color: rgb(var(--c-faint));
}
.lo-input:focus {
  outline: none;
  border-color: rgb(var(--c-acid));
}
</style>
