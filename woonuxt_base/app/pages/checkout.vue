<script setup lang="ts">
import { loadStripe } from '@stripe/stripe-js';
import type { Stripe, StripeElements, CreateSourceData, StripeCardElement } from '@stripe/stripe-js';

const { t } = useI18n();
const { query } = useRoute();
const { cart, isUpdatingCart, paymentGateways } = useCart();
const { customer, viewer } = useAuth();
const { orderInput, isProcessingOrder, proccessCheckout } = useCheckout();
const runtimeConfig = useRuntimeConfig();
const stripeKey = runtimeConfig.public?.STRIPE_PUBLISHABLE_KEY || null;

const buttonText = ref<string>(isProcessingOrder.value ? t('messages.general.processing') : t('messages.shop.checkoutButton'));
const isCheckoutDisabled = computed<boolean>(() => isProcessingOrder.value || isUpdatingCart.value || !orderInput.value.paymentMethod);

const isInvalidEmail = ref<boolean>(false);
const stripe: Stripe | null = stripeKey ? await loadStripe(stripeKey) : null;
const elements = ref();
const isPaid = ref<boolean>(false);

onBeforeMount(async () => {
  if (query.cancel_order) window.close();
});

const payNow = async () => {
  buttonText.value = t('messages.general.processing');

  const { stripePaymentIntent } = await GqlGetStripePaymentIntent();
  const clientSecret = stripePaymentIntent?.clientSecret || '';

  try {
    if (orderInput.value.paymentMethod.id === 'stripe' && stripe && elements.value) {
      const cardElement = elements.value.getElement('card') as StripeCardElement;
      const { setupIntent } = await stripe.confirmCardSetup(clientSecret, { payment_method: { card: cardElement } });
      const { source } = await stripe.createSource(cardElement as CreateSourceData);

      if (source) orderInput.value.metaData.push({ key: '_stripe_source_id', value: source.id });
      if (setupIntent) orderInput.value.metaData.push({ key: '_stripe_intent_id', value: setupIntent.id });

      isPaid.value = setupIntent?.status === 'succeeded' || false;
      orderInput.value.transactionId = source?.created?.toString() || new Date().getTime().toString();
    }
  } catch (error) {
    console.error(error);
    buttonText.value = t('messages.shop.placeOrder');
  }

  proccessCheckout(isPaid.value);
};

const handleStripeElement = (stripeElements: StripeElements): void => {
  elements.value = stripeElements;
};

const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

const checkEmailOnBlur = (email?: string | null): void => {
  if (email) isInvalidEmail.value = !emailRegex.test(email);
};

const checkEmailOnInput = (email?: string | null): void => {
  if (email && isInvalidEmail.value) isInvalidEmail.value = !emailRegex.test(email);
};

useSeoMeta({
  title: t('messages.shop.checkout'),
});
</script>

