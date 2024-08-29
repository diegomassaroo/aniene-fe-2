<script setup>
const { cart } = useCart();
const props = defineProps({
  disabled: { type: Boolean, default: false },
});
const isLoading = ref(false);
const { t } = useI18n();
const addToCartButtonText = computed(() => (isLoading.value ? t('messages.shop.adding') : t('messages.shop.addToCart')));

// stop loading when cart is updated
watch(cart, (val) => {
  isLoading.value = false;
});
</script>

<template>
  <button
    type="submit"
    class="hover:text-blue text-body"
    :class="{ disabled: disabled }"
    :disabled="disabled"
    @click="isLoading = true">
    <span>{{ addToCartButtonText }}</span>
  </button>
</template>

<style lang="postcss" scoped>
button {
  outline: none !important;
  transition: all 150ms ease-in;
}

button.disabled {
  @apply cursor-not-allowed bg-gray-400;
}
</style>
