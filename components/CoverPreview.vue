<script setup lang="ts"></script>
<template>
  <div class="flex-auto bg-gray-100 overflow-x-auto flex items-center">
    <div class="max-h-[90vh] min-w-[800px] m-auto relative rounded-md">
      <img
        src="https://images.unsplash.com/photo-1494783367193-149034c05e8f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1MjUwMjd8MHwxfHNlYXJjaHwyfHxzY2VuZXJ5fGVufDB8fHx8MTcxMzQxODY1OXww&ixlib=rb-4.0.3&q=80&w=1080"
        class="rounded-md object-cover max-h-[90vh] w-full aspect-[16/9]" />
      <div
        class="text-white absolute top-0 left-0 right-0 w-full h-full bg-black/20 rounded-md flex items-center justify-center">
        <div>
          <h4 class="font-bold text-5xl">
            你必须非常努力，才能看起来毫不费力！
          </h4>
          <div class="text-center mt-8 text-2xl font-semibold">@Ryan Co</div>
          <svg xmlns="http://www.w3.org/2000/svg" width="128" height="128" viewBox="0 0 512 512">
            <!-- 原始的矩形块路径 -->
            <path fill="currentColor"
              d="M139.6 46.5h93.1V0h-93.1zM46.5 418.9H0V512h93.1v-46.5H46.5zm93.1 93.1h93.1v-46.5h-93.1zM46.5 279.3H0v93.1h46.5zm0-139.7H0v93.1h46.5zM0 93.1h46.5V46.5H93V0H0zm465.5 139.6H512v-93.1h-46.5zM279.3 512h93.1v-46.5h-93.1zM418.9 0v46.5h46.5V93H512V0zm46.6 372.4H512v-93.1h-46.5zm0 93.1H419V512h93v-93.1h-46.5zm-186.2-419h93.1V0h-93.1z" />
            <!-- 新增的小圆圈 -->
            <!-- 上左 -->
            <circle cx="120" cy="120" r="40" fill="currentColor" />
            <!-- 上右 -->
            <circle cx="392" cy="120" r="40" fill="currentColor" />
            <!-- 下左 -->
            <circle cx="120" cy="392" r="40" fill="currentColor" />
            <!-- 下右 -->
            <circle cx="392" cy="392" r="40" fill="currentColor" />
            <!-- 中 -->
            <circle cx="256" cy="256" r="40" fill="currentColor" />
          </svg>
        </div>
      </div>
    </div>
  </div>
</template>