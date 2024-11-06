<script setup>
import { useHead } from '@vueuse/head';

useHead({
  title: 'Vue and Laravel Ecommerce',
  meta: [
    {
      name: 'description',
      content:
        'Shop the latest products at Vue and Laravel Ecommerce. Your one-stop online store for quality items, secure checkout, and excellent customer service.',
    },
    {
      name: 'keywords',
      content:
        'ecommerce, online shopping, Vue, Laravel, buy online, Vue and Laravel Ecommerce, shopping cart, online store',
    },
    { name: 'author', content: 'Vue and Laravel Ecommerce' },
    { name: 'robots', content: 'index, follow' },
    { property: 'og:title', content: 'Vue and Laravel Ecommerce - Shop Now' },
    {
      property: 'og:description',
      content:
        'Discover top products and enjoy seamless online shopping with Vue and Laravel Ecommerce. High quality, great prices!',
    },
    { property: 'og:type', content: 'website' },
    { property: 'og:site_name', content: 'Vue and Laravel Ecommerce' },
    { name: 'twitter:card', content: 'summary_large_image' },
    {
      name: 'twitter:title',
      content: 'Vue and Laravel Ecommerce - Your Favorite Online Store',
    },
    {
      name: 'twitter:description',
      content:
        'Shop with confidence at Vue and Laravel Ecommerce, where quality meets convenience.',
    },
  ],
  link: [
    // Add your favicon if available
    // { rel: 'icon', href: '/path/to/favicon.ico', type: 'image/x-icon' }
  ],
});
</script>

<template>
  <router-view />
</template>


