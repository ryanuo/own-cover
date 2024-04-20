<script setup lang="ts"></script>
<template>
  <aside class="min-w-96 max-w-96 flex flex-col h-screen p-3">
    <nav class="h-[4rem] flex justify-between items-center">
      <slot name="head" />
    </nav>
    <section class="flex-grow overflow-y-auto overflow-x-hidden">
      <slot />
    </section>
    <div class="h-[4rem]">
      <slot name="foot" />
    </div>
  </aside>
</template>