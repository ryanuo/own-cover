import sharp from 'sharp'
import { createCanvas, loadImage } from 'canvas'
import axios from 'axios'

// 图标位置类型
type IconPosition = 'topLeft' | 'topRight' | 'bottomLeft' | 'bottomRight' | 'center'

interface ImageProcessorOptions {
  imageUrl: string
  descriptionText: string
  authorName: string
  iconUrl: string
  iconPosition?: IconPosition // 图标位置，可选，默认值为 'bottomRight'
}

class ImageProcessor {
  private imageUrl: string
  private descriptionText: string
  private authorName: string
  private iconUrl: string
  private iconPosition: IconPosition

  constructor({ imageUrl, descriptionText, authorName, iconUrl, iconPosition = 'bottomRight' }: ImageProcessorOptions) {
    this.imageUrl = imageUrl
    this.descriptionText = descriptionText
    this.authorName = authorName
    this.iconUrl = iconUrl
    this.iconPosition = iconPosition
  }

  private async fetchImage(url: string): Promise<Buffer> {
    const response = await axios.get(url, { responseType: 'arraybuffer' })
    return Buffer.from(response.data, 'binary')
  }

  public async processImage(): Promise<Buffer> {
    try {
      // 获取远程图片数据
      const imageBuffer = await this.fetchImage(this.imageUrl)
      const iconBuffer = this.iconUrl && await this.fetchImage(this.iconUrl)

      // 使用 sharp 获取图像元数据
      const imageMetadata = await sharp(imageBuffer).metadata()
      const { width = 0, height = 0 } = imageMetadata

      // 使用 node-canvas 创建一个与原图相同尺寸的画布
      const canvas = createCanvas(width, height)
      const ctx = canvas.getContext('2d')

      // 加载远程图像
      const img = await loadImage(imageBuffer)
      ctx.drawImage(img, 0, 0, width, height)

      // 设置文本样式
      const fontSize = 36
      ctx.font = `${fontSize}px Arial`
      ctx.fillStyle = 'white'
      ctx.textAlign = 'center'
      ctx.textBaseline = 'middle'

      // 绘制文本到画布中心
      const textX = width / 2
      ctx.fillText(this.descriptionText, textX, height / 2 - fontSize)
      ctx.fillText(this.authorName, textX, height / 2)

      // 加载并绘制图标
      if (iconBuffer) {
        const icon = await loadImage(iconBuffer)
        const iconSize = 50 // 图标大小
        let iconX = 0
        let iconY = 0

        // 根据指定位置调整图标坐标
        switch (this.iconPosition) {
          case 'topLeft':
            iconX = 10
            iconY = 10
            break
          case 'topRight':
            iconX = width - iconSize - 10
            iconY = 10
            break
          case 'bottomLeft':
            iconX = 10
            iconY = height - iconSize - 10
            break
          case 'bottomRight':
            iconX = width - iconSize - 10
            iconY = height - iconSize - 10
            break
          case 'center':
            iconX = width / 2 - iconSize / 2
            iconY = height / 2 + fontSize
            break
          default:
            iconX = width - iconSize - 10
            iconY = height - iconSize - 10
            break
        }

        ctx.drawImage(icon, iconX, iconY, iconSize, iconSize)
      }

      // 将画布转换为Buffer并返回
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
