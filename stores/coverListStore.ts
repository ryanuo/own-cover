// coverListStore.js
import type { Basic } from 'unsplash-js/dist/methods/users/types'
import type { CoverImage } from './type'
import { previewImageMap } from '~/constants/enums'

interface ListState {
  coverList: Basic[]
  page: number
  pageSize: number
  total: number
  total_pages: number
  coverSearchQuery: string
  coverLoading: boolean
  history_selected_lists: CoverImage[]
  previewCoverMap: CoverImage // 初始化为一个空对象或具体类型
  [key: string]: any
}
export const useCoverListStore = defineStore('coverList', {
  state: (): ListState => ({
    coverList: [] as Basic[],
    page: 1,
    pageSize: 30,
    total: 0,
    total_pages: 0,
    coverSearchQuery: 'simple',
    coverLoading: false,
    history_selected_lists: [] as CoverImage[],
    previewCoverMap: previewImageMap, // 初始化为一个空对象或具体类型
  }),

  actions: {
    async queryCoverList(callback?: () => void) {
      try {
        const result: any = await $fetch('/covers', {
          method: 'GET',
          query: {
            query: this.coverSearchQuery,
            page: this.page,
            per_page: this.pageSize,
          },
        })

        if (result.type === 'success') {
          this.setCoverList([...this.coverList, ...(result.response.results.map((item: any) => ({ ...item, src: item.urls.small })) || [])])
          this.total = result.response.total
          this.total_pages = result.response.total_pages
        }
      }
      finally {
        callback?.()
      }
    },

    scrollQueryCoverList(callback: () => void) {
      this.page++
      if (this.page <= this.total_pages)
        this.queryCoverList()
      else
        callback()
    },

    buttomQueryCoverList() {
      this.coverList = []
      this.page = 1
      this.coverLoading = true
      this.queryCoverList(() => {
        setTimeout(() => {
          this.coverLoading = false
        })
      })
    },
    setCoverList(list: any[]) {
      this.coverList = list
    },
    setCoverImage(img: CoverImage) {
      this.previewCoverMap = img
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
      this.addToHistorySelected(image)
    },
    addToHistorySelected(img: CoverImage) {
      if (this.history_selected_lists.some(item => item.id === img.id))
        return

      this.history_selected_lists.unshift(img)
    },
  },

  persist: process.client && {
    storage: localStorage,
  },
})
