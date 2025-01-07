<template lang="pug">
    .flex.flex-col.justify-center.items-center.h-full
        h1.text-black Connect to your account
        form.flex.flex-col.mt-10.w-full(@submit.prevent="login" class="md:w-1/3")
            label.form-label.text-light(for="name") UserName
            input.form-control#name(type="text" placeholder="Enter your name" v-model="name")
            p.text-danger#name-error(v-if="errors.name") {{ errors.name }}
            label.form-label.text-light(for="password") Password
            input.form-control#email(type="password" placeholder="Enter your password" v-model="password" )
            p.text-danger(v-if="errors.password") {{ errors.password }}
            button.btn.btn-primary.mt-2(type="submit" :disabled="isSubmitting ") {{ isSubmitting ? 'Connecting...' : 'Login' }}
</template>

<script setup lang="ts">
import { useForm } from "vee-validate";
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
    resetForm();
  } catch (error) {
    console.error(error);
  }
});

const user = computed(() => authStore.user);
</script>
