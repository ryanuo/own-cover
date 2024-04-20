<script setup lang="ts">
import { positionItems } from '@/constants/enums';

interface AsyncData<T> {
  data: T | null;
  execute: () => Promise<void>;
  pending: Ref<boolean>
}

const config = useRuntimeConfig()

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
        }
      })
    }
  }
)

onMounted(() => {
  execute()
})

</script>
<template>
  <CoverCardFrame>
    <template #head>
      <h2 class="font-bold">{{ $t("common.Attribute", '属性') }}</h2>
    </template>
    <template #default>
      <div class="flex flex-col gap-2 p-1">
        <URange :step="5" />
        <UTabs :items="positionItems" :default-index="2">
          <template #default="{ item }">
            <div class="flex items-center gap-2 relative truncate">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 512 512">
                <!-- 原始的矩形块路径 -->
                <path fill="currentColor"
                  d="M139.6 46.5h93.1V0h-93.1zM46.5 418.9H0V512h93.1v-46.5H46.5zm93.1 93.1h93.1v-46.5h-93.1zM46.5 279.3H0v93.1h46.5zm0-139.7H0v93.1h46.5zM0 93.1h46.5V46.5H93V0H0zm465.5 139.6H512v-93.1h-46.5zM279.3 512h93.1v-46.5h-93.1zM418.9 0v46.5h46.5V93H512V0zm46.6 372.4H512v-93.1h-46.5zm0 93.1H419V512h93v-93.1h-46.5zm-186.2-419h93.1V0h-93.1z" />
                <!-- 上左 -->
                <circle :cx="item.position[0]" :cy="item.position[1]" r="40" fill="currentColor" />
              </svg>
            </div>
          </template>
        </UTabs>
        <SelectOption :options="data" :pending="pending" />
      </div>
    </template>
  </CoverCardFrame>
</template>