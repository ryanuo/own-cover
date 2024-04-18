<script setup lang="ts"></script>
<template>
  <div class="min-w-80 max-w-80 flex flex-col h-[100vh]">
    <div class="h-[4rem]">
      <slot name="head" />
    </div>
    <div
      class="flex-auto bg-slate-600 overflow-y-auto overflow-x-hidden scrollbar-thin scrollbar-color-auto"
    >
      <slot />
    </div>
    <div class="h-[4rem]">
      <slot name="foot" />
    </div>
  </div>
</template>
