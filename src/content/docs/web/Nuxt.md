---
title: Nuxt文档
tags: ["nuxt", "vue", "web"]
---

# Nuxt文档

- runtimeConfig/app.config的区别

- 在nuxt中开启Vue响应式解构props

```ts
export default defineNuxtConfig({
    vue: {
        propsDestructure: true
    }
})
```

- 服务端渲染服务器Nitro

## - 资源

1/public目录
使用绝对路径访问

2/assets目录
使用`~/assets/`访问

3/全局CSS
![Goto](https://nuxt.com.cn/docs/getting-started/assets#%E5%85%A8%E5%B1%80%E6%A0%B7%E5%BC%8F%E5%AF%BC%E5%85%A5)
```ts
export default defineNuxtConfig({
    // 方式1
    css:['~/assets/css/main.css'],
    // 方式2
    vite: {
        css: {
            preprocessorOptions: {
                scss: {
                    additionalData:'// data'
                }
            }
        }
    }
})
```

> 外部样式表是渲染阻塞资源，在渲染前必须加载和处理，因此应避免大量外部样式表。

3/1 在Vue的SFC中使用CSS Module

使用注入`$style`变量访问

```vue
<template>
    <div :class="$style.red"></div>
</template>

<style module>
.red {
    // css code
}
</style>
```

3/2 ![布局偏移CLS](https://web.dev/cls)

3/3 CSS压缩工具Brotli

## 路由

> 路由实在JS中完成，那是否会影响搜索引擎的检索，没有实际的跳转链接在HTML里面

> 当NuxtLink中内容可见时，Nuxt会预取链接页面的组件和负载

1/ 路由

1/1 路由中间件

- 匿名路由中间件，在组件内部定义
- 命名路由中间件，放在middleware/目录下
- 全局路由中间件，放在middleware中，使用.global后缀

1/2 使用中间件

```vue
<script setup lang="ts">
definePageMeta({
  middleware: 'auth'
})
</script>

<template>
  <h1>欢迎来到您的仪表盘</h1>
</template>
```

1/3 验证路由

```vue
<script setup lang="ts">
definePageMeta({
  validate: async (route) => {
    // 检查id是否由数字组成
    return /^\d+$/.test(route.params.id)
  }
})
</script>
```

## SEO与Meta

## 过度效果

## 数据获取

1/ 数据获取方式

- useFetch
- useAsyncData
- $fetch

2/ status状态值

- idle 获取未开始
- pending 获取已开始但尚未完成
- error 获取失败
- success 获取成功完成

3/ 在多个组件之间共享状态useState

```ts
export const useCounter = () => useState<number>('counter', () => 0)
```

## 自动导入tree-shaking