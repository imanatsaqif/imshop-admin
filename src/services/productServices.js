import axios from "axios";

const api = axios.create({
    baseURL: 'https://dummyjson.com',
    timeout: 1000
})

export function fetchProducts({ limit, skip }) {
    return api.get('/products', {
        params: {
            limit,
            skip
        }
    })
}