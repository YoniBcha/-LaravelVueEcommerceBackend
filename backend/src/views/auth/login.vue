<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { useHead } from "@vueuse/head";
import * as yup from "yup";
import axios from "axios";
import { notification } from "antd";

const router = useRouter();

const errorMessages = ref({
    email: "",
    password: "",
});

useHead({
    title: "Login | Vue And Laravel Ecommerce",
    meta: [
        {
            name: "description",
            content:
                "Login to FanayeTec Project Management to manage, assign, and monitor projects and tasks effectively.",
        },
    ],
});

const loginSchema = yup.object().shape({
    email: yup
        .string()
        .email("Email must be a valid email")
        .required("Email is required"),
    password: yup
        .string()
        .min(6, "Password must be at least 6 characters")
        .required("Password is required"),
});

const formdata = ref({
    email: "",
    password: "",
});

const user = ref();

const handleLogin = async () => {
    errorMessages.value.email = "";
    errorMessages.value.password = "";
    try {
        await loginSchema.validate(formdata.value, { abortEarly: false });

        // const response = await axios.post("/api/login", {
        //     email: formdata.value.email,
        //     password: formdata.value.password,
        // });

        // const token = response.data.access_token;
        // localStorage.setItem("token", token);

        // const userResponse = await axios.get("/api/user", {
        //     headers: {
        //         Authorization: `Bearer ${token}`,
        //     },
        // });
        router.push("/app");

        notification.success({
            message: "Login Successful",
            description: "You have successfully logged in.",
        });
    } catch (error) {
        // Handle errors
        if (error.response) {
            notification.error({
                message: "Login Failed",
                description:
                    error.response.data.message ||
                    "An error occurred during login.",
            });
        } else if (error.inner) {
            error.inner.forEach((err) => {
                errorMessages.value[err.path] = err.message;
            });
        } else {
            console.error("Login failed:", error);
        }
    }
};
</script>

<template>
    <main>
        <section class="flex justify-center items-center h-screen w-full">
            <div class="p-10 shadow-2xl rounded-lg">
                <form @submit.prevent="handleLogin" class="flex flex-col gap-3">
                    <div>
                        <h1>Login Page</h1>
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
                            />
                            <p
                                v-if="errorMessages.email"
                                class="text-red-500 text-sm"
                            >
                                {{ errorMessages.email }}
                            </p>
                        </div>

                        <div class="flex flex-col">
                            <label for="password" class="text-base text-black"
                                >Password</label
                            >
                            <input
                                type="password"
                                id="password"
                                v-model="formdata.password"
                                class="outline-none border border-gray-100 py-2 px-4 rounded-md dark:border-gray-600 bg-transparent"
                                placeholder="Enter your password"
                            />
                            <p
                                v-if="errorMessages.password"
                                class="text-red-500 text-sm"
                            >
                                {{ errorMessages.password }}
                            </p>
                        </div>
                    </div>
                    <router-link to="/forgotpassword">
                        <div class="flex justify-end text-sm text-blue-500">
                            Forgot password
                        </div>
                    </router-link>

                    <div>
                        <button
                            class="bg-black text-white py-2 rounded-md border w-full"
                        >
                            Login
                        </button>
                    </div>

                    <div class="text-xs">
                        Dont't have accounts
                        <span class="font-medium"
                            ><router-link to="/register"
                                >Signup</router-link
                            ></span
                        >
                    </div>
                </form>
            </div>
        </section>
    </main>
</template>
