<script lang="ts" setup>
import { ref } from 'vue'
import RightArrow from './icons/RightArrow.vue'
import DockLeft from './icons/DockLeft.vue';
import { Icon } from '@iconify/vue'
import DateTime from './DateTime.vue'
const isFloat = ref(false)

const update = () => {
    console.log(isFloat.value)
    isFloat.value = !isFloat.value
}
</script>

<template>
    <div class="group relative">
        <div :class="'h-100% transition-width ease-out transition-5000 overflow-hidden border-r-(1px [var(--bg-200)] solid) bg-[var(--bg-100)] ' + (isFloat
            ? ' fixed transform w-0 group-hover:(w-300px shadow-2xl) h-100vh' : 'relative w-300px')">
            <div class=" w-300px p-8px">
                <div>
                    <span class="text-20px">YHUAONE.CN</span>
                </div>
                <div>
                    <DateTime />
                </div>
            </div>
        </div>
        <div @click="isFloat = !isFloat" :class="'hover:color-blue cursor-pointer bg-[var(--bg-100)] ' + (isFloat
            ? 'fixed -left-2px top-32px border-(1px solid [var(--bg-200)]) shadow-xl rounded-r-1/2 pr-4px'
            : 'absolute top-8px right-8px')">
            <Icon v-if="isFloat" size="6" icon="lucide:chevrons-right" />
            <Icon class="text-[var(--text-200)]" v-else="isFloat" size="6" icon="lucide:panel-left-close" />
        </div>
    </div>

</template>