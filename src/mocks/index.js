// mocks/index.js - VERSI CLEAN
import MockAdapter from "axios-mock-adapter"
import { api } from "@/services/api"

function setupMock() {

    if (import.meta.env.VITE_MOCK_ENV !== 'true') {
        return null
    }

    const mock = new MockAdapter(api, { delayResponse: 500 })

    const allUsers = [
        { id: 1, firstName: "John", lastName: "Doe", email: "john@example.com", role: "admin" },
        { id: 2, firstName: "Jane", lastName: "Smith", email: "jane@example.com", role: "user" },
        { id: 3, firstName: "Jill", lastName: "Lars", email: "jill@example.com", role: "admin" },
        { id: 4, firstName: "Gill", lastName: "Mars", email: "gill@example.com", role: "user" },
        { id: 5, firstName: "Ron", lastName: "Lee", email: "Ron@example.com", role: "admin" },
        { id: 6, firstName: "Lucas", lastName: "Smith", email: "Lucas@example.com", role: "user" },
        { id: 7, firstName: "Diana", lastName: "Wellington", email: "Diana@example.com", role: "admin" },
        { id: 8, firstName: "Rose", lastName: "Willocks", email: "Rose@example.com", role: "user" },
        { id: 9, firstName: "William", lastName: "Dafoe", email: "William@example.com", role: "admin" },
        { id: 10, firstName: "Cindy", lastName: "Amitra", email: "Cindy@example.com", role: "user" },
    ];

    mock.onGet("/products").reply(config => {
        const { limit = 10, skip = 0 } = config.params || {}

        const allProducts = [
            { id: 1, title: "Wireless Headphones", price: 79 },
            { id: 2, title: "Smartphone X", price: 450 },
            { id: 3, title: "Laptop Pro", price: 1250 },
            { id: 4, title: "Mechanical Keyboard", price: 85 },
            { id: 5, title: "Gaming Mouse", price: 45 },
            { id: 6, title: "Monitor 27-inch", price: 320 },
            { id: 7, title: "USB-C Hub", price: 25 },
            { id: 8, title: "Power Bank", price: 35 },
            { id: 9, title: "Smart Watch", price: 180 },
            { id: 10, title: "Bluetooth Speaker", price: 65 },
            { id: 11, title: "Tablet Air", price: 550 },
            { id: 12, title: "External SSD 1TB", price: 150 },
            { id: 13, title: "Webcam HD", price: 42 },
            { id: 14, title: "Desk Lamp", price: 18 },
            { id: 15, title: "Office Chair", price: 185 },
            { id: 16, title: "Desk Mat", price: 12 },
            { id: 17, title: "Notebook Set", price: 8 },
            { id: 18, title: "Pen Tablet", price: 95 },
            { id: 19, title: "Wireless Earbuds", price: 95 },
            { id: 20, title: "Fitness Tracker", price: 75 },
            { id: 21, title: "Coffee Maker", price: 125 },
            { id: 22, title: "Water Bottle", price: 15 },
            { id: 23, title: "Backpack", price: 45 },
            { id: 24, title: "Desk Organizer", price: 8 },
            { id: 25, title: "USB Drive 128GB", price: 18 },
            { id: 26, title: "Cable Organizer", price: 6 },
            { id: 27, title: "Screen Cleaner Kit", price: 7 },
            { id: 28, title: "Laptop Stand", price: 28 },
            { id: 29, title: "Noise Cancelling Headphones", price: 210 },
            { id: 30, title: "Wireless Charger", price: 32 }
        ];

        const paginated = allProducts.slice(skip, skip + limit)

        return [
            200,
            {
                products: paginated,
                total: allProducts.length,
                limit,
                skip
            }
        ]
    })

    mock.onGet("/users").reply(config => {
        const { limit = 10, skip = 0 } = config.params || {}

        const paginated = allUsers.slice(skip, skip + limit)

        return [
            200,
            {
                users: paginated,
                total: allUsers.length,
                limit,
                skip
            }
        ]
    })

    mock.onGet("/users/search").reply(config => {
        const { q = "", limit = 10, skip = 0 } = config.params || {}

        const filtered = allUsers.filter(user =>
            q === '' ||
            user.firstName.toLowerCase().includes(q.toLowerCase()) ||
            user.lastName.toLowerCase().includes(q.toLowerCase()) ||
            user.email.toLowerCase().includes(q.toLowerCase())
        )

        const paginated = filtered.slice(skip, skip + limit)

        return [
            200,
            {
                users: paginated,
                total: filtered.length,
                limit,
                skip
            }
        ]
    })

    console.log('MOCK INTERCEPTED - Returning mock data')
    return mock
}

// Jalankan setup
setupMock()