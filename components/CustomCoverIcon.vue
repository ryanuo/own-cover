<script setup lang="ts">
// 定义Props
defineProps({
  iconName: String,
  iconImage: String,
  iconPosition: Number,
  coverIconPosition: String,
})
</script>

<template>
  <Icon
    v-if="iconName"
    size="32"
    :class="{
      'inline-block': iconPosition === 2,
      'absolute': iconPosition !== 2,
    }"
    :name="iconName"
    :style="iconPosition !== 2 ? coverIconPosition : ''"
  />
  <img
    v-if="iconImage"
    :src="iconImage"
    class="w-8 h-8 inline-block" :class="{
      absolute: iconPosition !== 2,
    }"
    :style="iconPosition !== 2 ? coverIconPosition : ''"
  >
</template>
