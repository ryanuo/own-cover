<script setup lang="ts">
interface Option {
  options: { label: string, value: string, [key: string]: any }[]
  pending?: boolean
}
const props = defineProps < Option > ();

const showDropdown = ref(false);
const options_list = computed(() => props.options ?? [])
const { list, containerProps, wrapperProps }: any = useVirtualList(
  options_list,
  {
    itemHeight: 22,
  },
)

const handleBlur = () => {
  setTimeout(() => {
    showDropdown.value = false;
  }, 50);
}

</script>

<template>
  <div class="relative">
    <UInput @focus="showDropdown = true" @blur="handleBlur" :loading="pending"
      icon="i-heroicons-magnifying-glass-20-solid" placeholder="Searching..." />
    <div v-bind="containerProps" v-show="showDropdown"
      class="h-[150px] mt-1 absolute w-full top-9 rounded-md shadow-lg z-10 scrollbar scrollbar-thin scrollbar-w-8 overflow-y-auto">
      <div v-bind="wrapperProps">
        <div v-for="item in list"
          class="flex text-xs items-center mx-1 rounded-sm cursor-pointer hover:bg-gray-200 select-none p-1.5"
          :key="item.index" :data-value="item.data.value" style="height: calc(22px + 0.375rem);">
          {{ item.data.label }}
        </div>
      </div>
    </div>
  </div>
</template>
