import { debounce } from "@/utils/debounce"
import { ref, computed, watch } from "vue"

const STORAGE_KEY = 'product_price_filters'

export function usePriceFilter(products) {
    // Load from localStorage with nullish coalescing
    const savedPrice = JSON.parse(localStorage.getItem(STORAGE_KEY))
    const minPrice = ref(savedPrice?.minPrice ?? 0)
    const maxPrice = ref(savedPrice?.maxPrice ?? 1000)
    const priceError = ref(null)

    // Debounce function untuk save (created once)
    const saveToStorage = debounce((min, max) => {
        localStorage.setItem(STORAGE_KEY, JSON.stringify({
            minPrice: min,
            maxPrice: max
        }))
    }, 1000)

    // Computed: filter products by price
    const filteredPrice = computed(() => {
        if (!products.value?.length) return []
        
        const min = Number(minPrice.value) ?? 0
        const maxNum = Number(maxPrice.value)
        const max = isNaN(maxNum) ? Infinity : maxNum
        
        return products.value.filter(product => 
            product.price >= min && product.price <= max
        )
    })

    // Watch: validation + auto-save
    watch([minPrice, maxPrice], ([min, max], [oldMin, oldMax], onCleanup) => {
        
        // 1. Validation
        if (min > max) {
            priceError.value = "Harga minimal tidak boleh lebih besar dari maksimal"
        } else {
            priceError.value = null
        }
        
        // 2. Auto-save (only if valid AND not first run)
        const isFirstRun = oldMin === undefined && oldMax === undefined
        
        if (!isFirstRun && priceError.value === null) {
            // Cancel any pending save
            saveToStorage.cancel()
            // Schedule new save
            saveToStorage(min, max)
        }
        
        // 3. Cleanup
        onCleanup(() => {
            saveToStorage.cancel()
        })
    }, { immediate: true })

    return { minPrice, maxPrice, priceError, filteredPrice }
}