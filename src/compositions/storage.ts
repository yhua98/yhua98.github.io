import { onMounted, onUnmounted, ref, toValue } from 'vue';

export function useLocalStorage(key: string, initialValue?: string) {

    const storage = ref<string | null>(toValue(() => window.localStorage.getItem(key)))

    const handle = (event:StorageEvent) => {
        console.log(event)
        if (event.key === key) {
            storage.value = event.newValue || "";
        }
    }

    onMounted(() => {
        window.addEventListener('storage', handle)
    })

    onUnmounted(() => {

        console.log('unmounted')
        window.removeEventListener('storage', handle)
    })

    return [storage] as const;
}