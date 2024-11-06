<script setup>
import { ref } from "vue";
import NavBar from "../components/NavBar.vue";
import SideBar from "../components/SideBar.vue";

const sidebarOpened = ref(false);

function toggleSidebar() {
    sidebarOpened.value = !sidebarOpened.value;
}
</script>

<template>
    <main>
        <section class="min-h-full bg-gray-200 flex">
            <SideBar :is-open="sidebarOpened" @close-sidebar="toggleSidebar" />

            <div
                :class="[
                    sidebarOpened ? 'ml-[300px]' : 'ml-0',
                    'transition-all flex-1',
                ]"
            >
                <NavBar
                    :is-sidebar-open="sidebarOpened"
                    @toggle-sidebar="toggleSidebar"
                />
                <div class="p-4">
                    <router-view></router-view>
                </div>
            </div>
        </section>
    </main>
</template>
