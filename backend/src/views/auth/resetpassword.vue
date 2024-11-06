<script setup>
import { ref } from "vue";
import { useRouter, useRoute } from "vue-router";
import { useHead } from "@vueuse/head";
import * as yup from "yup";
import axios from "axios";
// import { notification } from "ant-design-vue";

const router = useRouter();
const route = useRoute();

const errorMessages = ref({
  password: "",
  confirmPassword: "",
});

useHead({
  title: "Reset Password | Vue And Laravel Ecommerce",
  meta: [
    {
      name: "description",
      content: "Reset your password for FanayeTec Project Management.",
    },
  ],
});

const resetPasswordSchema = yup.object().shape({
  password: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords must match")
    .required("Please confirm your password"),
});

const formdata = ref({
  password: "",
  confirmPassword: "",
});

const handleResetPassword = async () => {
  errorMessages.value.password = "";
  errorMessages.value.confirmPassword = "";

  try {
    await resetPasswordSchema.validate(formdata.value, { abortEarly: false });

    // Retrieve the reset token from the URL
    const token = route.query.token;

    // Send a request to the backend to reset the password
    await axios.post("/api/reset-password", {
      token,
      password: formdata.value.password,
      confirmPassword: formdata.value.confirmPassword,
    });

    // Show success notification (uncomment when using Ant Design)
    /*
    notification.success({
      message: "Password Reset Successful",
      description: "You can now log in with your new password.",
    });
    */

    // Redirect to the login page
    router.push({ name: "LoginPage" });
  } catch (error) {
    if (error.inner) {
      error.inner.forEach((err) => {
        errorMessages.value[err.path] = err.message;
      });
    } else {
      // Handle other errors
      console.error("Password reset failed:", error);
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
        <form @submit.prevent="handleResetPassword" class="flex flex-col gap-3">
          <div>
            <h1>Reset Password</h1>
            <p class="text-gray-600 text-sm">
              Enter your new password below.
            </p>
          </div>

          <div class="flex flex-col gap-3">
            <div class="flex flex-col">
              <label for="password" class="text-base text-black">New Password</label>
              <input
                type="password"
                id="password"
                v-model="formdata.password"
                class="outline-none border border-gray-100 py-2 px-4 rounded-md dark:border-gray-600 bg-transparent"
                placeholder="Enter your new password"
              />
              <p v-if="errorMessages.password" class="text-red-500 text-sm">
                {{ errorMessages.password }}
              </p>
            </div>

            <div class="flex flex-col">
              <label for="confirmPassword" class="text-base text-black">Confirm Password</label>
              <input
                type="password"
                id="confirmPassword"
                v-model="formdata.confirmPassword"
                class="outline-none border border-gray-100 py-2 px-4 rounded-md dark:border-gray-600 bg-transparent"
                placeholder="Confirm your new password"
              />
              <p v-if="errorMessages.confirmPassword" class="text-red-500 text-sm">
                {{ errorMessages.confirmPassword }}
              </p>
            </div>
          </div>

          <div>
            <button class="bg-black text-white py-2 rounded-md border w-full">
              Reset Password
            </button>
          </div>
        </form>
      </div>
    </section>
  </main>
</template>

