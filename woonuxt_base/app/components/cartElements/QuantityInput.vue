<script setup lang="ts">
const { updateItemQuantity, isUpdatingCart } = useCart();
const { debounce } = useHelpers();

const { item } = defineProps({ item: { type: Object, required: true } });

const productType = computed(() => (item.variation ? item.variation?.node : item.product?.node));
const quantity = ref(item.quantity);
const hasNoMoreStock = computed(() => (productType.value.stockQuantity ? productType.value.stockQuantity <= quantity.value : false));

const incrementQuantity = () => quantity.value++;
const decrementQuantity = () => quantity.value--;

watch(
  quantity,
  debounce(() => {
    updateItemQuantity(item.key, quantity.value >= 0 ? quantity.value : 0);
  }, 250),
);

console.log(quantity.value);
</script>

<template>
  <div class="flex gap-8">
    <button
      title="Decrease Quantity"
      aria-label="Decrease Quantity"
      @click="decrementQuantity"
      type="button"
      class="text-blue focus:outline-none hover:text-black disabled:cursor-not-allowed"
      :disabled="isUpdatingCart || quantity <= 0">
      –
    </button>
    <!-- <input
      v-model.number="quantity"
      type="number"
      min="0"
      :max="productType.stockQuantity"
      aria-label="Quantity"
      class="text-blue flex items-center justify-center text-center focus:outline-none" /> -->
    <span class="text-blue">{{ quantity }}</span>
    <button
      title="Increase Quantity"
      aria-label="Increase Quantity"
      @click="incrementQuantity"
      type="button"
      class="text-blue focus:outline-none hover:text-black disabled:cursor-not-allowed"
      :disabled="isUpdatingCart || hasNoMoreStock">
      +
    </button>
  </div>
</template>

<style scoped lang="postcss">
input[type='number']::-webkit-inner-spin-button,
input[type='number']::-webkit-outer-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
input[type='number'] {
  -moz-appearance: textfield;
  appearance: textfield;
}
</style>
