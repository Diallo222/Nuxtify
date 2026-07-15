<template lang="pug">
  .px-5.py-16.flex.items-center.justify-center(class="min-h-[70vh] md:px-10")
    .w-full.max-w-md.space-y-10
      div
        p.text-accent.text-xs.uppercase(class="tracking-[0.3em]") Account
        h1.font-display.font-extrabold.uppercase.tracking-tighter.text-5xl.mt-3 Login
        p.text-ash.mt-3.text-sm Demo credentials are prefilled (Fake Store API).
      form.space-y-8(@submit.prevent="login")
        CustomInput(v-model="name" label="Username" placeholder="johnd")
        p.text-red-400.text-xs(v-if="errors.name") {{ errors.name }}
        CustomInput(v-model="password" label="Password" type="password" placeholder="••••••••")
        p.text-red-400.text-xs(v-if="errors.password") {{ errors.password }}
        Magnetic(tag="div")
          button.w-full.bg-accent.text-ink.font-display.font-bold.uppercase.tracking-wide.py-4(
            type="submit"
            :disabled="isSubmitting"
            data-cursor="hover"
          ) {{ isSubmitting ? 'Connecting…' : 'Login' }}
      p.text-ash.text-sm
        | No account?
        |
        NuxtLink.text-paper.underline.underline-offset-4(to="/register" class="hover:text-accent") Register
</template>

<script setup lang="ts">
import { useForm } from "vee-validate";
import { toast } from "vue-sonner";
import * as yup from "yup";
import { useAuthStore } from "@/stores/auth";

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

const [name] = defineField("name");
const [password] = defineField("password");

const login = handleSubmit(async () => {
  try {
    await authStore.login(values.name, values.password);
    toast.success("Login successful.");
    resetForm();
    const route = useRoute();
    const redirect = String(route.query.redirect || "");
    const safe =
      redirect.startsWith("/") && !redirect.startsWith("//") ? redirect : "/";
    navigateTo(safe);
  } catch (error) {
    toast.error("Login failed.");
    console.error(error);
  }
});
</script>
