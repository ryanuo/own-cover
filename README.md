## Own Cover

<img src="public\logo.png" width="80" height="80" />

> [!NOTE]
> Still In Development

## Description

This is a simple web app that allows you to upload an image and get a cover of your choice.

## Features

- [x] Upload an image or Choose a cover.
- [x] Customize the cover Text.
- [x] Customize the cover Font CDN Source.
- [x] Customize the cover Font.
- [x] Customize the cover Mask Color.
- [x] Customize the cover Icon.
- [x] Support API server-side cover generation.
- [x] Download the cover.

Google Font CDN:

- https://fonts.googleapis.com/css?family=%s
- https://fonts.loli.net/css?family=%s

`%s` is the fontfamily placeholder

## Usage

### Online Demo

You can try it out at [Own Cover](https://oc.mr90.top)

### Local Development

1. Clone the repository

```
git clone https://github.com/rr210/own-cover.git
```

2. Install the dependencies

```
pnpm install
```

3. Config the .env file

```
cp .env.example .env
```

NEXT_PUBLIC_UNSPLASH_API_KEY= your unsplash api key
[apply for unsplash api key](https://unsplash.com/)

4. Run the Web

```
pnpm run dev
```

## Using Dependencies

- [nuxtjs](https://nextjs.org/)
- [tailwindcss](https://tailwindcss.com/)
- [nuxtui](https://ui.nuxt.com/getting-started)
- [dom-to-image](https://github.com/tsayen/dom-to-image)
- [tinycolor2](https://github.com/bgrins/TinyColor)
- [vue-pick-colors](https://github.com/qiuzongyuan/vue-pick-colors)
- [sharp](https://sharp.pixelplumbing.com/)
- [node-canvas](https://github.com/Automattic/node-canvas)
- [vue-photo-album](https://github.com/tenthree/vue-photo-album)

## Build

Netlify

Vercel

## Contribution

contributions of all forms are welcome including but not limited to beautifying the interface adding features improving the code fixing bugs etc.

<a href=" ">
  <img src="https://contrib.rocks/image?repo=rr210/own-cover" />
</a>

## License

[MIT](./LICENSE) License © 2024-PRESENT [Ryan Co](https://github.com/rr210)
