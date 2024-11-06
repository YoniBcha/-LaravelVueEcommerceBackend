<template>
    <main>
        <section class="flex justify-center items-center h-screen w-full">
            <div class="p-10 shadow-2xl rounded-lg">
                <form
                    @submit.prevent="handleForgotPassword"
                    class="flex flex-col gap-3"
                >
                    <div>
                        <h1>Forgot Password</h1>
                    </div>

                    <div class="flex flex-col gap-3">
                        <div class="flex flex-col">
                            <label for="email" class="text-base text-black"
                                >Email</label
                            >
                            <input
                                type="email"
                                id="email"
                                v-model="formdata.email"
                                class="outline-none border border-gray-100 py-2 px-4 rounded-md dark:border-gray-600 bg-transparent"
                                placeholder="Enter your email"
                                required
                            />
                            <p
                                v-if="errorMessages.email"
                                class="text-red-500 text-sm"
                            >
                                {{ errorMessages.email }}
                            </p>
                        </div>
                    </div>

                    <div>
                        <button
                            class="bg-black text-white py-2 rounded-md border w-full"
                        >
                            Send Reset Link
                        </button>
                    </div>

                    <div class="flex justify-end text-sm text-blue-500">
                        <router-link to="/login">Back to Login</router-link>
                    </div>
                </form>
            </div>
        </section>
    </main>
</template>

<script setup>
import { ref } from "vue";
import { useHead } from "@vueuse/head";
import axios from "axios";
import { useRouter } from "vue-router";

const router = useRouter();

useHead({
    title: "Forgot Password | Vue And Laravel Ecommerce",
    meta: [
        {
            name: "description",
            content: "Reset your password by requesting a reset link.",
        },
    ],
});

const formdata = ref({
    email: "",
});

const errorMessages = ref({
    email: "",
});

const handleForgotPassword = async () => {
    errorMessages.value.email = "";
    try {
        if (!formdata.value.email) {
            errorMessages.value.email = "Email is required";
            return;
        }

        const response = await axios.post("/api/forgot-password", {
            email: formdata.value.email,
        });

        alert("A reset link has been sent to your email.");
        router.push({ name: "Login" });
    } catch (error) {
        if (error.response) {
            errorMessages.value.email =
                error.response.data.message || "An error occurred.";
        } else {
            console.error("Request failed:", error);
        }
    }
};
</script>
