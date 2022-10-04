<template>
    <div>
        {{itemsList}}
    </div>
</template>
<script>
    import AuthItemService from "@/services/auth-item.service";
    import {onMounted, ref,reactive} from 'vue'

    export default {
        setup() {
            const itemsList = ref([]);
            const filter = reactive({
                name: "",
                description: "",
                rule_name: "",
                created_at: "",
                updated_at: "",
            });


            async function getItemsList() {
                try {
                    let response = await AuthItemService.getList(filter);
                    itemsList.value = response.data.result.items
                } catch (e) {
                    console.log(e)
                }

            }

            onMounted(() => {
                getItemsList()
            });

            return {itemsList, getItemsList}
        }
    }
</script>