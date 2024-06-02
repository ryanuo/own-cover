<script setup lang="ts">
import domToImg from 'dom-to-image'

useHead({
  title: 'Own Cover | Auto Generate',
  meta: [
    { name: 'description', content: 'My Own Cover Site | Auto Generate.' },
  ],
})

interface ImageProcessingData {
  aspect_ratio: string
  coverMarkColor: string
  font: string
  coverTitle: string
  coverAuthor: string
  iconPosition: string
  iconName: string
  previewImg: string
}

const coverConfigStore = useCoverConfigStore()
const coverListStore = useCoverListStore()
const resultImg = ref('')
const coverList = ref()

onMounted(() => {
  setCoverConfig()

  setTimeout(() => {
    coverList.value = coverListStore
  })
})

const routes = useRoute()

function setCoverConfig() {
  const { previewImg, iconName, iconPosition, aspect_ratio, coverMarkColor, font, coverTitle, coverAuthor } = routes.query as unknown as ImageProcessingData
  if (aspect_ratio) {
    const params = aspect_ratio.split(':')
    coverConfigStore.setAspectRatioCustom({ left: params[0], right: params[1] })
  }

  if (coverMarkColor)
    coverConfigStore.setColorAlpha(coverMarkColor)

  if (font)
    coverConfigStore.fontLabel = font

  if (coverTitle)
    coverConfigStore.setCoverTitle(coverTitle)

  if (coverAuthor)
    coverConfigStore.coverAuthor = coverAuthor

  if (iconPosition)
    coverConfigStore.setIconPosition(Number(iconPosition))

  if (iconName)
    coverConfigStore.iconName = iconName

  if (previewImg) {
    coverListStore.setCoverImage({
      previewImg,
      id: `${Math.random()}`,
      username: 'r',
      username_avatar: '',
      downLoad_path: '',
      profile: '',
    })
  }
}
async function generateCover() {
  const ele = document.getElementById('cover-preview-generate')
  setTimeout(() => {
    domToImg
      .toPng(ele)
      .then((dataUrl: string) => {
        resultImg.value = dataUrl
      })
  }, 2000)
}

watch(() => coverList.value, () => {
  if (coverListStore.previewCoverMap.previewImg)
    generateCover()
})
</script>

<template>
  <div v-if="resultImg" class="w-full flex justify-center p-2 mt-16">
    <!-- <img id="resultImg" :src="resultImg" class="w-3/4"> -->
    <span id="resultImg" class="w-full">
      {{ resultImg }}
    </span>
  </div>
  <div v-else>
    <CoverPreview />
  </div>
</template>
