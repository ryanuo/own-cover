// coverConfigStore.js
import tinycolor from 'tinycolor2'
import { aspectRatioOptions, positionItems } from '~/constants/enums'

export const useCoverConfigStore = defineStore('coverConfig', {
  state: () => ({
    iconName: 'material-symbols:adaptive-audio-mic',
    iconPosition: 3,
    coverTitle: 'You must work very hard to appear effortless.',
    coverAuthor: '@Ryanco',
    coverMarkColor: 'rgba(0, 0, 0, 0.3)',
    colorAlpha: 0.3,
    aspectRatio: aspectRatioOptions[2],
    fontLabel: 'ADLaM Display',
    fontCdn: 'https://fonts.googleapis.com/css?family=%s',
    iconImage: '',
  }),

  getters: {
    coverIconPosition(state) {
      const item = positionItems[state.iconPosition]
      const iconPosition
        = state.iconPosition === 2 ? state.iconPosition : item?.percentages
      return iconPosition
    },
    customAspectRatio(state) {
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
    setCoverTitle(title: string) {
      this.coverTitle = title
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
