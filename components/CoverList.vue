<script setup lang="ts">
import Empty from "./icon/Empty.vue";
const { t } = useI18n();
const coverInfo = useCoverInfoStore();
const tabActive = ref(0);
const asides = reactive([
  {
    key: "coverList",
    label: t("cover.config.image"),
  },
  {
    key: "history_selected_lists",
    label: t("cover.config.history"),
  },
]);

onMounted(() => {
  coverInfo.queryCoverList();
});

const debouncedQuery = useDebounceFn(() => {
  coverInfo.coverList = [];
  coverInfo.queryCoverList();
}, 1000);

const handleClick = () => {
  debouncedQuery();
};
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
      <UTabs :items="asides" v-model="tabActive" :ui="{
        wrapper: 'h-full',
        container: 'h-[80vh] flex justify-center',
        base: 'w-full',
      }">
        <template #item="{ item }">
          <div :class="{
            'flex justify-around w-full flex-wrap': true,
            'h-full': !coverInfo[item.key].length,
            'h-auto': coverInfo[item.key].length,
            'overflow-auto scrollbar scrollbar-thin scrollbar-w-8': true,
          }">
            <div v-if="coverInfo.coverLoading && !coverInfo[item.key].length" class="overflow-hidden">
              <USkeleton v-for="i in Array(30)" class="h-4 w-[50vw] my-2" />
            </div>
            <ImageItem v-else-if="coverInfo[item.key].length > 0" v-for="i in coverInfo[item.key]" :image="i" />
            <div v-else class="overflow-hidden flex justify-center items-center w-full">
              <div class="text-center text-sm">
                <Empty class="m-auto" />
                {{ $t("cover.empty") }}
              </div>
            </div>
          </div>
        </template>
      </UTabs>
    </template>
    <template #foot>
      <template v-if="tabActive === 0">
        <UButton>
          <Icon name="bi:upload" />
        </UButton>
        <UInput v-model="coverInfo.coverSearchQuery" class="w-full mx-2" size="xs" color="primary" variant="outline"
          placeholder="Search..." />
        <UButton @click="handleClick">
          <Icon name="ep:search" />
        </UButton>
      </template>
      <template v-else>
        <UPopover class="w-full" :popper="{ placement: 'top-end' }">
          <UButton class="w-full" :ui="{ base: 'justify-center' }">
            {{ $t("cover.clear.title") }}
          </UButton>
          <template #panel="{ close }">
            <div class="p-2">{{ $t("cover.clear") }}</div>
            <div class="flex justify-evenly">
              <UButton @click="close" class="my-1">
                {{ $t("cover.clear.cancel") }}</UButton>
              <UButton @click="() => {
                  coverInfo.history_selected_lists = [];
                  close();
                }
                " class="my-1">
                {{ $t("cover.clear.confirm") }}
              </UButton>
            </div>
          </template>
        </UPopover>
      </template>
    </template>
  </CoverCardFrame>
</template>
