<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useHead } from "@vueuse/head";
import * as yup from "yup";
import axios from "axios";


const router = useRouter();
useHead({
  title: "Register | FanayeTec Project Management",
  meta: [
    {
      name: "description",
      content:
        "Register for FanayeTec Project Management to manage, assign, and monitor projects and tasks effectively.",
    },
  ],
});

const errorMessages = ref({
  name: "",
  email: "",
  password: "",
  password_confirmation: "",
});

const registrationSchema = yup.object().shape({
  name: yup.string().required("Name is required"),
  email: yup
    .string()
    .email("Email must be a valid email")
    .required("Email is required"),
  password: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
  password_confirmation: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords must match")
    .required("Confirm Password is required"),
});

const formdata = ref({
  name: "",
  email: "",
  password: "",
  password_confirmation: "",
});

async function handleRegister() {
  // Reset error messages
  errorMessages.value = {
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
  };

  try {
    // Validate form data with Yup
    await registrationSchema.validate(formdata.value, { abortEarly: false });

    // Make the registration API request
    await axios.post("/api/register", {
      name: formdata.value.name,
      email: formdata.value.email,
      password: formdata.value.password,
      password_confirmation: formdata.value.password_confirmation,
    });

    // Redirect to login page on success
    router.push({ name: "LoginPage" });
  } catch (error) {
    // Handle Yup validation errors
    if (error.inner) {
      error.inner.forEach((validationError) => {
        errorMessages.value[validationError.path] = validationError.message;
      });
    }

    // Handle server errors from Axios response
    if (error.response && error.response.data.errors) {
      const serverErrors = error.response.data.errors;
      Object.keys(serverErrors).forEach((key) => {
        errorMessages.value[key] = serverErrors[key][0];
      });
    }
  }
}
</script>

<template>
  <main class="">
    <section class="flex justify-center items-center h-screen w-full">
      <div class="p-10 shadow-2xl rounded-lg">
        <form @submit.prevent="handleRegister" class="flex flex-col gap-3">
          <div>
            <h1>Registration Page</h1>
            <p class="text-sm text-gray-500 dark:text-gray-300"></p>
          </div>

          <div class="flex flex-col gap-3">
            <div class="flex flex-col">
              <label for="name" class="text-base text-black">Name</label>
              <input
                type="text"
                id="name"
                v-model="formdata.name"
                class="outline-none border border-gray-100 py-2 px-4 rounded-md dark:border-gray-600 bg-transparent"
                placeholder="Enter your name"
              />
              <p v-if="errorMessages.name" class="text-red-500 text-sm">
                {{ errorMessages.name }}
              </p>
            </div>

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
              <p v-if="errorMessages.password" class="text-red-500 text-sm">
                {{ errorMessages.password }}
              </p>
            </div>

            <div class="flex flex-col">
              <label for="password_confirmation" class="text-base text-black"
                >Confirm Password</label
              >
              <input
                type="password"
                id="password_confirmation"
                v-model="formdata.password_confirmation"
                class="outline-none border border-gray-100 py-2 px-4 rounded-md dark:border-gray-600 bg-transparent"
                placeholder="Confirm your password"
              />
              <p
                v-if="errorMessages.password_confirmation"
                class="text-red-500 text-sm"
              >
                {{ errorMessages.password_confirmation }}
              </p>
            </div>
          </div>

          <div class="">
            <button class="bg-black text-white py-2 rounded-md border w-full">
              Register
            </button>
          </div>

          <div class="flex justify-end text-xs">
            Already have an account?
            <router-link to="/">
              <span class="font-semibold ml-2">Login</span>
            </router-link>
          </div>
        </form>
      </div>
    </section>
  </main>
</template>
