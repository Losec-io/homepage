<script setup lang="ts">
useSeoMeta({
  title: 'LoSec — AI Security Research Lab',
  description:
    'LoSec pairs autonomous AI agents with elite offensive researchers to discover vulnerabilities and 0-days before attackers do. Real disclosures, deep write-ups.',
  ogTitle: 'LoSec — AI Security Research Lab',
  ogDescription: 'AI-driven vulnerability discovery and 0-day research.',
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
