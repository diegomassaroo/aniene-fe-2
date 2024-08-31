<script lang="ts" setup>
const { updateShippingLocation } = useCheckout();

const props = defineProps({
  modelValue: { type: Object, required: true },
});

const shipping = toRef(props, 'modelValue');
</script>

<template>
  <div class="grid w-full gap-3.5 lg:grid-cols-2">
    <div class="w-full">
      <!-- <label for="first-name">{{ $t('messages.billing.firstName') }}</label> -->
      <input id="first-name" v-model="shipping.firstName" :placeholder="$t('messages.billing.firstName')" autocomplete="given-name" type="text" required />
    </div>

    <div class="w-full">
      <!-- <label for="last-name">{{ $t('messages.billing.lastName') }}</label> -->
      <input id="last-name" v-model="shipping.lastName" :placeholder="$t('messages.billing.lastName')" autocomplete="family-name" type="text" required />
    </div>

    <div class="w-full col-span-full">
      <!-- <label for="address1">{{ $t('messages.billing.address1') }}</label> -->
      <input id="address1" v-model="shipping.address1" :placeholder="$t('messages.billing.address1')" autocomplete="street-address" type="text" required />
    </div>

    <div class="w-full col-span-full">
      <!-- <label for="address2">{{ $t('messages.billing.address2') }} ({{ $t('messages.general.optional') }})</label> -->
      <input id="address2" v-model="shipping.address2" :placeholder="$t('messages.billing.address2')" autocomplete="address-line2" type="text" />
    </div>

    <div class="w-full">
      <!-- <label for="city">{{ $t('messages.billing.city') }}</label> -->
      <input id="city" v-model="shipping.city" :placeholder="$t('messages.billing.city')" autocomplete="locality" type="text" required />
    </div>

    <div class="w-full">
      <!-- <label for="state">{{ $t('messages.billing.state') }} ({{ $t('messages.general.optional') }})</label> -->
      <StateSelect id="state" v-model="shipping.state" :default-value="shipping.state" :country-code="shipping.country" @change="updateShippingLocation" />
    </div>

    <div class="w-full">
      <!-- <label for="country">{{ $t('messages.billing.country') }}</label> -->
      <CountrySelect id="country" v-model="shipping.country" :default-value="shipping.country" @change="updateShippingLocation" />
    </div>

    <div class="w-full">
      <!-- <label for="zip">{{ $t('messages.billing.zip') }}</label> -->
      <input id="zip" v-model="shipping.postcode" :placeholder="$t('messages.billing.zip')" autocomplete="postal-code" type="text" required />
    </div>

    <div class="w-full col-span-full">
      <!-- <label for="phone">{{ $t('messages.billing.phone') }} ({{ $t('messages.general.optional') }})</label> -->
      <input id="phone" v-model="shipping.phone" :placeholder="$t('messages.billing.phone')" autocomplete="tel" type="tel" />
    </div>
  </div>
</template>
