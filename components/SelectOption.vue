<script setup lang="ts">
type ItemOption = { label: string, value: string, [key: string]: any }
interface Option {
  options: ItemOption[]
  pending?: boolean
  modelValue?: ItemOption
}

const emit = defineEmits(['update:modelValue']); // 引入 emit 方法
const props = defineProps < Option > ();
const currentValue = ref(props.modelValue); // 内部状态，用于存储当前选择的值
const showDropdown = ref(false);

const options_list = computed(() => {
  if (currentValue.value?.label) {
    return props?.options?.filter(option => option?.label === currentValue.value?.label) || []
  }
  return props?.options ?? []
})

const { list, containerProps, wrapperProps }: any = useVirtualList(
  options_list,
  {
    itemHeight: 28,
  },
)

// 监听父组件传递的 value 变化
watch(() => props.modelValue, (newValue) => {
  currentValue.value = newValue;
});

const handleBlur = () => {
  setTimeout(() => {
    showDropdown.value = false;
  }, 150);
}

const handleOptionClick = (value: ItemOption) => {
  emit('update:modelValue', value); // 触发 update:modelValue 事件，通知父组件值的变化
  handleBlur()
}

const handleInputChange = (event: any) => {
  const inputValue = (event.target as HTMLInputElement).value;
  const val = {
    label: inputValue,
    value: ''
  }
  currentValue.value = val
  emit('update:modelValue', val);
}

</script>

<template>
  <div class="relative">
    <UInput class="select-option" @focus="showDropdown = true" @blur="handleBlur" :value="currentValue?.label"
      @input="handleInputChange" :loading="pending" :ui="{ icon: { trailing: { pointer: '' } } }"
      icon="i-heroicons-magnifying-glass-20-solid" placeholder="Searching...">
      <template #trailing>
        <UButton v-show="currentValue?.label !== ''" color="gray" variant="link" icon="i-heroicons-x-mark-20-solid"
          :padded="false" @click="handleInputChange({ target: { value: '' } })" />
      </template>
    </UInput>
    <div v-bind="containerProps" v-show="showDropdown"
      class="max-h-[150px] mt-1 absolute w-full top-9 rounded-md shadow-lg z-10 scrollbar scrollbar-thin scrollbar-w-8 overflow-y-auto bg-white">
      <div v-bind="wrapperProps">
        <div v-for="item in list" @click="handleOptionClick(item.data)"
          class="flex text-xs items-center mx-1 rounded-sm cursor-pointer hover:bg-gray-200 select-none p-1.5"
          :key="item.index" :data-value="item.data.value" style="height: calc(22px + 0.375rem);">
          {{ item.data.label }}
        </div>
      </div>
    </div>
  </div>
</template>
