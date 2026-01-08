// src/composables/usePriceFilter.js
import { ref, computed, watch } from "vue"

export function usePriceFilter(products) {
    const minPrice = ref(0)
    const maxPrice = ref(1000)

    const priceError = ref(null)

    // computed filter harga local
    const filteredPrice = computed(() => {
        // pastikan products ada isinya
        if (!products.value || !products.value.length) return []

        // pastikan min dan max adalah angka, default min 0, max infinity
        const min = Number(minPrice.value) || 0
        const max = Number(maxPrice.value) || Infinity

        return products.value.filter(product => {
            return product.price >= min && product.price <= max
        })
    })

    //validator input harga
    watch([minPrice, maxPrice], ([min, max]) => {
        if (min > max) {
            priceError.value = "Harga minimal tidak boleh lebih besar dari maksimal"
        } else {
            priceError.value = null
        }
    })

    return {
        minPrice,
        maxPrice,
        priceError,
        filteredPrice
    }
}