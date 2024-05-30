<script setup lang="ts">
import { PhotoAlbum, type PhotoClickHandler } from 'vue-photo-album'
import Empty from './icon/Empty.vue'

defineProps({
  item: {
    type: Object,
    required: true,
  },
})

const coverInfo = useCoverInfoStore()

const imageLayout = ref<'flex' | 'album'>('album')
const imageMap = computed(() => {
  const isFlex = imageLayout.value === 'flex'
  return {
    classWrap: {
      'flex': isFlex,
      'justify-between': isFlex,
      'content-start': isFlex,
      'flex-wrap': isFlex,
      'w-full': isFlex,
      'pr-1': !isFlex,
    },
    iconName: !isFlex ? 'mingcute:layout-10-line' : 'ri:layout-grid-2-line',
    iconText: isFlex ? 'Flex' : 'Album',
  }
})

const onClick: PhotoClickHandler = (payload) => {
  coverInfo.setCoverImgMap(payload.photo)
}
</script>

<template>
  <div
    :class="imageMap.classWrap"
    class="group/item overflow-auto scrollbar scrollbar-thin scrollbar-w-8 w-full h-full reactive"
  >
    <div
      class="text-white invisible absolute group-hover/item:visible cursor-pointer px-2 py-1 bg-black/65 rounded-lg top-1 right-1 z-20"
      @click="imageLayout = imageLayout === 'album' ? 'flex' : 'album'"
    >
      <Icon :name="imageMap.iconName" size="20" class="hover:scale-110 mr-2 align-text-bottom" />{{ imageMap.iconText }}
    </div>
    <div class="text-white absolute bottom-5 left-0 h-6 bg-black bg-opacity-65 rounded-lg z-20">
      <div class="flex items-center mx-2">
        <a
          href="https://unsplash.com/?utm_source=PicProse&amp;utm_medium=referral"
          target="_blank"
        >
          Powered by
          <Icon name="ri:unsplash-fill" class="mr-1 align-text-bottom" />Unsplash
        </a>
      </div>
    </div>
    <div v-if="coverInfo.coverLoading && !coverInfo[item.key].length" class="overflow-hidden">
      <USkeleton v-for="i in Array(30)" :key="i" class="h-4 w-[50vw] my-2" />
    </div>
    <template v-else-if="coverInfo[item.key].length > 0">
      <PhotoAlbum v-if="imageLayout === 'album'" :photos="coverInfo[item.key]" layout="rows" @click="onClick" />
      <template v-if="imageLayout === 'flex'">
        <ImageItem v-for="i in coverInfo[item.key]" :key="i" :image="i" />
      </template>
    </template>
    <div v-else class="overflow-hidden flex justify-center items-center w-full">
      <div class="text-center text-sm">
        <Empty class="m-auto mt-10" />
        {{ $t("cover.empty", "empty") }}
      </div>
    </div>
  </div>
</template>
