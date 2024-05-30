<script setup lang="ts">
useHead({
  title: 'Own Cover',
  meta: [
    { name: 'description', content: 'My Own Cover Site.' },
  ],
})
</script>

<template>
  <div class="flex overflow-hidden">
    <CoverList />
    <CoverPreview />
    <CoverConfig />
  </div>
</template>
