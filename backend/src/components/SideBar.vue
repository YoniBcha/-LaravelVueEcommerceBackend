<template>
    <aside
        :class="[
            'w-[300px] h-full bg-indigo-700 text-white py-4 px-2 transition-transform transform fixed left-0 top-0',
            isOpen ? 'translate-x-0' : '-translate-x-full',
        ]"
    >
        <div class="flex items-center space-x-2 p-4">
            <img src="" alt="Logo" class="h-8 w-8" />
            <span class="text-lg font-semibold">Your App</span>
        </div>

        <section class="mt-4">
            <router-link
                :to="{ name: 'app.dashboard' }"
                class="flex items-center p-2 rounded hover:bg-black hover:text-white"
            >
                <span class="text-xs">Dashboard</span>
            </router-link>
        </section>
    </aside>
</template>

<script setup>
import { defineProps } from "vue";

const props = defineProps({
    isOpen: Boolean,
});
</script>
