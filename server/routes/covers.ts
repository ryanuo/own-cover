import useUnsplash from '~/composables/useUnsplash'

export default defineEventHandler(async (event) => {
  // 获取请求参数
  const { query, page = 1, perPage = 30 } = getQuery(event) as {
    query: string
    page: number
    perPage: number
  }

  try {
    // 调用 Unsplash API 搜索图片
    const response = await useUnsplash().search.getPhotos({
      query,
      page,
      perPage,
    })

    // 返回搜索结果
    return response
  }
  catch (error: any) {
    // 处理可能出现的错误
    return {
      success: false,
      error: error?.message || 'An error occurred while fetching photos.',
    }
  }
})
