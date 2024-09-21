<script lang="ts" setup>

import { defineModel, ref } from 'vue';
import Tag from "./Tag.vue";
import { Icon } from '@iconify/vue';

const tags = defineModel()
const isAdd = ref(false)
const text = ref("")
const inputRef = ref<HTMLInputElement>()

const addTag = () => {
    if (!text.value) {
        isAdd.value = false
        return
    }
    // filter
    if (tags.value.includes(text.value)) {
        text.value = ""
        isAdd.value = false
        return
    }
    tags.value.push(text.value)
    text.value = ""
    isAdd.value = false
}

const clickAddBtn = () => {
    isAdd.value = true
    setTimeout(() => {
        inputRef.value?.focus()
    }, 0)
}

const onRemove = (tag: string) => {
    tags.value = tags.value.filter((t) => t !== tag)
}

</script>

<template>
    <template v-for="tag in tags" :key="tag">
        <Tag @remove="onRemove" :tag="tag" />
    </template>
    <button v-if="!isAdd" @click="clickAddBtn"
        class="ml-8px first:ml-0 border-(1px solid [var(--bg-300)]) rounded-8px px-8px">
        + 标签
    </button>
    <input ref="inputRef" v-else v-model="text" @blur="addTag" @keyup.enter="addTag"
        class="outline-none bg-[var(--bg-200)] max-w-100px ml-8px first:ml-0 border-(1px solid [var(--accent-100)]) rounded-8px px-8px" type="text"
        placeholder="Tag" />
</template>