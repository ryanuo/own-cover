<script setup lang="ts">
defineProps({
  image: {
    type: Object,
    required: true,
  },
})
const coverListStore = useCoverListStore()
</script>

<template>
  <div class="w-[44%] h-24 m-2">
    <img
      :src="image.urls?.small" class="transition-transform duration-200 transform hover:scale-105 rounded cursor-pointer object-cover w-full h-24"
      @click="() => coverListStore.setCoverImgMap(image)"
    >
  </div>
</template>
