import tinycolor from "tinycolor2";
import { aspectRatioOptions, positionItems } from "~/constants/enums";

type CoverImage = {
  id: string;
  previewImg: string;
  username: string;
  username_avatar: string;
  downLoad_path: string;
  profile: string;
};

interface CoverInfoStore {
  iconName: string;
  iconPosition: number;
  coverTitle: string;
  coverAuthor: string;
  coverMarkColor: string;
  colorAlpha: number;
  aspectRatio: any;
  font: {
    label: string;
    value: string;
    files?: Record<string, string>;
  };
  coverList: any;
  previewCoverMap: CoverImage;
  history_selected_lists: CoverImage[];
  coverLoading: boolean;
  coverSearchQuery: string;
  [key: string]: any;
}

export const useCoverInfoStore = defineStore("coverInfoStore", {
  state: (): CoverInfoStore => ({
    iconName: "material-symbols:adaptive-audio-mic",
    iconPosition: 3,
    coverTitle: "You must work very hard to appear effortless.",
    coverAuthor: "@Ryanco",
    coverMarkColor: "rgba(0, 0, 0, 0.3)",
    colorAlpha: 0.3,
    aspectRatio: aspectRatioOptions[2],
    font: {
      label: "ADLaM Display",
      value:
        "https://fonts.gstatic.com/s/adlamdisplay/v1/KFOhCnGXkPOLlhx6jD8_b1ZEOsDSlQ.ttf",
      files: {
        regular:
          "https://fonts.gstatic.com/s/adlamdisplay/v1/KFOhCnGXkPOLlhx6jD8_b1ZECsHYkYBPY3o.ttf",
      },
    },
    coverList: [],
    previewCoverMap: {
      id: "A-NVHPka9Rk",
      previewImg:
        "https://images.unsplash.com/photo-1494783367193-149034c05e8f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1MjUwMjd8MHwxfHNlYXJjaHwyfHxzY2VuZXJ5fGVufDB8fHx8MTcxMzYzMTM0OHww&ixlib=rb-4.0.3&q=80&w=1080",
      username: "Diego Jimenez",
      username_avatar:
        "https://images.unsplash.com/profile-1494861451689-702b304c5c68?ixlib=rb-4.0.3&crop=faces&fit=crop&w=32&h=32",
      downLoad_path:
        "https://api.unsplash.com/photos/A-NVHPka9Rk/download?ixid=M3w1MjUwMjd8MHwxfHNlYXJjaHwyfHxzY2VuZXJ5fGVufDB8fHx8MTcxMzYzMTM0OHww",
      profile:
        "https://unsplash.com/@diegojimenez?utm_source=https://picprose.net&utm_medium=referral",
    },
    history_selected_lists: [],
    coverLoading: false,
    coverSearchQuery: "simple",
  }),
  getters: {
    coverIconPosition: (state) => {
      const item = positionItems[state.iconPosition];
      const iconPosition =
        state.iconPosition === 2 ? state.iconPosition : item?.percentages;
      return iconPosition;
    },
    getCoverList: () => {
      return useUnsplash();
    },
  },
  actions: {
    setIconPosition(position: number) {
      this.iconPosition = position;
    },
    setColorAlpha() {
      this.colorAlpha = tinycolor(this.coverMarkColor).getAlpha().toFixed(2);
    },
    setCoverMarkColor(e: number) {
      const color = tinycolor(this.coverMarkColor);
      this.coverMarkColor = color.setAlpha(e).toString();
    },
    setCoverList(list: any[]) {
      this.coverList = list;
    },
    setCoverTitle(title: string) {
      this.coverTitle = title;
    },
    setCoverImage(img: CoverImage) {
      this.previewCoverMap = img;
    },
    setHistorySelected(img: CoverImage) {
      if (this.history_selected_lists.some((item) => item.id === img.id)) {
        return;
      }
      this.history_selected_lists.unshift(img);
    },
    queryCoverList() {
      const that = this;
      this.coverLoading = true;
      that.getCoverList.search
        .getPhotos({
          query: that.coverSearchQuery,
          page: 1,
          perPage: 30,
        })
        .then((result) => {
          that.setCoverList(result?.response?.results || []);
        })
        .finally(() => {
          setTimeout(() => {
            this.coverLoading = false;
          });
        });
    },
  },
  persist: process.client && {
    storage: localStorage,
  },
});
