import { positionItems } from "~/constants/enums";

export const useCoverInfoStore = defineStore("coverInfoStore", {
  state: (): {
    iconName: string;
    iconPosition: number;
    coverTitle: string;
    coverAuthor: string;
  } => ({
    iconName: "material-symbols:adaptive-audio-mic",
    iconPosition: 2,
    coverTitle: "",
    coverAuthor: "@Ryan Co",
  }),
  getters: {
    coverIconPosition: (state) => {
      const item = positionItems[state.iconPosition];
      const iconPosition =
        state.iconPosition === 2 ? state.iconPosition : item?.percentages;
      return iconPosition;
    },
  },
  actions: {
    setIconPosition(position: number) {
      this.iconPosition = position;
    },
    // 在创建 store 时不立即初始化翻译内容，而是在需要时再获取
    initCoverInfo() {
      this.coverTitle = useI18n().t("common.cover.title");
    },
  },
});