<template>
  <div>
    <template v-if="cart && customer">
      <div v-if="cart.isEmpty" class="flex flex-col items-center justify-center flex-1 min-h-[600px] text-gray-300">
        <!-- <Icon name="ion:cart-outline" size="156" class="opacity-25 mb-5" /> -->
        <h2>{{ $t('messages.shop.cartEmpty') }}</h2>
        <span>{{ $t('messages.shop.addProductsInYourCart') }}</span>
        <!-- <NuxtLink
          to="/products"
          class="flex items-center justify-center gap-3 p-2 px-3 mt-4 text-center">
          {{ $t('messages.shop.browseOurProducts') }}
        </NuxtLink> -->
      </div>

      <form class="grid md:grid-cols-10 p-3.5 pt-10" v-else @submit.prevent="payNow">
        <div class="md:col-span-6 md:pl-3.5 md:ml-12 pt-0.5 checkout-form">
          <!-- Customer details -->
          <div v-if="!viewer && customer.billing">
            <p class="w-full mb-7">{{ $t('messages.billing.contact') }}</p>
            <div class="w-full mt-3.5">
              <!-- <label for="email">{{ $t('messages.billing.email') }}</label> -->
              <input
                v-model="customer.billing.email"
                :placeholder="$t('messages.billing.email')"
                autocomplete="email"
                type="email"
                name="email"
                :class="{ 'has-error': isInvalidEmail }"
                @blur="checkEmailOnBlur(customer.billing.email)"
                @input="checkEmailOnInput(customer.billing.email)"
                required />
              <Transition name="scale-y" mode="out-in">
                <div v-if="isInvalidEmail" class="mt-1 text-sm text-red-500">{{ $t('messages.billing.invalidemail') }}</div>
              </Transition>
            </div>
          </div>

          <div>
            <h2 class="w-full mt-10 mb-3.5">{{ $t('messages.billing.billingDetails') }}</h2>
            <BillingDetails v-model="customer.billing" />
          </div>

          <label v-if="cart.availableShippingMethods.length > 0" for="shipToDifferentAddress" class="mt-10 mb-5 flex items-center gap-3.5">
            <span>{{ $t('messages.billing.differentAddress') }}</span>
            <input id="shipToDifferentAddress" v-model="orderInput.shipToDifferentAddress" type="checkbox" name="shipToDifferentAddress" />
          </label>

          <Transition name="scale-y" mode="out-in">
            <div v-if="orderInput.shipToDifferentAddress">
              <h2 class="mb-3.5">{{ $t('messages.general.shippingDetails') }}</h2>
              <ShippingDetails v-model="customer.shipping" />
            </div>
          </Transition>

          <!-- Shipping methods -->
          <div v-if="cart.availableShippingMethods.length">
            <h3 class="mt-10 mb-3.5">{{ $t('messages.general.shippingSelect') }}</h3>
            <ShippingOptions :options="cart.availableShippingMethods[0].rates" :active-option="cart.chosenShippingMethods[0]" />
          </div>

          <!-- Pay methods -->
          <div v-if="paymentGateways?.nodes.length" class="col-span-full">
            <h2 class="mb-3.5">{{ $t('messages.billing.paymentOptions') }}</h2>
            <PaymentOptions v-model="orderInput.paymentMethod" class="mb-4" :paymentGateways />
            <StripeElement v-if="stripe" v-show="orderInput.paymentMethod.id == 'stripe'" :stripe @updateElement="handleStripeElement" />
          </div>

          <!-- Order note -->
          <div>
            <h2 class="mt-10 mb-3.5">{{ $t('messages.shop.orderNote') }} ({{ $t('messages.general.optional') }})</h2>
            <textarea
              id="order-note"
              v-model="orderInput.customerNote"
              name="order-note"
              class="w-full min-h-[100px]"
              rows="4"
              :placeholder="$t('messages.shop.orderNotePlaceholder')"></textarea>
          </div>
        </div>

        <OrderSummary>
          <button
            class="mt-3.5 pt-3 pb-2.5 w-full bg-blue text-white hover:bg-black disabled:cursor-not-allowed disabled:bg-gray-300"
            :disabled="isCheckoutDisabled">
            {{ buttonText }}<LoadingIcon v-if="isProcessingOrder" color="#fff" size="18" />
          </button>
        </OrderSummary>
      </form>
    </template>
    <LoadingIcon v-else class="m-auto" />
  </div>
</template>

<style lang="postcss">
.checkout-form input[type='text'],
.checkout-form input[type='email'],
.checkout-form input[type='tel'],
.checkout-form input[type='password'],
.checkout-form .StripeElement {
  @apply border-b border-black w-full py-0.5 outline-none;
}

.checkout-form select {
  @apply pt-1 pb-0.5 px-0 w-full rounded-none border-black border-t-0 border-x-0 border-b outline-none hover:bg-transparent text-black;
}

.checkout-form textarea {
  @apply border outline-none border-black w-full p-3.5;
}

.checkout-form input.has-error,
.checkout-form textarea.has-error {
  @apply border-red-500;
}

.checkout-form .StripeElement {
  @apply py-2.5;
}
</style>
