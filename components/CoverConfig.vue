<script setup lang="ts">
interface AsyncData<T> {
  data: T | null;
  execute: () => Promise<void>;
  pending: Ref<boolean>
}
import PickColors from 'vue-pick-colors';
import { aspectRatioOptions, pickerPreColors, positionItems } from '~/constants/enums';

const config = useRuntimeConfig()
const coverInfoStore = useCoverInfoStore()
const { data, execute, pending }: AsyncData<any> = await useAsyncData(
  'mountains',
  () => $fetch(`https://www.googleapis.com/webfonts/v1/webfonts?key=${config?.public.fontapikey}`),
  {
    immediate: false,
    transform(res: any) {
      return res.items?.map((item: any) => {
        return {
          label: item.family,
          value: item.menu,
          files: item.files
        }
      })
    }
  }
)

onMounted(() => {
  execute()
  coverInfoStore.initCoverInfo()
})

const openIconSearch = () => {
  window.open('https://yesicon.app/')
}
</script>
<template>
  <CoverCardFrame>
    <template #head>
      <h2 class="font-bold">{{ $t("common.Attribute", '属性') }}</h2>
    </template>
    <template #default>
      <div class="flex flex-col gap-5 p-1">
        <UDivider :label='$t("config.aspect")' />
        <USelectMenu selected-icon="i-heroicons-hand-thumb-up-solid" class="w-full" @change="(e: any) => {
          coverInfoStore.aspectRatio = e;
        }" v-model="coverInfoStore.aspectRatio" :options="aspectRatioOptions" />

        <UDivider :label="$t('config.mask')" />
        <div class="flex justify-between items-center gap-2 relative">
          <URange :step="0.05" size="xs" v-model="coverInfoStore.colorAlpha" @change="(e: number) => {
            coverInfoStore.setCoverMarkColor(e)
          }" :min="0" :max="1" />
          <pick-colors :colors="pickerPreColors" class="cursor-pointer" :value="coverInfoStore.coverMarkColor" @change="($event) => {
            coverInfoStore.coverMarkColor = $event
            coverInfoStore.setColorAlpha()
          }" show-alpha />
        </div>

        <UDivider :label="$t('config.font')" />
        <SelectOption :options="data" :pending="pending" v-model:model-value="coverInfoStore.font" />

        <UDivider :label="$t('config.text')" />
        <UTextarea v-model="coverInfoStore.coverTitle" />
        <UInput v-model="coverInfoStore.coverAuthor" />

        <UDivider :label="$t('config.icon')" />
        <UTabs :items="positionItems" @change="coverInfoStore.setIconPosition" v-model="coverInfoStore.iconPosition">
          <template #default="{ item }">
            <div class="flex items-center gap-2 relative truncate">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 512 512">
                <path fill="currentColor"
                  d="M139.6 46.5h93.1V0h-93.1zM46.5 418.9H0V512h93.1v-46.5H46.5zm93.1 93.1h93.1v-46.5h-93.1zM46.5 279.3H0v93.1h46.5zm0-139.7H0v93.1h46.5zM0 93.1h46.5V46.5H93V0H0zm465.5 139.6H512v-93.1h-46.5zM279.3 512h93.1v-46.5h-93.1zM418.9 0v46.5h46.5V93H512V0zm46.6 372.4H512v-93.1h-46.5zm0 93.1H419V512h93v-93.1h-46.5zm-186.2-419h93.1V0h-93.1z" />
                <circle :cx="item.position[0]" :cy="item.position[1]" r="40" fill="currentColor" />
              </svg>
            </div>
          </template>
        </UTabs>
        <UInput v-model="coverInfoStore.iconName"
          :ui="{ icon: { leading: { pointer: '' }, trailing: { pointer: '' } } }">
          <template #leading>
            <UTooltip class="cursor-pointer hover:scale-110" :popper="{ offsetDistance: 16 }" :ui="{ base: 'h-100' }">
              <template #text>
                <div class="w-28 text-wrap h-auto">{{ $t('common.icon.search', '点击跳转yesicon搜索icon') }}</div>
              </template>
              <Icon name="codicon:go-to-search" @click="openIconSearch" />
            </UTooltip>
          </template>
          <template #trailing>
            <UButton v-show="coverInfoStore.iconName !== ''" color="gray" variant="link"
              icon="i-heroicons-x-mark-20-solid" :padded="false" @click="coverInfoStore.iconName = ''" />
          </template>
        </UInput>
      </div>
    </template>
  </CoverCardFrame>
</template>