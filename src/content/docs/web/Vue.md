---
title: Vue
tags: []
---

## 选项式声明周期钩子

1、beforeCreate

2、created

3、beforeMount

4、mounted

5、beforeUpdate

6、updated

7、activated

8、deactivated

9、errorCaptured

10、beforeUnmount

11、unmounted

12、renderTracked

13、renderTriggered

14、serverPrefetch

## CSS功能

1、作用域

使用`scoped`可以将CSS的使用范围限定在当前组件，但我们也可以使用一下伪类扩展CSS的作用域

1.1、:deep(selector)

将作用域扩展到子组件

1.2、:sloted(selector)

在slot中渲染的内容来自于父组件，当前组件作用域样式无法影响，可以使用此伪类破除限制

1.3、:global(selector)

全局样式

也可以声明多个`style`

```vue
<style></style>
<style scoped></style>
```

2、CSS Modules

```vue

<script setup>

const css = useCssModule([name])

</script>

<template>
    // default no name
    <div :class="$style.class"></div>
    // with name
    <div :class="name.class"></div>
</template>

<style module[=name]></style>
```

3、CSS `v-bind`函数

可以在style中使用v-bind函数绑定组件状态，使用js时需要用引号

