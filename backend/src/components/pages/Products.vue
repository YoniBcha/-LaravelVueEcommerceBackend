<script setup>
import { ref, onMounted, computed } from "vue";
import { useHead } from "@vueuse/head";
import axios from "axios";
import store from "backend/src/store";


const search = ref('');
const perPage = ref(10);
const products = computed(()=>store.state.products);

useHead({
    title: "Products | Vue And Laravel Ecommerce",
    meta: [
        { name: "description", content: "Explore our wide range of products." },
    ],
});

// const fetchProducts = async () => {
//     try {
//         const response = await axios.get("/api/products");
//         products.value = response.data;
//     } catch (error) {
//         console.error("Failed to fetch products:", error);
//     }
// };

const fetchProducts = () => {
    store.dispatch('getProducts')
}

onMounted(() => {
    fetchProducts();
});

</script>

<template>
    <main class="container mx-auto py-10">
        <section>
            <div class="flex justify-between mx-10">
                <h1 class="text-3xl font-bold mb-6">Products</h1>
                <button class="px-5 py-2 bg-black text-white rounded-lg">
                    Add new Products
                </button>
            </div>

            <div class="">
                <div class="flex items-center">
                    <span class="whitespace-nowarp mr-3">per page</span>
                    <select
                        @change="getProducts(null)"
                        v-modal="perPage"
                        name=""
                        id=""
                    >
                        <option value="5">5</option>
                        <option value="10">10</option>
                        <option value="20">20</option>
                        <option value="50">50</option>
                        <option value="100">100</option>
                    </select>
                </div>
                <div class="">
                    <input
                        v-model="search"
                        @change="getProducts(null)"
                        placeholder="Type to search to products"
                        class="outline-none bg-transparent border border-gray-200 px-4 py-2 rounded-md"
                        type="text"
                    />
                </div>
            </div>
        </section>
        <section
            class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
        >
            <div
                v-for="product in products"
                :key="product.id"
                class="border rounded-lg shadow-md overflow-hidden"
            >
                <img
                    :src="product.imageUrl"
                    :alt="product.name"
                    class="w-full h-40 object-cover"
                />
                <div class="p-4">
                    <h2 class="font-semibold text-lg">{{ product.title }}</h2>
                    <p class="text-gray-700 mt-1">{{ product.description }}</p>
                    <div class="flex justify-between items-center mt-4">
                        <span class="text-xl font-bold"
                            >${{ product.price }}</span
                        >
                        <router-link
                            :to="`/products/${product.id}`"
                            class="bg-blue-500 text-white py-1 px-3 rounded-md"
                        >
                            View Details
                        </router-link>
                    </div>
                </div>
            </div>
        </section>
    </main>
</template>
