<script setup lang="ts">
defineProps({
  image: {
    type: Object,
    required: true,
  },
});

const coverInfo = useCoverInfoStore()

const setCoverImgMap = (image: any) => {
  const img = {
    id: image.id,
    previewImg: image.urls.regular,
    username: image.user.name,
    username_avatar: image.user.profile_image?.small,
    profile: `${image.user.links.html}?utm_source=https://picprose.net&utm_medium=referral`,
    downLoad_path: image.links.download_location,
  }
  coverInfo.setCoverImage(img)
  coverInfo.setHistorySelected(image)
}

</script>
<template>
  <div class="w-5/12 h-24 m-2">
    <img @click="() => setCoverImgMap(image)" :src="image.urls?.small"
      class="transition-transform duration-200 transform hover:scale-105 rounded cursor-pointer object-cover w-full h-24" />
  </div>
</template>