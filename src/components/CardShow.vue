<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import { useLocalStorage } from '@vueuse/core'

import Article from './Article.vue'

const htmls = ref<({
    id: string,
    fields: { fldCvKPu4S31Z6o3Myw: string, fldw3uFWjRvqiQ9wGMW: string }
})[]>([])
const storage = useLocalStorage('serct', "")

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
            htmls.value = data.records.map((record: any) => ({ id: record.id, fields: record.fields }))
        })
        .catch(error => console.error('Error:', error));
}

onMounted(() => {
    fetchData()
})

</script>

<template>
    <div v-for="html in htmls" :key="html.id">
        <Article :record="html" />
    </div>
</template>