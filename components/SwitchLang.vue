<script setup lang="ts">
const switchLocalePath = useSwitchLocalePath()
</script>

<template>
  <div class="text-sm">
    <NuxtLink :to="switchLocalePath('cn')" :class="$route.path === '/' ? '' : 'nuxt-link-unActive'">
      cn
    </NuxtLink>
    /
    <NuxtLink :to="switchLocalePath('en')" :class="$route.path === '/en' ? '' : 'nuxt-link-unActive'">
      en
    </NuxtLink>
  </div>
</template>

<style>
.nuxt-link-unActive {
  color: #999;
}
</style>
