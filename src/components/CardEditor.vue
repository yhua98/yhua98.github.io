<script lang="ts" setup>
import StarterKit from '@tiptap/starter-kit';
import { Editor, EditorContent } from '@tiptap/vue-3'
import TaskList from "@tiptap/extension-task-list";
import TaskItem from "@tiptap/extension-task-item";
import CodeBlock from '@tiptap/extension-code-block';
import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight';
import Highlight from '@tiptap/extension-highlight'
import Placeholder from '@tiptap/extension-placeholder'
import { Icon } from '@iconify/vue';
import { onMounted, version, ref } from 'vue';
import { useLocalStorage } from '@vueuse/core';
import { all, createLowlight } from 'lowlight'
import js from 'highlight.js/lib/languages/javascript'
import ts from 'highlight.js/lib/languages/typescript'

const lowlight = createLowlight(all)

lowlight.register('js', js)
lowlight.register('ts', ts)

import Tags from './Tags.vue'

const editor = ref<Editor>()
const storage = useLocalStorage('serct', "")
const editorContent = useLocalStorage('editorContent', "")
const tags = ref([])
const isSubmit = ref(false)

onMounted(() => {
    editor.value = new Editor({
        onUpdate: ({ editor }) => {
            editorContent.value = editor.getHTML() ?? ""
        },
        extensions: [StarterKit.configure({
            heading: {
                levels: [1, 2, 3],
                HTMLAttributes: {
                    class: 'text-20px my-16px font-bold',
                },
            },
            horizontalRule: {
                HTMLAttributes: {
                    class: 'my-16px',
                },
            },
            paragraph: {
                HTMLAttributes: {
                    // class: 'my-0px',
                },
            },
            bulletList: {
                HTMLAttributes: {
                    class: 'my-16px list-disc ml-16px marker:text-sky-400',
                },
            },
            blockquote: {
                HTMLAttributes: {
                    class: 'my-0px border-l-4 border-[var(--bg-300)] py-4px pl-8px',
                },
            },
            code: {
                HTMLAttributes: {
                    class: 'my-0 bg-[var(--bg-200)] text-[var(--text-100)] rounded-8px py-2px px-8px',
                },
            },
        }), TaskList, TaskItem.configure({
            HTMLAttributes: {
                class: 'my-8px flex items-center gap-8px [&>p]:my-0!',
            },
            nested: true,
        }), CodeBlock, CodeBlockLowlight.configure({
            lowlight,
            HTMLAttributes: {
                class: 'my-16px bg-[var(--bg-200)] text-[var(--text-100)] rounded-8px p-8px',
            },
        }), Highlight.configure({
            HTMLAttributes: {
                class: 'bg-[var(--accent-200)] text-[var(--bg-100)] py-2px px-8px',
            },
        }), Placeholder.configure({
            placeholder: ({ node }) => {
                if (node.type.name === 'heading') {
                    return 'What’s the title?'
                }

                return 'Write something …'
            },
        })],
        editorProps: {
            attributes: {
                class: 'my-16px [&>p]:my-16px! [&>ul]:my-16px!',
            },
        },
        content: editorContent.value,
        // autofocus: true
    })
})



const onSubmit = async () => {
    isSubmit.value = true
    if (!storage.value) {
        isSubmit.value = false
        return
    }

    const content = editor.value?.getHTML()

    if (content === "<p></p>") {
        isSubmit.value = false
        return;
    }

    const data = {
        fieldKeyType: 'name',
        typecast: true,
        records: [
            {
                fields: {
                    title: "",
                    content: content,
                    tags: tags.value
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

    try {
        await fetch(url, options);
        editor.value?.commands.clearContent();
    } catch (error) {
        console.error(error);
    }finally{
        isSubmit.value = false
    }
}

</script>

<template>
    <div class="bg-[var(--bg-100)] rounded-8px p-8px max-w-768px mx-auto shadow" data-allow-mismatch="children">
        <EditorContent class="outline-none" :editor="editor" />
        <div class="mt-8px">
            <div>
                <Tags v-model="tags" />
            </div>
            <div class="mt-8px">
                <button @click="onSubmit" :disabled="isSubmit" class="disabled:text-[var(--text-200)] flex items-center py-2px px-8px rounded-4px shadow hover:shadow-xl">
                    <Icon v-if="isSubmit" icon="lucide:loader" class="mr-4px spinner" />
                    提交
                    <Icon v-if="!isSubmit" icon="lucide:send" class="ml-4px" />
                </button>
            </div>
        </div>
        <div v-if="!storage" class="">
            <input class="" type="text" v-model="storage" placeholder="密钥" />
        </div>
    </div>
</template>

<style lang="scss" scoped>
:deep(.ProseMirror-focused) {
    outline: none;
}

:deep(.tiptap) {
    pre {
        font-family: 'JetBrainsMono', monospace;

        code {
            background: none;
            color: inherit;
            font-size: 0.8rem;
            padding: 0;
        }

        /* Code styling */
        .hljs-comment,
        .hljs-quote {
            color: #616161;
        }

        .hljs-variable,
        .hljs-template-variable,
        .hljs-attribute,
        .hljs-tag,
        .hljs-name,
        .hljs-regexp,
        .hljs-link,
        .hljs-name,
        .hljs-selector-id,
        .hljs-selector-class {
            color: #f98181;
        }

        .hljs-number,
        .hljs-meta,
        .hljs-built_in,
        .hljs-builtin-name,
        .hljs-literal,
        .hljs-type,
        .hljs-params {
            color: #fbbc88;
        }

        .hljs-string,
        .hljs-symbol,
        .hljs-bullet {
            color: #b9f18d;
        }

        .hljs-title,
        .hljs-section {
            color: #faf594;
        }

        .hljs-keyword,
        .hljs-selector-tag {
            color: #70cff8;
        }

        .hljs-emphasis {
            font-style: italic;
        }

        .hljs-strong {
            font-weight: 700;
        }
    }

    *.is-editor-empty:first-child::before {
        content: attr(data-placeholder);
        color: var(--bg-300);
        float: left;
        height: 0;
        pointer-events: none;
    }

    *.is-empty::before {
        color: var(--bg-300);
        content: attr(data-placeholder);
        float: left;
        height: 0;
        pointer-events: none;
    }
}

.spinner {
    animation: spin 1.5s linear infinite;

    @keyframes spin {
        0% {
            transform: rotate(0deg);
        }
        100% {
            transform: rotate(360deg);
        }
    }
}
</style>