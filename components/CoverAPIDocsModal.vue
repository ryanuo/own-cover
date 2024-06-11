<script setup lang="ts">
const isOpen = ref(false)
</script>

<template>
  <div class="cursor-pointer z-20">
    <Icon name="tabler:api" size="40" @click="isOpen = true" />
    <UModal
      v-model="isOpen" :ui="{
        width: 'sm:max-w-2xl',
      }"
    >
      <div class="p-4">
        <h2 class="mb-4 text-xl">
          API使用
        </h2>
        <div>
          <h4>
            1. 使用GET请求生成封面
          </h4>
          <code>/generate?可选参数</code>控制封面生成规则,参数如下：
          <h4>
            2.控制封面的宽高比
          </h4>
          支持横向/纵向，eg: <code>/generate?aspect=16-9</code> 可自定义宽高比
          <h4>
            3. 控制蒙层颜色
          </h4>
          支持自定义颜色，eg: <code>/generate?maskColor=rgba(0,0,0,0.5)</code>
          <h4>
            4. 控制字体样式
          </h4>
          支持自定义字体，eg: <code>/generate?font=远程字体</code> 默认为本地字体样式
          <h4>
            5. 封面文字/作者名称自定义
          </h4>
          <code>/generate?title=自定义文字&author=@Ryanuo</code>
          <h4>
            6. 封面背景自定义
          </h4>
          <code>/generate?bg=https://cdn.jsdelivr.net/gh/Ryanuo/CDN/img/bg.jpg</code>
          <h4>
            7. 图标自定义
          </h4>
          <code>/generate?icon=https://cdn.jsdelivr.net/gh/Ryanuo/CDN/img/icon.png</code>
          <h4>
            8. 自定义图标的位置
          </h4>
          <code>/generate?iconPosition=top-left</code>有五个位置：top-left、top-right、bottom-left、bottom-right、center
        </div>
      </div>
    </UModal>
  </div>
</template>

<style>
code {
  @apply bg-gray-200 px-1 rounded-md;
}
</style>
