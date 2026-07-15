<script setup lang="ts">
useSeo({
  title: 'AI Security - Research & Redteaming | Losec Labs',
  socialTitle: 'Losec Labs — AI Security Research & Redteaming',
  description:
    'LoSec pairs autonomous AI agents with elite offensive researchers to discover vulnerabilities and 0-days before attackers do. Real disclosures, deep write-ups.',
  type: 'website',
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
