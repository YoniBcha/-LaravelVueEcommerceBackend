<template>
    <header
        class="flex justify-between items-center h-14 bg-gray-100 shadow-sm px-4"
    >
        <!-- Toggle Sidebar Button -->
        <button
            class="flex items-center justify-center text-black"
            @click="$emit('toggle-sidebar')"
        >
            <span v-if="isSidebarOpen">✕</span>
            <span v-else>☰</span>
        </button>
        <!-- Other navbar content goes here (e.g., title, logo, etc.) -->
        <h1 class="text-lg font-semibold">Your App</h1>
    </header>
</template>

<script setup>
import { defineProps } from "vue";

const props = defineProps({
    isSidebarOpen: Boolean,
});
</script>
