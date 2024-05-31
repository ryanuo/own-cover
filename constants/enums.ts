import tinycolor from 'tinycolor2'

export const positionItems = [
  {
    key: 'lt',
    content: '',
    label: '',
    position: [120, 120],
    percentages: {
      top: '5%',
      left: '5%',
    },
  },
  {
    key: 'lb',
    content: '',
    label: '',
    position: [120, 392],
    percentages: {
      bottom: '5%',
      left: '5%',
    },
  },

  {
    key: 'c',
    content: '',
    label: '',
    position: [256, 256],
  },

  {
    key: 'rb',
    content: '',
    label: '',
    position: [392, 392],
    percentages: {
      bottom: '5%',
      right: '5%',
    },
  },
  {
    key: 'rt',
    content: '',
    label: '',
    position: [392, 120],
    percentages: {
      top: '5%',
      right: '5%',
    },
  },
]

export const aspectRatioOptions = [
  {
    label: 'Landscape screen',
    value: '4 / 3',
    disabled: true,
  },
  {
    label: '1 : 1',
    value: '1 / 1',
  },
  {
    label: '16 : 9',
    value: '16 / 9',
  },
  {
    label: '4 : 3',
    value: '4 / 3',
  },
  {
    label: '2 : 1',
    value: '2 / 1',
  },
  {
    label: '3 : 2',
    value: '3 / 2',
  },
  {
    label: 'Vertical screen',
    value: '-',
    disabled: true,
  },
  {
    label: '9 : 16',
    value: '9 / 16',
  },
  {
    label: '1 : 2',
    value: '1 / 2',
  },
  {
    label: '2 : 3',
    value: '2 / 3',
  },
  {
    label: '3 : 4',
    value: '3 / 4',
  },
  {
    label: 'Customize',
    value: '1 / 1',
  },
]

export const pickerPreColors = [
  '#000',
  '#ff4500',
  '#ff8c00',
  '#ffd700',
  '#90ee90',
  '#00ced1',
  '#1e90ff',
  '#c71585',
  '#ff4500',
  '#ff7800',
  '#00babd',
  '#1f93ff',
  '#fa64c3',
].map((item) => {
  return tinycolor(item).setAlpha(0.2).toString()
})

export const previewImageMap = {
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
}
