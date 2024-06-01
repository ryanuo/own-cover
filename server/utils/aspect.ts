import sharp from 'sharp'
import { createCanvas, loadImage } from 'canvas'
import axios from 'axios'

// 图标位置类型
type IconPosition = 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right' | 'center'

interface ImageProcessorOptions {
  aspectRatio?: string // 宽高比
  maskColor?: string // 蒙层颜色
  font?: string // 字体样式
  title?: string // 封面文字
  author?: string // 作者名称
  bg?: string // 封面背景
  icon?: string // 图标
  iconPosition?: IconPosition // 图标位置
}

class ImageProcessor {
  private aspectRatio?: string
  private maskColor?: string
  private font?: string
  private title?: string
  private author?: string
  private bg?: string
  private icon?: string
  private iconPosition?: IconPosition

  constructor({ aspectRatio, maskColor, font, title, author, bg, icon, iconPosition }: ImageProcessorOptions) {
    this.aspectRatio = aspectRatio
    this.maskColor = maskColor
    this.font = font
    this.title = title
    this.author = author
    this.bg = bg
    this.icon = icon
    this.iconPosition = iconPosition
  }

  private async fetchImage(url: string): Promise<Buffer> {
    const response = await axios.get(url, { responseType: 'arraybuffer' })
    return Buffer.from(response.data, 'binary')
  }

  public async processImage(): Promise<Buffer> {
    try {
      let bgBuffer
      if (this.bg)
        bgBuffer = await this.fetchImage(this.bg)
      // 使用 Sharp 获取图像的元数据
      const metadata = await sharp(bgBuffer).metadata()

      let width = metadata.width ?? 1080
      let height = metadata.height ?? 608

      // 创建画布
      const canvas = createCanvas(width, height)
      const ctx = canvas.getContext('2d')
      ctx.antialias = 'subpixel'
      ctx.imageSmoothingEnabled = true
      ctx.patternQuality = 'best'

      // 加载背景图片
      if (this.bg && bgBuffer) {
        const bgImg = await loadImage(bgBuffer)
        // 根据宽高比调整尺寸
        if (this.aspectRatio) {
          const [aspectWidth, aspectHeight] = this.aspectRatio.split('-').map(Number)
          const targetAspectRatio = aspectWidth / aspectHeight
          if (!Number.isNaN(aspectWidth) && !Number.isNaN(aspectHeight)) {
            const originalAspectRatio = width / height

            if (originalAspectRatio > targetAspectRatio) {
              height = height / (originalAspectRatio / targetAspectRatio)
              width = height * targetAspectRatio
            }
            else {
              width = width / (targetAspectRatio / originalAspectRatio)
              height = width / targetAspectRatio
            }
          }
        }

        ctx.drawImage(bgImg, 0, 0, width, height)
      }
      else {
        // 如果没有背景图片，则使用默认白色背景
        ctx.fillStyle = '#ffffff'
        ctx.fillRect(0, 0, width, height)
      }

      // 绘制蒙层
      if (this.maskColor) {
        ctx.fillStyle = this.maskColor
        ctx.fillRect(0, 0, width, height)
      }

      // 绘制文字
      if (this.title || this.author) {
        const fontSize = 36
        ctx.font = this.font ? this.font : `${fontSize}px Arial`
        ctx.fillStyle = 'white'
        ctx.textAlign = 'center'

        if (this.title)
          ctx.fillText(this.title, width / 2, height / 2 - fontSize)

        if (this.author) {
          ctx.font = `${fontSize / 1.5}px Arial`
          ctx.fillText(this.author, width / 2, height / 2)
        }
      }

      // 绘制图标
      if (this.icon) {
        const iconBuffer = await this.fetchImage(this.icon)
        const iconImg = await loadImage(iconBuffer)
        const iconSize = 50 // 图标大小

        let iconX = 0
        let iconY = 0

        if (this.iconPosition) {
          switch (this.iconPosition) {
            case 'top-left':
              iconX = 10
              iconY = 10
              break
            case 'top-right':
              iconX = width - iconSize - 10
              iconY = 10
              break
            case 'bottom-left':
              iconX = 10
              iconY = height - iconSize - 10
              break
            case 'bottom-right':
              iconX = width - iconSize - 10
              iconY = height - iconSize - 10
              break
            case 'center':
              iconX = width / 2 - iconSize / 2
              iconY = height / 2
              break
            default:
              iconX = width - iconSize - 10
              iconY = height - iconSize - 10
              break
          }
        }

        ctx.drawImage(iconImg, iconX, iconY, iconSize, iconSize)
      }

      // 转换画布为Buffer并返回
      const finalImageBuffer = canvas.toBuffer('image/jpeg')
      return finalImageBuffer
    }
    catch (error) {
      console.error('处理图片时出错：', error)
      throw error
    }
  }
}

export default ImageProcessor
