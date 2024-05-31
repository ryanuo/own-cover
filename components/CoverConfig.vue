<script setup lang="ts">
import domToImg from 'dom-to-image'
import PickColors from 'vue-pick-colors'
import {
  aspectRatioOptions,
  pickerPreColors,
  positionItems,
} from '~/constants/enums'

const coverConfigStore = useCoverConfigStore()
const coverListStore = useCoverListStore()
const imgPre = ref<string>('')
const isOpenPreview = ref(false)
const iconPI = ref(2)
const textTitle = ref('You must work very hard to app1212ear effortless.')
const formatted = useDateFormat(useNow(), 'YYYY-MM-DD-HH-mm-ss')

const colorAlpha = ref(0.3)
const aspectRatio = ref()
onMounted(() => {
  nextTick(() => {
    iconPI.value = coverConfigStore.iconPosition
    textTitle.value = coverConfigStore.coverTitle
    colorAlpha.value = coverConfigStore.colorAlpha
    aspectRatio.value = coverConfigStore.aspectRatio
  })
})

function reset() {
  coverConfigStore.$reset()
  coverListStore.buttomQueryCoverList()
}

function downloadImage() {
  const link = document.createElement('a')
  link.href = imgPre.value
  link.download = `${formatted.value}.png`
  document.body.appendChild(link) // 添加到文档以确保能够被点击
  link.click()
  document.body.removeChild(link)
}

async function generateCover() {
  isOpenPreview.value = true

  const ele = document.getElementById('cover-preview-generate')
  domToImg
    .toPng(ele)
    .then((dataUrl: string) => {
      imgPre.value = dataUrl
      downloadImage()
    })
    .finally(() => {
      isOpenPreview.value = false
      imgPre.value = ''
    })
}

watch(isOpenPreview, () => {
  if (!isOpenPreview.value)
    imgPre.value = ''
})

watchDeep(
  () => [coverConfigStore.colorAlpha],
  () => {
    colorAlpha.value = coverConfigStore.colorAlpha
  },
)

watch(
  () => coverConfigStore.iconName,
  (newVal) => {
    if (newVal !== '') {
      coverConfigStore.iconName = newVal
      coverConfigStore.iconImage = ''
    }
  },
)

const openIconUrl = (url: string) => window.open(url)

function onFileChange(e: Event) {
  const files = (e.target as HTMLInputElement).files
  if (files && files.length > 0) {
    const file = files[0]
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = (e) => {
      const result = e.target?.result
      if (result && typeof result === 'string') {
        coverConfigStore.iconImage = result
        coverConfigStore.iconName = ''
      }
    }
  }
}
</script>

