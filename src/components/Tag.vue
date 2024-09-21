<script lang="ts" setup>
import { ref } from 'vue';
import Close from "./icons/Close.vue";

const { tag } = defineProps({
    tag: {
        type: String,
        required: true,
    },
});

const emit = defineEmits({
    remove: () => true,
})

const remove = () => {
    emit('remove', tag)
}

</script>

<template>
    <button class="ml-8px inline-flex items-center first:ml-0 border-(1px solid [var(--accent-100)]) rounded-8px pl-8px pr-4px">
        {{ tag }}
        <Close @click="remove" class="ml-4px text-[var(--accent-100)]" />
    </button>
</template>