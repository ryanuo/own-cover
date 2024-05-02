import axios from "axios";
import jimp from "jimp";

interface ImageSize {
  width: number;
  height: number;
  image: jimp;
}

// 获取远程图片的宽度和高度
async function getImageSize(url: string): Promise<ImageSize> {
  const response = await axios.get(url, { responseType: "arraybuffer" });
  const imageStream = response.data;
  const image = await jimp.read(imageStream);
  return { width: image.getWidth(), height: image.getHeight(), image };
}

// 根据比例生成图像数据流
async function generateImageStreamWithRatio(
  url: string,
  aspectRatio: number,
  quality: number = 80
): Promise<Buffer> {
  const { width, image } = await getImageSize(url);
  const newHeight = Math.round(width / aspectRatio);
  image.cover(
    width,
    newHeight,
    jimp.HORIZONTAL_ALIGN_CENTER | jimp.VERTICAL_ALIGN_MIDDLE
  );
  return image.getBufferAsync(jimp.MIME_PNG);
}

export { generateImageStreamWithRatio };