<template>
  <CoverCardFrame>
    <template #head>
      <h2 class="font-bold">
        {{ $t("common.Attribute", "Attribute") }}
      </h2>
      <Icon
        class="cursor-pointer hover:scale-125"
        name="zmdi:github"
        @click="openIconUrl('https://github.com/rr210/own-cover/')"
      />
    </template>
    <template #default>
      <div
        class="flex flex-col gap-5 p-1 overflow-auto h-full scrollbar scrollbar-thin scrollbar-w-8"
      >
        <UDivider :label="$t('config.aspect', 'Aspect Ratio')" />
        <USelectMenu
          v-model="aspectRatio"
          selected-icon="i-heroicons-hand-thumb-up-solid"
          :ui-menu="{
            select: 'cursor-pointer',
            option: {
              base: 'cursor-pointer',
            },
          }"
          class="w-full"
          :options="aspectRatioOptions"
          @change="(val: any) => {
            coverConfigStore.aspectRatio = val;
          }"
        />

        <div
          v-if="aspectRatio?.label === 'Customize'"
          class="flex justify-between items-center gap-2"
        >
          <UInput
            v-model="coverConfigStore.customAspectRatio.left"
            type="number"
            size="sm"
            @change="(val: number) => {
              coverConfigStore.setAspectRatioCustom({
                left: val,
              });
            }"
          />
          /
          <UInput
            v-model="coverConfigStore.customAspectRatio.right"
            type="number"
            size="sm"
            @change="(val: number) => {
              coverConfigStore.setAspectRatioCustom({
                right: val,
              });
            }"
          />
        </div>

        <UDivider :label="$t('config.mask', 'Mask Layer')" />
        <div class="flex justify-between items-center gap-2 relative">
          <URange
            v-model="colorAlpha"
            :step="0.05"
            size="xs"
            :min="0"
            :max="1"
            @change="(e: number) => {
              coverConfigStore.setCoverMarkColor(e)
            }"
          />
          <PickColors
            :colors="pickerPreColors"
            class="cursor-pointer"
            :value="coverConfigStore.coverMarkColor"
            show-alpha
            @change="($event: any) => {
              coverConfigStore.setColorAlpha($event);
            }
            "
          />
        </div>

        <UDivider :label="$t('config.font', 'Font')" />

        <UInput
          v-model="coverConfigStore.fontCdn"
          @change="coverConfigStore.fontCdn = $event"
        />
        <UInput
          v-model="coverConfigStore.fontLabel"
          @change="coverConfigStore.fontLabel = $event"
        />

        <UDivider :label="$t('config.text', 'Text')" />
        <UTextarea
          v-model="textTitle"
          @input="(e: any) => {
            coverConfigStore.setCoverTitle(e.target.value as string)
          }"
        />
        <UInput v-model="coverConfigStore.coverAuthor" />

        <UDivider :label="$t('config.icon', 'Icon')" />
        <UTabs
          v-model="iconPI"
          :items="positionItems"
          @change="coverConfigStore.setIconPosition"
        >
          <template #default="{ item }">
            <div class="flex items-center gap-2 relative truncate">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 512 512"
              >
                <path
                  fill="currentColor"
                  d="M139.6 46.5h93.1V0h-93.1zM46.5 418.9H0V512h93.1v-46.5H46.5zm93.1 93.1h93.1v-46.5h-93.1zM46.5 279.3H0v93.1h46.5zm0-139.7H0v93.1h46.5zM0 93.1h46.5V46.5H93V0H0zm465.5 139.6H512v-93.1h-46.5zM279.3 512h93.1v-46.5h-93.1zM418.9 0v46.5h46.5V93H512V0zm46.6 372.4H512v-93.1h-46.5zm0 93.1H419V512h93v-93.1h-46.5zm-186.2-419h93.1V0h-93.1z"
                />
                <circle
                  :cx="item.position[0]"
                  :cy="item.position[1]"
                  r="40"
                  fill="currentColor"
                />
              </svg>
            </div>
          </template>
        </UTabs>
        <div class="flex items-center gap-1 justify-between">
          <UInput
            v-model="coverConfigStore.iconName"
            class="w-full"
            :ui="{
              icon: { leading: { pointer: '' }, trailing: { pointer: '' } },
            }"
          >
            <template #leading>
              <Icon
                class="cursor-pointer hover:scale-110"
                name="codicon:go-to-search"
                @click="openIconUrl('https://yesicon.app')"
              />
            </template>
            <template #trailing>
              <UButton
                v-show="coverConfigStore.iconName !== ''"
                color="gray"
                variant="link"
                icon="i-heroicons-x-mark-20-solid"
                :padded="false"
                @click="coverConfigStore.iconName = ''"
              />
            </template>
          </UInput>
          <UButton class="relative">
            <Icon name="bi:upload" />
            <input
              type="file"
              value=""
              class="absolute w-full h-full opacity-0 top-0 left-0 cursor-pointer text-[0px]"
              :multiple="false"
              accept=".png,.jpg,.jpeg"
              @change="onFileChange"
            >
          </UButton>
        </div>
      </div>
    </template>
    <template #foot>
      <UButton @click="reset">
        {{
          $t("cover.config.reset.attribute", "Reset Attribute")
        }}
      </UButton>
      <UButton @click="generateCover">
        {{
          $t("cover.config.generate", "Generate Cover")
        }}
      </UButton>
    </template>
  </CoverCardFrame>
  <UModal v-model="isOpenPreview" class="relative">
    <div class="group/item">
      <img v-if="imgPre" :src="imgPre" class="select-none">
      <template v-else-if="!imgPre && isOpenPreview">
        <div class="text-center m-5">
          <Icon name="line-md:loading-twotone-loop" />
          {{ $t("cover.config.loading", "Cover Generating, please wait....") }}
        </div>
      </template>
      <Icon
        size="20"
        name="grommet-icons:download"
        class="hover:scale-110 absolute right-2 top-2 text-stone-50 invisible group-hover/item:visible cursor-pointer"
        @click="downloadImage"
      />
    </div>
  </UModal>
</template>
