<!-- components/PaginationControls.vue -->
<template>
    <div class="pagination">
        <button v-if="page>1" @click="goPrev">Prev</button>
        
        <span>
            Page {{ page }} of {{ totalPages }}
        </span>

        <button v-if="page<totalPages" @click="goNext">Next</button>

        <div>
            <label>Per Page:</label>
            <input
                type="number"
                :value="perPage"
                min="1"
                @change="updatePerPage"
            />
        </div>
    </div>
</template>

<script setup>
    const props = defineProps({
        page: {
            type: Number,
            required: true
        },
        totalPages: {
            type: Number,
            required: true
        },
        perPage: {
            type: Number,
            required: true
        }
    })

    const emit = defineEmits(['change-page', 'change-per-page'])

    function goPrev() {
        if (props.page>1){
            emit('change-page', props.page -1)
        }
    }

    function goNext() {
        if (props.page<props.totalPages) {
            emit('change-page', props.page+1)
        }
    }

    function updatePerPage (event) {
        emit('change-per-page', Number(event.target.value))
    }
</script>