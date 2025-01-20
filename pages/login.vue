<template lang="pug">
    .container.mx-auto.py-12.px-4(class="md:px-8 lg:px-16")
      .text-center.mb-8
        h1.text-3xl.font-bold.text-gray-800.uppercase(class="md:text-5xl") Login
        p.text-lg.text-gray-600.mt-4(class="md:text-xl")
          | Welcome back! Please log in to access your account.
        form.bg-white.shadow-md.p-6.space-y-6.max-w-2xl.mx-auto(@submit.prevent="login")
          .space-y-4
            label.block.text-sm.text-left.font-medium.text-gray-700(for="name") UserName
            input#name.border.border-gray-300.w-full.p-3(class="focus:outline-none focus:ring-2 focus:ring-black" placeholder="Enter your name" v-model="name")
            p.text-danger#name-error(v-if="errors.name") {{ errors.name }}

            label.block.text-sm.text-left.font-medium.text-gray-700(for="password") Password
            input#password.border.border-gray-300.w-full.p-3( class="focus:outline-none focus:ring-2 focus:ring-black" type="password" placeholder="Enter your password" v-model="password" )
            p.text-danger(v-if="errors.password") {{ errors.password }}
          button.bg-zinc-900.text-white.font-semibold.py-2.px-4.w-full.transition(class="hover:scale-105" type="submit" :disabled="isSubmitting ") {{ isSubmitting ? 'Connecting...' : 'Login' }}
</template>

<script setup lang="ts">
import { useForm } from "vee-validate";
import { useToast } from "vue-toastification";
import * as yup from "yup";
import { useAuthStore } from "@/store/auth";

const authStore = useAuthStore();

const formSchema = yup.object().shape({
  name: yup.string().required("Name is required"),
  password: yup.string().required("Password is required"),
});

const { errors, defineField, resetForm, handleSubmit, isSubmitting, values } =
  useForm({
    validationSchema: formSchema,
    initialValues: {
      name: "johnd",
      password: "m38rmF$",
    },
  });
const [name, nameProps] = defineField("name");
const [password, passwordProps] = defineField("password");

const login = handleSubmit(async () => {
  try {
    await authStore.login(values.name, values.password);
    useToast().success("Login successfully.");
    resetForm();
  } catch (error) {
    useToast().error("Login failed.");
    console.error(error);
  }
});

const user = computed(() => authStore.user);
</script>
