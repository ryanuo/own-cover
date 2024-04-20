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
    coverTitle: useI18n().t("common.cover.title"),
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
  },
});
