<script setup lang="ts">
import useUnsplash from '~/composables/useUnsplash';
import Empty from './icon/Empty.vue';
const getCoverList = useUnsplash()

const coverInfo = useCoverInfoStore()
const asides: {
  key: string,
  label: string
}[] = [
    {
      key: 'coverList',
      label: 'Images'
    },
    {
      key: 'history_selected_lists',
      label: 'History'
    },
  ]

const search = ref<string>('')
const loading = ref<boolean>(false)

const queryCoverList = (keyword: string) => {
  loading.value = true
  getCoverList.search.getPhotos({
    query: keyword,
    page: 1,
    perPage: 30,
  })
    .then((result) => {
      coverInfo.setCoverList(result?.response?.results || [])
    }).finally(() => {
      setTimeout(() => {
        loading.value = false
      });
    });
}

onMounted(() => {
  queryCoverList('simple')
})

const debouncedQuery = useDebounceFn((value) => {
  coverInfo.coverList = []
  queryCoverList(value)
}, 1000)

const handleClick = () => {
  if (!search.value.trim()) return;
  debouncedQuery(search.value)
}

</script>
<template>
  <CoverCardFrame>
    <template #head>
      <div class="pl-3 cursor-pointer">
        <img src="/logo.png" class="w-8 inline-flex mr-1" />
        <span class="font-bold align-middle text-base">Own Cover</span>
      </div>
      <SwitchLang />
    </template>
    <template #default>
      <UTabs :items="asides" :ui="{
        wrapper: 'h-full',
        container: 'h-[80vh] flex justify-center'
      }">
        <template #item="{ item }">
          <div class="flex justify-around w-full flex-wrap h-full overflow-auto scrollbar scrollbar-thin scrollbar-w-8">
            <div v-if="loading && !coverInfo[item.key].length" class="overflow-hidden">
              <USkeleton v-for="i in Array(30)" class="h-4 w-[50vw] my-2" />
            </div>
            <ImageItem v-else-if="coverInfo[item.key].length > 0" v-for="i in coverInfo[item.key]" :image="i" />
            <div v-else class="overflow-hidden flex justify-center items-center w-full">
              <div class="text-center">
                <Empty class="m-auto" />
                {{ $t("cover.empty") }}
              </div>
            </div>
          </div>
        </template>
      </UTabs>
    </template>
    <template #foot>
      <UButton>
        <Icon name="bi:upload" />
      </UButton>
      <UInput v-model="search" class="w-full mx-2" size="xs" color="primary" variant="outline"
        placeholder="Search..." />
      <UButton @click="handleClick">
        <Icon name="ep:search" />
      </UButton>
    </template>
  </CoverCardFrame>
</template>