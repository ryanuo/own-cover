<script setup lang="ts">
const switchLocalePath = useSwitchLocalePath()
</script>

<template>
  <div>
    <NuxtLink :to="switchLocalePath('en')">en</NuxtLink>
    <NuxtLink :to="switchLocalePath('cn')">cn</NuxtLink>
  </div>
</template>
