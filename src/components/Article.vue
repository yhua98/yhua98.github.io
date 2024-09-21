<script lang="ts" setup>
import { defineProps, ref } from 'vue';
import TEditor from './TEditor.vue';
import {Icon} from '@iconify/vue';
const { record } = defineProps<{
  record: { id: string, fields: { fldCvKPu4S31Z6o3Myw: string, fldw3uFWjRvqiQ9wGMW: string } }
}>()
const isEdit = ref(false)
</script>

<template>
  <div class="group bg-[var(--bg-100)] relative overflow-hidden hover:h-auto transition-(height 1000) mt-16px max-w-768px mx-auto shadow p-16px rounded-16px text-[var(--text-200)]">
    <div class="tiptap" v-html="record.fields.fldw3uFWjRvqiQ9wGMW"></div>
    <div v-if="isEdit" class="editor">
      <TEditor :record="record" />
    </div>
    <div class="hidden group-hover:(flex items-center) absolute top-4px right-4px">
      <Icon @click="isEdit = !isEdit" icon="lucide:edit" class="cursor-pointer hover:text-[var(--accent-100)]" />
      <Icon icon="lucide:more-vertical" class="ml-8px cursor-pointer hover:text-[var(--accent-100)]" />
    </div>
  </div>
</template>

<style lang="scss" scoped>

.editor {
  position: absolute;
  top: 0;
  left: 0;
  box-sizing: content-box;
  width: 100%;
  height: 100%;
}
</style>