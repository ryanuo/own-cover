import tinycolor from 'tinycolor2'
import { aspectRatioOptions, positionItems } from '~/constants/enums'

interface CoverImage {
  id: string
  previewImg: string
  username: string
  username_avatar: string
  downLoad_path: string
  profile: string
}

interface CoverInfoStore {
  iconName: string
  iconPosition: number
  coverTitle: string
  coverAuthor: string
  coverMarkColor: string
  colorAlpha: number
  aspectRatio: any
  fontLabel: string
  fontCdn: string
  coverList: any
  previewCoverMap: CoverImage
  history_selected_lists: CoverImage[]
  coverLoading: boolean
  coverSearchQuery: string
  iconImage: string
  [key: string]: any
}

export const useCoverInfoStore = defineStore('coverInfoStore', {
  state: (): CoverInfoStore => ({
    iconName: 'material-symbols:adaptive-audio-mic',
    iconPosition: 3,
    coverTitle: 'You must work very hard to appear effortless.',
    coverAuthor: '@Ryanco',
    coverMarkColor: 'rgba(0, 0, 0, 0.3)',
    colorAlpha: 0.3,
    aspectRatio: aspectRatioOptions[2],
    fontLabel: 'ADLaM Display',
    fontCdn: 'https://fonts.googleapis.com/css?family=%s',
    coverList: [],
    previewCoverMap: {
      id: 'A-NVHPka9Rk',
      previewImg:
        'https://images.unsplash.com/photo-1494783367193-149034c05e8f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1MjUwMjd8MHwxfHNlYXJjaHwyfHxzY2VuZXJ5fGVufDB8fHx8MTcxMzYzMTM0OHww&ixlib=rb-4.0.3&q=80&w=1080',
      username: 'Diego Jimenez',
      username_avatar:
        'https://images.unsplash.com/profile-1494861451689-702b304c5c68?ixlib=rb-4.0.3&crop=faces&fit=crop&w=32&h=32',
      downLoad_path:
        'https://api.unsplash.com/photos/A-NVHPka9Rk/download?ixid=M3w1MjUwMjd8MHwxfHNlYXJjaHwyfHxzY2VuZXJ5fGVufDB8fHx8MTcxMzYzMTM0OHww',
      profile:
        'https://unsplash.com/@diegojimenez?utm_source=https://picprose.net&utm_medium=referral',
    },
    history_selected_lists: [],
    coverLoading: false,
    coverSearchQuery: 'simple',
    iconImage: '',
  }),
  getters: {
    coverIconPosition: (state) => {
      const item = positionItems[state.iconPosition]
      const iconPosition
        = state.iconPosition === 2 ? state.iconPosition : item?.percentages
      return iconPosition
    },
    getCoverList: () => {
      return useUnsplash()
    },
    customAspectRatio: (state) => {
      return {
        left: state.aspectRatio.value.split(' / ')[0] ?? 1,
        right: state.aspectRatio.value.split(' / ')[1] ?? 1,
      }
    },
  },
  actions: {
    setIconPosition(position: number) {
      this.iconPosition = position
    },
    setColorAlpha(str: string) {
      this.coverMarkColor = str
      this.colorAlpha = tinycolor(str).getAlpha().toFixed(2)
    },
    setCoverMarkColor(e: number) {
      const color = tinycolor(this.coverMarkColor)
      this.coverMarkColor = color.setAlpha(e).toString()
    },
    setCoverList(list: any[]) {
      this.coverList = list
    },
    setCoverTitle(title: string) {
      this.coverTitle = title
    },
    setCoverImage(img: CoverImage) {
      this.previewCoverMap = img
    },
    setHistorySelected(img: CoverImage) {
      if (this.history_selected_lists.some(item => item.id === img.id))
        return

      this.history_selected_lists.unshift(img)
    },
    queryCoverList() {
      this.coverLoading = true
      this.getCoverList.search
        .getPhotos({
          query: this.coverSearchQuery,
          page: 1,
          perPage: 30,
        })
        .then((result) => {
          this.setCoverList(result?.response?.results?.map(item => ({
            ...item,
            src: item.urls.small,
          })) || [])
        })
        .finally(() => {
          setTimeout(() => {
            this.coverLoading = false
          })
        })
    },
    setCoverImgMap(image: any) {
      const img = {
        id: image.id,
        previewImg: image.urls.regular,
        username: image.user.name,
        username_avatar: image.user.profile_image?.small,
        profile: `${image.user.links.html}?utm_source=https://picprose.net&utm_medium=referral`,
        downLoad_path: image.links.download_location,
      }
      this.setCoverImage(img)
      this.setHistorySelected(image)
    },
    setAspectRatioCustom(params: { left?: number, right?: number }) {
      const aspectRatio = this.aspectRatio.value.split(' / ')
      const leftVal = params.left ?? aspectRatio[0]
      const rightVal = params.right ?? aspectRatio[1]
      this.aspectRatio.value = `${leftVal} / ${rightVal}`
    },
  },
  persist: process.client && {
    storage: localStorage,
  },
})
