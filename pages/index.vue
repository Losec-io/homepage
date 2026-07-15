<script setup lang="ts">
useSeoMeta({
  title: 'AI Security - Research & Redteaming | Losec Labs',
  description:
    'LoSec pairs autonomous AI agents with elite offensive researchers to discover vulnerabilities and 0-days before attackers do. Real disclosures, deep write-ups.',
  ogTitle: 'Losec Labs — AI Security Research & Redteaming',
  ogDescription: 'AI-driven vulnerability discovery and 0-day research. Zero days, minus one.',
  twitterCard: 'summary_large_image',
})
</script>

<template>
  <div>
    <!-- Main / hero -->
    <HeroSection />
    <TargetsRail />

    <!-- Credentials -->
    <CertStrip />

    <!-- Vulnerabilities we found -->
    <FeaturedVulns />

    <!-- Latest blog -->
    <LatestBlog />

    <!-- Vulnerabilities list (detailed) -->
    <DisclosureLedger />

    <!-- Engage -->
    <CtaBanner />
  </div>
</template>
