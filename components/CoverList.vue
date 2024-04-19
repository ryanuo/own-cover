<script setup lang="ts">
</script>
<template>
  <CoverCardFrame>
    <template #head>
      <div class="pl-3">
        <img src="/logo.png" class="w-8 inline-flex mr-1" />
        <span class="font-bold align-middle text-xl">Own Cover</span>
      </div>
      <SwitchLang />
    </template>
    <template #default>
      <div class="flex h-full justify-around">
        <ImageItem />
        <ImageItem />
      </div>
    </template>
  </CoverCardFrame>
</template>