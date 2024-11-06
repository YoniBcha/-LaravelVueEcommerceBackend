<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useHead } from "@vueuse/head";
import * as yup from "yup";
import axios from "axios";
// import { notification } from "ant-design-vue";

const router = useRouter();

const errorMessages = ref({
  email: "",
});

useHead({
  title: "Forgot Password | Vue And Laravel Ecommerce",
  meta: [
    {
      name: "description",
      content:
        "Reset your password for FanayeTec Project Management to regain access to your account.",
    },
  ],
});

const forgotPasswordSchema = yup.object().shape({
  email: yup
    .string()
    .email("Email must be a valid email")
    .required("Email is required"),
});

const formdata = ref({
  email: "",
});

const handleForgotPassword = async () => {
  errorMessages.value.email = "";
  try {
    await forgotPasswordSchema.validate(formdata.value, { abortEarly: false });

    // Send a request to your backend to initiate a password reset
    await axios.post("/api/forgot-password", {
      email: formdata.value.email,
    });

    // Show success notification (uncomment when using Ant Design)
    /*
    notification.success({
      message: "Password Reset Email Sent",
      description:
        "If an account with that email exists, you will receive an email with instructions to reset your password.",
    });
    */

    // Redirect to login page or show success message
    router.push({ name: "LoginPage" });
  } catch (error) {
    if (error.inner) {
      error.inner.forEach((err) => {
        errorMessages.value[err.path] = err.message;
      });
    } else {
      // Handle other errors
      console.error("Forgot password request failed:", error);
      /*
      notification.error({
        message: "Error",
        description: error.response?.data?.message || "An error occurred.",
      });
      */
    }
  }
};
</script>

<template>
  <main>
    <section class="flex justify-center items-center h-screen w-full">
      <div class="p-10 shadow-2xl rounded-lg">
        <form @submit.prevent="handleForgotPassword" class="flex flex-col gap-3">
          <div>
            <h1>Forgot Password</h1>
            <p class="text-gray-600 text-sm">
              Enter your email to receive a password reset link.
            </p>
          </div>

          <div class="flex flex-col gap-3">
            <div class="flex flex-col">
              <label for="email" class="text-base text-black">Email</label>
              <input
                type="email"
                id="email"
                v-model="formdata.email"
                class="outline-none border border-gray-100 py-2 px-4 rounded-md dark:border-gray-600 bg-transparent"
                placeholder="Enter your email"
              />
              <p v-if="errorMessages.email" class="text-red-500 text-sm">
                {{ errorMessages.email }}
              </p>
            </div>
          </div>

          <div>
            <button class="bg-black text-white py-2 rounded-md border w-full">
              Send Reset Link
            </button>
          </div>

          <div class="flex justify-end text-sm text-blue-500 mt-3">
            <router-link to="/">Back to Login</router-link>
          </div>
        </form>
      </div>
    </section>
  </main>
</template>

