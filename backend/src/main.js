import { createApp } from "vue";
import { createHead } from "@vueuse/head";
import App from "./App.vue";

import store from "./store/index";
import router from "./router";
import "./style.css";

const head = createHead();

createApp(App).use(head).use(store).use(router).mount("#app");
