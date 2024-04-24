<script setup lang="ts">
interface AsyncData<T> {
  data: T | null;
  execute: () => Promise<void>;
  pending: Ref<boolean>;
}

import domToImg from "dom-to-image";
import PickColors from "vue-pick-colors";
import {
  aspectRatioOptions,
  pickerPreColors,
  positionItems,
} from "~/constants/enums";

const config = useRuntimeConfig();
const coverInfoStore = useCoverInfoStore();
const imgPre = ref<string>("");
const isOpenPreview = ref(false);
const iconPI = ref(2);
const textTitle = ref("You must work very hard to app1212ear effortless.");

const colorAlpha = ref(0.3);
const aspectRatio = ref();
onMounted(() => {
  nextTick(() => {
    iconPI.value = coverInfoStore.iconPosition;
    textTitle.value = coverInfoStore.coverTitle;
    colorAlpha.value = coverInfoStore.colorAlpha;
    aspectRatio.value = coverInfoStore.aspectRatio;
  });
});

const reset = () => {
  coverInfoStore.$reset();
  coverInfoStore.queryCoverList();
};

const generateCover = async () => {
  const ele = document.getElementById("cover-preview-generate");
  domToImg.toPng(ele).then((dataUrl: string) => {
    imgPre.value = dataUrl;
    isOpenPreview.value = true;
  });
};

const formatted = useDateFormat(useNow(), "YYYY-MM-DD-HH-mm-ss");
function downloadImage() {
  const link = document.createElement("a");
  link.href = imgPre.value;
  link.download = formatted.value + ".png";
  document.body.appendChild(link); // 添加到文档以确保能够被点击
  link.click();
  document.body.removeChild(link);
}

const openIconUrl = (url: string) => window.open(url);
</script>
<template>
  <CoverCardFrame>
    <template #head>
      <h2 class="font-bold">{{ $t("common.Attribute", "Attribute") }}</h2>
      <Icon
        class="cursor-pointer hover:scale-125"
        name="zmdi:github"
        @click="openIconUrl('https://github.com/rr210/own-cover/')"
      />
    </template>
    <template #default>
      <div class="flex flex-col gap-5 p-1">
        <UDivider :label="$t('config.aspect', 'Aspect Ratio')" />
        <USelectMenu
          selected-icon="i-heroicons-hand-thumb-up-solid"
          :uiMenu="{
            select: 'cursor-pointer',
            option: {
              base: 'cursor-pointer',
            },
          }"
          class="w-full"
          @change="(val: any) => {
          coverInfoStore.aspectRatio = val;
        }"
          v-model="aspectRatio"
          :options="aspectRatioOptions"
        />

        <UDivider :label="$t('config.mask', 'Mask Layer')" />
        <div class="flex justify-between items-center gap-2 relative">
          <URange
            :step="0.05"
            size="xs"
            v-model="colorAlpha"
            @change="(e: number) => {
            coverInfoStore.setCoverMarkColor(e)
          }"
            :min="0"
            :max="1"
          />
          <pick-colors
            :colors="pickerPreColors"
            class="cursor-pointer"
            :value="coverInfoStore.coverMarkColor"
            @change="($event: any) => {
            coverInfoStore.coverMarkColor = $event;
            coverInfoStore.setColorAlpha();
          }
            "
            show-alpha
          />
        </div>

        <UDivider :label="$t('config.font', 'Font')" />

        <UInput
          v-model="coverInfoStore.fontCdn"
          @change="coverInfoStore.fontCdn = $event"
        />
        <UInput
          v-model="coverInfoStore.fontLabel"
          @change="coverInfoStore.fontLabel = $event"
        />

        <UDivider :label="$t('config.text', 'Text')" />
        <UTextarea
          v-model="textTitle"
          @input="(e: any) => {
          coverInfoStore.setCoverTitle(e.target.value as string)
        }"
        />
        <UInput v-model="coverInfoStore.coverAuthor" />

        <UDivider :label="$t('config.icon', 'Icon')" />
        <UTabs
          :items="positionItems"
          @change="coverInfoStore.setIconPosition"
          v-model="iconPI"
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
        <div>
          <UInput
            v-model="coverInfoStore.iconName"
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
                v-show="coverInfoStore.iconName !== ''"
                color="gray"
                variant="link"
                icon="i-heroicons-x-mark-20-solid"
                :padded="false"
                @click="coverInfoStore.iconName = ''"
              />
            </template>
          </UInput>
        </div>
      </div>
    </template>
    <template #foot>
      <UButton @click="reset">{{
        $t("cover.config.reset.attribute", "Reset Attribute")
      }}</UButton>
      <UButton @click="generateCover">{{
        $t("cover.config.generate", "Generate Cover")
      }}</UButton>
    </template>
  </CoverCardFrame>
  <UModal v-model="isOpenPreview" class="relative">
    <div class="group/item">
      <img :src="imgPre" class="select-none" />
      <Icon
        size="20"
        name="grommet-icons:download"
        @click="downloadImage"
        class="hover:scale-110 absolute right-2 top-2 text-stone-50 invisible group-hover/item:visible cursor-pointer"
      />
    </div>
  </UModal>
</template>
