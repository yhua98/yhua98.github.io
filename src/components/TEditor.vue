<script lang="ts" setup>
import StarterKit from '@tiptap/starter-kit';
import { Editor, EditorContent } from '@tiptap/vue-3'
import { onMounted, defineProps, ref } from 'vue';
import { useLocalStorage } from '@vueuse/core'

const editor = ref<Editor>()
const storage = useLocalStorage('serct', "")
const serct = ref('')

const { record } = defineProps<{
  record: { id: string, fields: { fldCvKPu4S31Z6o3Myw: string, fldw3uFWjRvqiQ9wGMW: string } }
}>()

onMounted(() => {
  editor.value = new Editor({
    extensions: [StarterKit],
    content: record.fields.fldw3uFWjRvqiQ9wGMW,
  })
})

const onSecrct = () => {
  storage.value = serct.value
}

const onClick = async () => {

  if (!storage.value) {
    return
  }

  const content = editor.value?.getHTML()

  if (!content) {
    return;
  }

  const data = {
    fieldKeyType: 'id',
    record: {
      fields: {
        fldw3uFWjRvqiQ9wGMW:content,
      }
    }
  }

  console.log(storage.value)

  const options = {
    method: 'PATCH',
    headers: {
      Authorization: `Bearer ${storage.value}`,
      'content-type': 'application/json'
    },
    body: JSON.stringify(data)
  };


  const url = `http://14.103.71.103:3000/api/table/tblCjsRKRmO4SzvwCjG/record/${record.id}`;

  try {
    const response = await fetch(url, options);
    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}

</script>

<template>
  <div class="editor-wrapper" data-allow-mismatch="children">
    <EditorContent class="editor" :editor="editor" />
    <div class="btn-wrapper">
      <button class="btn" @click="onClick">Send</button>
    </div>
    <div v-if="!storage" class="btns-wrapper">
      <input class="serct" type="text" v-model="serct" placeholder="密钥" />
      <button class="btn" @click="onSecrct">提交</button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.editor-wrapper {
  top: 80px;
  background-color: lighten(#13151a, 5%);
  border: 1px solid lighten(#13151a, 20%);
  border-radius: 16px;
  overflow: hidden;
  width: 100%;
  height: 100%;

  .btns-wrapper {
    color: aliceblue;
    position: absolute;
    top: 0;
    background-color: lighten(#13151a, 5%);
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    .btn {
      margin-top: 16px;
      background-color: transparent;
      border: 1px solid lighten(#13151a, 20%);
      outline: none;
      padding: 8px 16px;
      border-radius: 16px;
      color: aliceblue;
      cursor: pointer;
      user-select: none;

      &:hover {
        border: 1px solid lighten(#13151a, 40%);
      }
    }

    .serct {
      color: aliceblue;
      background-color: transparent;
      border: 0;
      outline: none;
      border-bottom: 2px solid lighten(#13151a, 20%);
      padding: 8px 0 2px;
      width: 400px;

      &:focus {
        border-bottom: 2px solid lighten(#13151a, 40%);
      }
    }
  }
}

.editor {
  height: 100%;
  width: 100%;
  padding: 16px 16px;
  overflow-y: auto;

  &::-webkit-scrollbar {
    width: 0;
    background-color: lighten(#13151a, 5%);
  }

  &::-webkit-scrollbar-thumb {
    background-color: #13151a;
    border-radius: 2px;
  }

  :deep(.ProseMirror-focused) {
    outline: none;
  }
}

.btn-wrapper {
  display: flex;
  padding: 16px;
  position: absolute;
  bottom: 8px;
  right: 8px;

  .btn {
    background-color: transparent;
    border: 1px solid lighten(#13151a, 20%);
    color: aliceblue;
    padding: 8px 16px;
    border-radius: 8px;
    cursor: pointer;
    user-select: none;
    margin-left: auto;
    box-shadow: 0 0 4px lighten(#13151a, 30%);
  }
}
</style>