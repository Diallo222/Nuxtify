<template lang="pug">
  .px-5.py-16(class="md:px-10 lg:px-16" v-if="cart.length")
    .mb-10
      p.text-accent.text-xs.uppercase(class="tracking-[0.3em]") Checkout
      h1.font-display.font-extrabold.uppercase.tracking-tighter.text-5xl.mt-2(
        class="md:text-7xl"
      ) Complete the scene
      p.text-ash.mt-3 Demo payment only — no real charge.

      .flex.flex-wrap.gap-6.mt-8.text-xs.uppercase.tracking-widest
        button.pb-1.border-b-2.transition-colors(
          type="button"
          :class="step === 1 ? 'border-accent text-paper' : 'border-transparent text-ash'"
          @click="step = 1"
        ) 1 Shipping
        button.pb-1.border-b-2.transition-colors(
          type="button"
          :class="step === 2 ? 'border-accent text-paper' : 'border-transparent text-ash'"
          :disabled="!shippingReady"
          @click="goPayment"
        ) 2 Payment

    .grid.gap-12(class="lg:grid-cols-12")
      aside.space-y-4.h-fit(class="lg:col-span-5 lg:sticky lg:top-28 order-2 lg:order-1")
        h2.font-display.font-bold.uppercase.tracking-tight.text-xl Order
        .border-b.border-white-10.py-4.flex.gap-4(
          v-for="item in cart"
          :key="item.id"
        )
          NuxtImg.w-16.h-16.object-contain.bg-ink-muted.p-1.shrink-0(
            :src="item.image"
            :alt="item.title"
          )
          .min-w-0.flex-1
            p.font-display.font-bold.text-sm.line-clamp-2 {{ item.title }}
            p.text-ash.text-xs.mt-1 Qty {{ item.quantity || 1 }}
          p.font-display.font-bold.shrink-0 ${{ lineTotal(item) }}
        .space-y-2.pt-2.text-sm
          .flex.justify-between
            span.text-ash Subtotal
            span ${{ totalAmount.toFixed(2) }}
          .flex.justify-between
            span.text-ash Shipping
            span Free
          .flex.justify-between.items-center.border-t.border-white-10.pt-4
            span.font-display.font-bold.text-lg Total
            span.font-display.font-bold.text-2xl ${{ totalAmount.toFixed(2) }}

      .space-y-8(class="lg:col-span-7 order-1 lg:order-2")
        form.space-y-6(v-show="step === 1" @submit.prevent="onShippingContinue")
          h2.font-display.font-bold.uppercase.tracking-tight.text-xl Shipping
          CustomInput(
            v-model="fullName"
            label="Full name"
            placeholder="Alex Mercer"
            autocomplete="name"
            :error="shipErrors.fullName"
          )
          CustomInput(
            v-model="email"
            label="Email"
            type="email"
            placeholder="you@studio.com"
            autocomplete="email"
            :error="shipErrors.email"
          )
          CustomInput(
            v-model="phone"
            label="Phone"
            type="tel"
            placeholder="+1 555 0100"
            autocomplete="tel"
            :error="shipErrors.phone"
          )
          CustomInput(
            v-model="address"
            label="Address"
            placeholder="12 Stage Street"
            autocomplete="street-address"
            :error="shipErrors.address"
          )
          .grid.gap-4(class="sm:grid-cols-2")
            CustomInput(
              v-model="city"
              label="City"
              placeholder="New York"
              autocomplete="address-level2"
              :error="shipErrors.city"
            )
            CustomInput(
              v-model="postal"
              label="Postal code"
              placeholder="10001"
              autocomplete="postal-code"
              :error="shipErrors.postal"
            )
          CustomInput(
            v-model="country"
            label="Country"
            placeholder="United States"
            autocomplete="country-name"
            :error="shipErrors.country"
          )
          Magnetic(tag="div")
            button.w-full.bg-accent.text-ink.font-display.font-bold.uppercase.tracking-wide.py-4(
              type="submit"
              data-cursor="hover"
            ) Continue to payment

        form.space-y-6(v-show="step === 2" @submit.prevent="onPay")
          h2.font-display.font-bold.uppercase.tracking-tight.text-xl Payment
          p.text-ash.text-sm Demo card — use
            |
            span.text-paper.font-mono  4242 4242 4242 4242
          CustomInput(
            v-model="cardName"
            label="Name on card"
            placeholder="Cardholder name"
            autocomplete="cc-name"
            :error="payErrors.cardName"
          )
          CustomInput(
            v-model="cardNumberDisplay"
            label="Card number"
            placeholder="4242 4242 4242 4242"
            inputmode="numeric"
            autocomplete="cc-number"
            maxlength="19"
            :error="payErrors.cardNumber"
          )
          .grid.grid-cols-2.gap-4
            CustomInput(
              v-model="expiryDisplay"
              label="Expiry"
              placeholder="MM/YY"
              inputmode="numeric"
              autocomplete="cc-exp"
              maxlength="5"
              :error="payErrors.expiry"
            )
            CustomInput(
              v-model="cvc"
              label="CVC"
              placeholder="123"
              inputmode="numeric"
              autocomplete="cc-csc"
              maxlength="4"
              :error="payErrors.cvc"
            )
          .flex.flex-col.gap-3(class="sm:flex-row")
            button.w-full.border.border-white-20.text-paper.font-display.font-bold.uppercase.tracking-wide.py-4.transition(
              type="button"
              class="hover:border-accent hover:text-accent"
              data-cursor="hover"
              :disabled="processing"
              @click="step = 1"
            ) Back
            Magnetic.flex-1(tag="div")
              button.w-full.bg-accent.text-ink.font-display.font-bold.uppercase.tracking-wide.py-4(
                type="submit"
                data-cursor="hover"
                :disabled="processing"
              ) {{ processing ? 'Processing…' : `Pay $${totalAmount.toFixed(2)}` }}
