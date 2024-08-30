<script setup>
const { updateItemQuantity } = useCart();
const { addToWishlist } = useWishlist();
const { FALLBACK_IMG } = useHelpers();
const { storeSettings } = useAppConfig();

const { item } = defineProps({
  item: { type: Object, required: true },
});

const productType = computed(() => (item.variation ? item.variation?.node : item.product?.node));
const productSlug = computed(() => `/product/${decodeURIComponent(item.product.node.slug)}`);
const isLowStock = computed(() => (productType.value.stockQuantity ? productType.value.lowStockAmount >= productType.value.stockQuantity : false));
const imgScr = computed(() => productType.value.image?.cartSourceUrl || productType.value.image?.sourceUrl || item.product.image?.sourceUrl || FALLBACK_IMG);
const regularPrice = computed(() => parseFloat(productType.value.rawRegularPrice));
const salePrice = computed(() => parseFloat(productType.value.rawSalePrice));
const salePercentage = computed(() => Math.round(((regularPrice.value - salePrice.value) / regularPrice.value) * 100) + '%');

const removeItem = () => {
  updateItemQuantity(item.key, 0);
};

const moveToWishList = () => {
  addToWishlist(item.product.node);
  removeItem();
};
</script>

<template>
    <div v-if="productType" class="flex items-center gap-3">
      <div class="flex-1">
        <div class="flex gap-x-2 gap-y-1 flex-wrap items-center">
          <NuxtLink class="leading-tight" :to="productSlug">{{ productType.name }}</NuxtLink>
          <span v-if="productType.salePrice" class="text-[10px] border-green-200 leading-none bg-green-100 inline-block p-0.5 rounded text-green-600 border">
            Save {{ salePercentage }}
          </span>
        </div>
        <ProductPrice class="mt-1 text-xs" :sale-price="productType.salePrice" :regular-price="productType.regularPrice" />
      </div>
      <div class="inline-flex gap-2 flex-col items-end">
        <QuantityInput :item />
        <div class="text-xs text-gray-400 group-hover:text-gray-700 flex leading-none items-center">
          <button
            title="Remove Item"
            aria-label="Remove Item"
            @click="removeItem"
            type="button"
            class="flex items-center gap-1 hover:text-red-500 cursor-pointer">
            {{ $t('messages.shop.remove') }}
          </button>
        </div>
      </div>
    </div>
</template>
