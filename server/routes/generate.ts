import ImageProcessor from '../utils/aspect'

export default defineEventHandler(async () => {
  const gen = new ImageProcessor(
    {
      aspectRatio: '16-9',
      maskColor: 'rgba(0,0,0,0.3)',
      font: '36px Arial',
      title: 'You must work very hard to appear effortless.',
      author: '@Ryanuo',
      bg: 'https://images.unsplash.com/photo-1622547748225-3fc4abd2cca0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1OTE5MjN8MHwxfHNlYXJjaHw4fHxzaW1wbGV8ZW58MHx8fHwxNzE3MTE4MzAzfDA&ixlib=rb-4.0.3&q=80&w=1080',
      // icon: 'https://cdn.jsdelivr.net/gh/Ryanuo/CDN/img/icon.png',
      iconPosition: 'top-left',
    },
  )
  return await gen.processImage()
})
