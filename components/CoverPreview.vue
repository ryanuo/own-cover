<script setup lang="ts"></script>
<template>
  <div class="flex-auto bg-gray-100 overflow-x-auto flex items-center rounded-md">
    <div class="max-h-[90vh] min-w-[800px] m-auto relative rounded-md">
      <img
        src="https://images.unsplash.com/photo-1494783367193-149034c05e8f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1MjUwMjd8MHwxfHNlYXJjaHwyfHxzY2VuZXJ5fGVufDB8fHx8MTcxMzQxODY1OXww&ixlib=rb-4.0.3&q=80&w=1080"
        class="rounded-md object-cover max-h-[90vh] w-full aspect-[16/9]" />
      <div
        class="text-white absolute top-0 left-0 right-0 w-full h-full bg-black/20 rounded-md flex items-center justify-center">
        <div>
          <h4 class="font-bold text-5xl px-5 p-4 text-center leading-tight">
            {{ $t("common.cover.title", '你必须非常努力，才能看起来毫不费力！') }}
          </h4>
          <div class="text-center mt-8 text-2xl font-semibold">@Ryan Co</div>
        </div>
      </div>
    </div>
  </div>
</template>