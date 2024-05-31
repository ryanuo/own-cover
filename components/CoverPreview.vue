<script setup lang="ts">
const coverConfigStore = useCoverConfigStore()
const coverListStore = useCoverListStore()

const coverConfig = ref()
const coverList = ref()

onMounted(() => {
  setTimeout(() => {
    coverList.value = coverListStore
    coverConfig.value = coverConfigStore
  })
})

function updateFontFace() {
  const fontFace = coverConfigStore.fontLabel
  const fontCdn = coverConfigStore.fontCdn

  const oldStyle = document.getElementById('cover-preview')
  if (oldStyle)
    oldStyle.remove()

  const oldLink = document.getElementById('font-face')
  if (oldLink)
    oldLink.remove()

  const style = document.createElement('style')
  style.id = 'cover-preview'
  style.textContent = `
    :root {
      --cover-font-family: ${fontFace};
    }
  `
  document.head.appendChild(style)

  const link = document.createElement('link')
  link.id = 'font-face'
  link.rel = 'stylesheet'
  link.crossOrigin = 'anonymous'
  link.href = fontCdn.replace('%s', fontFace)
  document.head.appendChild(link)
}

watch(
  () => [coverConfigStore.fontCdn, coverConfigStore.fontLabel],
  () => {
    if (coverConfigStore.fontLabel && coverConfigStore.fontCdn && document)
      updateFontFace()
  },
  {
    immediate: true,
  },
)
</script>

<template>
  <div
    class="cover-preview-font flex-auto bg-gray-100 overflow-x-auto flex items-center rounded-md scrollbar scrollbar-thin scrollbar-w-8"
  >
    <div
      class="m-auto rounded-md flex items-center justify-center min-w-[800px]"
    >
      <div v-if="coverConfig" id="cover-preview-generate" class="relative">
        <div
          class="max-h-[90vh]"
          :style="{
            aspectRatio: coverConfig.aspectRatio.value,
          }"
        >
          <img
            :src="coverList.previewCoverMap?.previewImg"
            class="rounded-md object-cover w-full h-full"
          >
        </div>
        <div
          class="text-white absolute top-0 left-0 right-0 h-full rounded-md flex items-center justify-center"
          :style="{ backgroundColor: coverConfig.coverMarkColor }"
        >
          <div class="text-center">
            <h4 class="font-bold text-4xl px-5 p-4 text-center leading-tight">
              {{ coverConfig.coverTitle }}
            </h4>
            <div class="text-center mt-6 mb-4 text-2xl font-semibold">
              {{ coverConfig.coverAuthor }}
            </div>
            <CustomCoverIcon
              :icon-name="coverConfig.iconName"
              :icon-image="coverConfig.iconImage"
              :icon-position="coverConfig.iconPosition"
              :cover-icon-position="coverConfig.coverIconPosition as any"
            />
          </div>
          <CustomCoverIcon
            v-if="coverConfig.iconPosition !== 2"
            :icon-name="coverConfig.iconName"
            :icon-image="coverConfig.iconImage"
            :icon-position="coverConfig.iconPosition"
            :cover-icon-position="coverConfig.coverIconPosition as any"
          />
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
