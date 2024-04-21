<script setup lang="ts">
const coverInfoStore = useCoverInfoStore()

// 更新 @font-face 规则
const updateFontFace = () => {
  const fontUrl = coverInfoStore.font.value
  const fontFamily = coverInfoStore.font.label
  const fontFiles = coverInfoStore.font.files

  // 移除旧的 @font-face 规则
  const oldFontFace = document?.querySelector('#cover-preview')
  if (oldFontFace) {
    oldFontFace.parentNode?.removeChild(oldFontFace)
  }

  // 创建新的 style 元素并设置 @font-face 规则
  const style = document?.createElement('style')
  style.id = 'cover-preview'

  if (fontFiles) {
    Object.values(fontFiles).forEach((fontFile) => {
      style.textContent += `
        @font-face {
          font-family: '${fontFamily}';
          src: url('${fontFile}');
        }
      `
    })
  } else {
    style.textContent += `
      @font-face {
        font-family: '${fontFamily}';
        src: url('${fontUrl}');
      }
    `
  }

  // 将 style 元素添加到文档头部
  document.head.appendChild(style)
}
// 监听 coverInfoStore.font 的变化
watch(() => coverInfoStore.font, () => {
  if (coverInfoStore.font.label && document) {
    setTimeout(() => {
      updateFontFace()
    });
  }
}, { immediate: true }) // 立即触发一次以确保页面加载时字体能够正确加载

</script>
<template>
  <div :style="{
    '--cover-font-family': coverInfoStore.font.label
  }"
    class="cover-preview-font flex-auto bg-gray-100 overflow-x-auto flex items-center rounded-md scrollbar scrollbar-thin scrollbar-w-8">
    <div class="m-auto rounded-md flex items-center justify-center min-w-[800px]">
      <div class="relative">
        <div class="max-h-[90vh]" :style="{
          aspectRatio: coverInfoStore.aspectRatio.value
        }">
          <img :src="coverInfoStore.previewCoverMap?.previewImg" class="rounded-md object-cover w-full h-full" />
        </div>
        <div class="text-white absolute top-0 left-0 right-0 h-full rounded-md flex items-center justify-center"
          :style="{ backgroundColor: coverInfoStore.coverMarkColor }">
          <div class="text-center">
            <h4 class="font-bold text-4xl px-5 p-4 text-center leading-tight">
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
  </div>
</template>

<style>
.cover-preview-font {
  font-family: var(--cover-font-family);
}
</style>