// src/composables/useProducts
import { ref } from "vue";
import axios from "axios";

export function useProducts() {
    //API_URL
    const API_URL = 'https://dummyjson.com/products'

    //state
    const products = ref([])
    const loading = ref(true)
    const error = ref(null)

    //parameter reaktif
    const limitProduct = ref(10)
    const skipProduct = ref(0)

    //fetch produk dengan filtering server side
    const fetchProducts = async () => {
        try {
            loading.value = true
            const response = await axios.get(API_URL, {
                params: {
                    limit: limitProduct.value,
                    skip: skipProduct.value
                }
            })
            products.value = response.data.products
            console.log(response.data)
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
        fetchProducts
    }
}