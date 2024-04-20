<script setup lang="ts">
const coverInfoStore = useCoverInfoStore()
</script>
<template>
  <div
    class="flex-auto bg-gray-100 overflow-x-auto flex items-center rounded-md scrollbar scrollbar-thin scrollbar-w-8">
    <div class="max-h-[90vh] min-w-[800px] m-auto relative rounded-md">
      <img
        src="https://images.unsplash.com/photo-1494783367193-149034c05e8f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1MjUwMjd8MHwxfHNlYXJjaHwyfHxzY2VuZXJ5fGVufDB8fHx8MTcxMzQxODY1OXww&ixlib=rb-4.0.3&q=80&w=1080"
        class="rounded-md object-cover max-h-[90vh] w-full aspect-[16/9]" />
      <div class="text-white absolute top-0 left-0 right-0 w-full h-full rounded-md flex items-center justify-center"
        :style="{ backgroundColor: coverInfoStore.coverMarkColor }">
        <div class="text-center">
          <h4 class="font-bold text-5xl px-5 p-4 text-center leading-tight">
            {{ coverInfoStore.coverTitle }}
          </h4>
          <div class="text-center mt-6 mb-4 text-2xl font-semibold">{{ coverInfoStore.coverAuthor }}</div>
          <Icon size="32" :name="coverInfoStore.iconName" v-if="coverInfoStore.iconPosition === 2" />
        </div>
        <Icon size="32" class="absolute" :style="coverInfoStore.coverIconPosition" :name="coverInfoStore.iconName"
          v-if="coverInfoStore.iconPosition !== 2" />
      </div>
    </div>
  </div>
</template>