</template>

<script setup lang="ts">
import { useForm } from "vee-validate";
import { toast } from "vue-sonner";
import * as yup from "yup";
import { useCartStore } from "~/stores/cart";
import type Product from "~/stores/types";

const cartStore = useCartStore();
const router = useRouter();

const cart = computed(() => cartStore.basket);
const totalAmount = computed(() => cartStore.totalAmount());
const step = ref(1);
const shippingReady = ref(false);
const processing = ref(false);

const shippingSnapshot = ref({
  fullName: "",
  email: "",
  phone: "",
  address: "",
  city: "",
  postal: "",
  country: "",
});

const lineTotal = (item: Product) =>
  ((item.price || 0) * (item.quantity || 1)).toFixed(2);

const shippingSchema = yup.object({
  fullName: yup.string().required("Full name is required"),
  email: yup.string().email("Enter a valid email").required("Email is required"),
  phone: yup.string().required("Phone is required"),
  address: yup.string().required("Address is required"),
  city: yup.string().required("City is required"),
  postal: yup.string().required("Postal code is required"),
  country: yup.string().required("Country is required"),
});

const paymentSchema = yup.object({
  cardName: yup.string().required("Name on card is required"),
  cardNumber: yup
    .string()
    .required("Card number is required")
    .test("digits", "Enter at least 12 digits", (v) => {
      const digits = (v || "").replace(/\D/g, "");
      return digits.length >= 12 && digits.length <= 19;
    }),
  expiry: yup
    .string()
    .required("Expiry is required")
    .matches(/^(0[1-9]|1[0-2])\/\d{2}$/, "Use MM/YY"),
  cvc: yup
    .string()
    .required("CVC is required")
    .matches(/^\d{3,4}$/, "Enter 3–4 digits"),
});

const {
  errors: shipErrors,
  defineField: defineShip,
  handleSubmit: handleShip,
  values: shipValues,
} = useForm({
  validationSchema: shippingSchema,
  initialValues: {
    fullName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    postal: "",
    country: "",
  },
});

const [fullName] = defineShip("fullName");
const [email] = defineShip("email");
const [phone] = defineShip("phone");
const [address] = defineShip("address");
const [city] = defineShip("city");
const [postal] = defineShip("postal");
const [country] = defineShip("country");

const {
  errors: payErrors,
  defineField: definePay,
  handleSubmit: handlePay,
  setFieldValue: setPayField,
  values: payValues,
} = useForm({
  validationSchema: paymentSchema,
  initialValues: {
    cardName: "",
    cardNumber: "",
    expiry: "",
    cvc: "",
  },
});

const [cardName] = definePay("cardName");
const [cvc] = definePay("cvc");
definePay("cardNumber");
definePay("expiry");

const formatCard = (raw: string) => {
  const digits = raw.replace(/\D/g, "").slice(0, 16);
  return digits.replace(/(\d{4})(?=\d)/g, "$1 ").trim();
};

const formatExpiry = (raw: string) => {
  const digits = raw.replace(/\D/g, "").slice(0, 4);
  if (digits.length <= 2) return digits;
  return `${digits.slice(0, 2)}/${digits.slice(2)}`;
};

const cardNumberDisplay = computed({
  get: () => formatCard(payValues.cardNumber || ""),
  set: (v: string) => {
    setPayField("cardNumber", v.replace(/\D/g, "").slice(0, 16));
  },
});

const expiryDisplay = computed({
  get: () => formatExpiry(payValues.expiry || ""),
  set: (v: string) => {
    setPayField("expiry", formatExpiry(v));
  },
});

const onShippingContinue = handleShip(() => {
  shippingSnapshot.value = {
    fullName: shipValues.fullName,
    email: shipValues.email,
    phone: shipValues.phone,
    address: shipValues.address,
    city: shipValues.city,
    postal: shipValues.postal,
    country: shipValues.country,
  };
  shippingReady.value = true;
  step.value = 2;
});

const goPayment = () => {
  if (shippingReady.value) step.value = 2;
};

const onPay = handlePay(async () => {
  if (!cart.value.length) {
    toast.error("Your cart is empty.");
    return navigateTo("/cart");
  }
  processing.value = true;
  try {
    await new Promise((r) => setTimeout(r, 700));
    cartStore.placeOrder(shippingSnapshot.value);
    toast.success("Payment successful");
    await navigateTo("/cart/thank-you");
  } finally {
    processing.value = false;
  }
});

onMounted(() => {
  if (!cartStore.basket.length) {
    navigateTo("/cart");
  }
});

watch(
  () => cartStore.basket.length,
  (len) => {
    if (len === 0 && !cartStore.lastOrder) {
      navigateTo("/cart");
    }
  }
);
</script>

<style scoped>
.border-white-10 {
  border-color: color-mix(in srgb, white 20%, transparent);
}
.border-white-20 {
  border-color: color-mix(in srgb, white 20%, transparent);
}
</style>
