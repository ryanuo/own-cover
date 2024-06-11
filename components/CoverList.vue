<script setup lang="ts">
const { t } = useI18n()
const coverListStore = useCoverListStore()
const tabActive = ref(0)
const asides = reactive([
  {
    key: 'coverList',
    label: t('cover.config.image', 'Images'),
  },
  {
    key: 'history_selected_lists',
    label: t('cover.config.history', 'History'),
  },
])

onMounted(() => {
  if (coverListStore.coverList.length === 0)
    coverListStore.buttomQueryCoverList()
})

const debouncedQuery = useDebounceFn(() => {
  coverListStore.buttomQueryCoverList()
}, 1000)

function handleClick() {
  debouncedQuery()
}

function onFileChange(e: Event) {
  const files = (e.target as HTMLInputElement).files
  if (files && files.length > 0) {
    const file = files[0]
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = (e) => {
      const result = e.target?.result
      if (result && typeof result === 'string') {
        coverListStore.setCoverImgMap({
          id: new Date().getTime(),
          urls: {
            small: result,
            regular: result,
          },
          user: {
            name: 'Ryanuo',
            profile_image: {
              small: 'https://avatars.githubusercontent.com/u/66169324?v=4',
            },
            links: {
              html: 'https://github.com/rr210',
              self: 'https://unsplash.com/developers',
            },
          },
          links: {
            download_location: 'https://github.com/rr210',
          },
        })
      }
    }
  }
}
</script>

<template>
  <CoverCardFrame>
    <template #head>
      <div class="pl-3 cursor-pointer">
        <img src="/logo.png" class="w-8 inline-flex mr-1">
        <span class="font-bold align-middle text-base">Own Cover</span>
      </div>
      <SwitchLang />
    </template>
    <template #default>
      <UTabs
        v-model="tabActive" :items="asides" :ui="{
          wrapper: 'h-full',
          container: 'h-[80vh] flex justify-center',
          base: 'w-full',
        }"
      >
        <template #item="{ item }">
          <CustomImageList :item="item" />
        </template>
      </UTabs>
    </template>
    <template #foot>
      <template v-if="tabActive === 0">
        <UButton class="relative">
          <Icon name="bi:upload" />
          <input
            type="file" value="" class="absolute w-full h-full opacity-0 top-0 left-0 cursor-pointer text-[0px]"
            :multiple="false" accept=".png,.jpg,.jpeg" @change="onFileChange"
          >
        </UButton>
        <UInput
          v-model="coverListStore.coverSearchQuery" class="w-full mx-2" size="xs" color="primary" variant="outline"
          placeholder="Search..."
        />
        <UButton @click="handleClick">
          <Icon name="ep:search" />
        </UButton>
      </template>
      <template v-else>
        <UPopover class="w-full" :popper="{ placement: 'top-end' }">
          <UButton class="w-full" :ui="{ base: 'justify-center' }">
            {{ $t("cover.clear.title", "Clear History List") }}
          </UButton>
          <template #panel="{ close }">
            <div class="p-2">
              {{ $t("cover.clear", "Confirm to clear the history list?") }}
            </div>
            <div class="flex justify-evenly">
              <UButton class="my-1" @click="close">
                {{ $t("cover.clear.cancel", "cancel") }}
              </UButton>
              <UButton
                class="my-1" @click="() => {
                  coverListStore.history_selected_lists = [];
                  close();
                }
                "
              >
                {{ $t("cover.clear.confirm", "confirm") }}
              </UButton>
            </div>
          </template>
        </UPopover>
      </template>
    </template>
  </CoverCardFrame>
</template>
