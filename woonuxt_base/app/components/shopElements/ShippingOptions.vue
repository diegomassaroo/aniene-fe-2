<script setup>
const { updateShippingMethod } = useCart();
const runtimeConfig = useRuntimeConfig();
const currencySymbol = runtimeConfig?.public?.CURRENCY_SYMBOL || '$';
const props = defineProps({
  options: { type: Array, required: true },
  activeOption: { type: String, required: true },
});

const setActiveOption = async (id) => {
  await updateShippingMethod(id);
};
</script>

<template>
  <div class="grid gap-4 mb-10 shipping-options">
    <div
      v-for="option in options"
      :key="option.id"
      class="flex items-center justify-between option"
      :class="{ 'active-option': option.id === activeOption }"
      @click="setActiveOption(option.id)">
      <div>
        <div class="text-sm leading-tight text-gray-500" v-html="option.label"></div>
        <div class="font-semibold text-gray-600">{{ currencySymbol }}{{ option.cost }}</div>
      </div>

      <icon name="ion:checkmark-circle" size="20" class="ml-auto text-blue checkmark" />
    </div>
  </div>
</template>

<style lang="postcss" scoped>
.shipping-options {
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));

  .option {
    @apply bg-white border text-gray-600 cursor-pointer flex flex-1 text-sm p-3.5 items-center ;

    &.active-option {
      @apply border-blue cursor-default pointer-events-none;

      & .checkmark {
        @apply opacity-100;
      }
    }
  }
}
</style>
