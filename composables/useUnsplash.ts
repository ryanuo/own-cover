import { createApi } from 'unsplash-js'

function useUnsplash() {
  const accessKey = useRuntimeConfig().public.unsplashapikey

  const unsplash = createApi({
    accessKey,
  })
  return unsplash
}

export default useUnsplash
