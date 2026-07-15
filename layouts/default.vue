<template>
  <div class="relative flex min-h-screen flex-col">
    <SiteBackground />
    <SiteNavbar />
    <main class="flex-1">
      <slot />
    </main>
    <SiteFooter />
  </div>
</template>
