// services/productServices.js
import axios from "axios"

export const api = axios.create({
    baseURL: 'https://dummyjson.com',
    timeout: 10000
})

export async function fetchProducts({ limit, skip }) {
    try {
        const {data} = await api.get('/products', {
            params: {limit, skip}
        })
        return {
            items: data.products,
            total: data.total,
            limit: data.limit,
            skip: data.skip
        }
    } catch (err) {
        throw new Error(`Failed to fetch products: ${err.message}`)
    }
}