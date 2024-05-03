<script setup lang="ts">
const coverInfoStore = useCoverInfoStore();

const updateFontFace = () => {
  const fontFace = coverInfoStore.fontLabel;
  const fontCdn = coverInfoStore.fontCdn;

  const oldStyle = document.getElementById("cover-preview");
  if (oldStyle) {
    oldStyle.remove();
  }
  const oldLink = document.getElementById("font-face");
  if (oldLink) {
    oldLink.remove();
  }

  const style = document.createElement("style");
  style.id = "cover-preview";
  style.textContent = `
    :root {
      --cover-font-family: ${fontFace};
    }
  `;
  document.head.appendChild(style);

  const link = document.createElement("link");
  link.id = "font-face";
  link.rel = "stylesheet";
  link.crossOrigin = "anonymous";
  link.href = fontCdn.replace("%s", fontFace);
  document.head.appendChild(link);
};

const coverInfo = ref();
onMounted(() => {
  coverInfo.value = coverInfoStore;
});

watch(
  () => [coverInfoStore.fontCdn, coverInfoStore.fontLabel],
  () => {
    if (coverInfoStore.fontLabel && coverInfoStore.fontCdn && document) {
      updateFontFace();
    }
  },
  {
    immediate: true,
  }
);
</script>
<template>
  <div
    class="cover-preview-font flex-auto bg-gray-100 overflow-x-auto flex items-center rounded-md scrollbar scrollbar-thin scrollbar-w-8"
  >
    <div
      class="m-auto rounded-md flex items-center justify-center min-w-[800px]"
    >
      <div id="cover-preview-generate" class="relative" v-if="coverInfo">
        <div
          class="max-h-[90vh]"
          :style="{
            aspectRatio: coverInfo.aspectRatio.value,
          }"
        >
          <img
            :src="coverInfo.previewCoverMap?.previewImg"
            class="rounded-md object-cover w-full h-full"
          />
        </div>
        <div
          class="text-white absolute top-0 left-0 right-0 h-full rounded-md flex items-center justify-center"
          :style="{ backgroundColor: coverInfo.coverMarkColor }"
        >
          <div class="text-center">
            <h4 class="font-bold text-4xl px-5 p-4 text-center leading-tight">
              {{ coverInfo.coverTitle }}
            </h4>
            <div class="text-center mt-6 mb-4 text-2xl font-semibold">
              {{ coverInfo.coverAuthor }}
            </div>
            <CustomCoverIcon
              :icon-name="coverInfo.iconName"
              :icon-image="coverInfo.iconImage"
              :icon-position="coverInfo.iconPosition"
              :cover-icon-position="coverInfo.coverIconPosition"
            />
          </div>
          <CustomCoverIcon
            v-if="coverInfo.iconPosition !== 2"
            :icon-name="coverInfo.iconName"
            :icon-image="coverInfo.iconImage"
            :icon-position="coverInfo.iconPosition"
            :cover-icon-position="coverInfo.coverIconPosition"
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
