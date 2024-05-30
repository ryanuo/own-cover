import ImageProcessor from '../utils/aspect'

export default defineEventHandler(async () => {
  const gen = new ImageProcessor({
    imageUrl: 'https://fastly.picsum.photos/id/497/1920/1080.jpg?hmac=lCmyuUeNJbmkWXfeLeQ2SxRu3mII34_GIdUIBn3M6RQ',
    descriptionText: 'This is a description',
    authorName: 'John Doe',
    iconUrl: '',
  })
  return await gen.processImage()
})
