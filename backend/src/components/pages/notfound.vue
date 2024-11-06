<template>
    <main class="flex justify-center items-center h-screen w-full bg-gray-100">
      <div class="text-center p-10 shadow-2xl rounded-lg bg-white">
        <h1 class="text-5xl font-bold text-red-500">404</h1>
        <h2 class="text-2xl font-semibold">Page Not Found</h2>
        <p class="mt-4 text-gray-600">
          Oops! The page you are looking for does not exist.
        </p>
        <router-link to="/" class="mt-6 inline-block bg-black text-white py-2 px-4 rounded-md">
          Go to Home
        </router-link>
      </div>
    </main>
  </template>

  <script setup>
  import { useHead } from "@vueuse/head";

  useHead({
    title: "404 - Page Not Found | Vue And Laravel Ecommerce",
    meta: [
      { name: "description", content: "The page you are looking for cannot be found." },
    ],
  });
  </script>

