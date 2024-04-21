<script setup lang="ts"></script>
<template>
  <aside class="min-w-96 max-w-96 flex flex-col h-screen px-3">
    <nav class="h-[4rem] flex justify-between items-center">
      <slot name="head" />
    </nav>
    <section class="flex-grow overflow-clip" :style="{ height: 'calc(100vh - 8rem)' }">
      <slot />
    </section>
    <div class="h-[4rem] flex justify-between items-center">
      <slot name="foot" />
    </div>
  </aside>
</template>