// src/composables/useProducts
import { ref } from "vue";
import { fetchProducts } from "@/services/productServices";

export function useProducts() {
    //state
    const products = ref([])
    const loading = ref(false)
    const error = ref(null)

    //parameter reaktif
    const limitProduct = ref(10)
    const skipProduct = ref(0)

    //fetch produk dengan filtering server side
    const getProducts = async () => {
        try {
            loading.value = true
            const response = await fetchProducts({
                limit: limitProduct.value,
                skip: skipProduct.value
            })
            products.value = response.data.products
        } catch (err) {
            error.value = err.message
            console.error('error fecthing products:', err)
        } finally {
            loading.value = false
        }
    }

    return {
        products,
        loading,
        error,
        limitProduct,
        skipProduct,
        getProducts
    }
}