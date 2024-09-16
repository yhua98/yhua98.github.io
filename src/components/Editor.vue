<script lang="ts" setup>

import StarterKit from '@tiptap/starter-kit';
import { Editor, EditorContent } from '@tiptap/vue-3'
import { onMounted, version, ref, useTemplateRef } from 'vue';
import { useLocalStorage } from '@vueuse/core'

const editor = ref<Editor>()
const storage = useLocalStorage('serct', "")
const serct = ref('')
const htmls = ref<({ fldCvKPu4S31Z6o3Myw: string, fldw3uFWjRvqiQ9wGMW: string })[]>([])

const threttle = (fn: Function, delay: number) => {
  let lastCall = new Date().getTime();
  return (...args: any[]) => {
    const now = new Date().getTime();
    if (now - lastCall < delay) {
      return;
    }
    lastCall = now;
    return fn(...args);
  };
};

const fetchData = () => {
  const url = new URL("http://14.103.71.103:3000/api/table/tblCjsRKRmO4SzvwCjG/record");
  const params = {
    fieldKeyType: "id",
    filter: JSON.stringify({ "conjunction": "and", "filterSet": [{ "operator": "isNotEmpty", "value": null, "fieldId": "fldCvKPu4S31Z6o3Myw" }] })
  };

  Object.entries(params).forEach(([key, value]) => {
    url.searchParams.append(key, value);
  });

  fetch(url, {
    method: "GET",
    headers: {
      "Authorization": `Bearer ${storage.value}`,
      "Accept": "application/json"
    }
  })
    .then(response => response.json())
    .then(data => {
      console.log('Data:', data)
      htmls.value = data.records.map((record: any) => record.fields)
    })
    .catch(error => console.error('Error:', error));
}

const update = threttle(fetchData, 1000);



onMounted(() => {
  console.log('Editor mounted', version, storage.value)
  fetchData()
  editor.value = new Editor({
    extensions: [StarterKit],
    content: `
    `,
    // onUpdate() {
    //   console.log('Editor content updated: ', editor.value?.getHTML())
    // }
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

  console.log(new DOMParser().parseFromString(content, "text/html"))

  const data = {
    fieldKeyType: 'name',
    typecast: true,
    order: {
      viewId: '',
      anchorId: "recMgvh3aIydS4rxuRn",
      position: 'after'
    },
    records: [
      {
        fields: {
          title: "",
          content: content,
        }
      }
    ]
  }

  const url = 'http://14.103.71.103:3000/api/table/tblCjsRKRmO4SzvwCjG/record';

  const options = {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${storage.value}`,
      'content-type': 'application/json'
    },
    body: JSON.stringify(data)
  };

  console.log('Sending data:', options);

  try {
    const response = await fetch(url, options);
    const data = await response.json();
    console.log(data);
    editor.value?.commands.clearContent();
  } catch (error) {
    console.error(error);
  }
}

</script>

<template>
  <div>
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
    <div>
      <div class="article" v-for="html in htmls" :key="html.fldCvKPu4S31Z6o3Myw" v-html="html.fldw3uFWjRvqiQ9wGMW"></div>
    </div>
  </div>

</template>

<style lang="scss" scoped>

.article {
  background-color: lighten(#13151a, 5%);
  border: 1px solid lighten(#13151a, 20%);
  border-radius: 16px;
  overflow: hidden;
  padding: 16px;
  margin-top: 16px;
}

.editor-wrapper {
  position: sticky;
  top: 80px;
  background-color: lighten(#13151a, 5%);
  border: 1px solid lighten(#13151a, 20%);
  border-radius: 16px;
  overflow: hidden;
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
  max-height: 550px;
  padding: 0px 16px;
  overflow-y: auto;

  &::-webkit-scrollbar {
    width: 4px;
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