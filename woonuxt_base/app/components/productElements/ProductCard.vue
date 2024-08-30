<script setup lang="ts">
import { StockStatusEnum, ProductTypesEnum, type AddToCartInput } from '#woo';
import { ref, computed, watch, onMounted } from 'vue';

const route = useRoute();
const { storeSettings } = useAppConfig();
const { arraysEqual, formatArray, checkForVariationTypeOfAny } = useHelpers();
const { addToCart, isUpdatingCart } = useCart();
const { t } = useI18n();

const props = defineProps({
  node: { type: Object as PropType<Product>, required: true },
  index: { type: Number, default: 1 },
});

// Example: ?filter=pa_color[green,blue],pa_size[large]
const filterQuery = ref(route.query?.filter as string);
const paColor = ref(filterQuery.value?.split('pa_color[')[1]?.split(']')[0]?.split(',') || []);

// Watch filterQuery
watch(
  () => route.query,
  () => {
    filterQuery.value = route.query.filter as string;
    paColor.value = filterQuery.value?.split('pa_color[')[1]?.split(']')[0]?.split(',') || [];
  },
);

// Product and variations related logic
const product = ref<Product>(props.node);
const quantity = ref<number>(1);
const activeVariation = ref<Variation | null>(null);
const variation = ref<VariationAttribute[]>([]);
const indexOfTypeAny = ref<number[]>([]);
const attrValues = ref();

const isSimpleProduct = computed<boolean>(() => product.value?.type === ProductTypesEnum.SIMPLE);
const isVariableProduct = computed<boolean>(() => product.value?.type === ProductTypesEnum.VARIABLE);
const isExternalProduct = computed<boolean>(() => product.value?.type === ProductTypesEnum.EXTERNAL);

const type = computed(() => activeVariation.value || product.value);
const selectProductInput = computed<any>(() => ({ productId: type.value?.databaseId, quantity: quantity.value })) as ComputedRef<AddToCartInput>;

const mergeLiveStockStatus = (payload: Product): void => {
  product.value.stockStatus = payload.stockStatus ?? product.value?.stockStatus;

  payload.variations?.nodes?.forEach((variation: Variation, index: number) => {
    if (product.value?.variations?.nodes[index]) {
      product.value.variations.nodes[index].stockStatus = variation.stockStatus;
    }
  });
};

onMounted(async () => {
  try {
    const { product } = await GqlGetStockStatus({ slug: props.node.slug });
    if (product) mergeLiveStockStatus(product as Product);
  } catch (error: any) {
    const errorMessage = error?.gqlErrors?.[0].message;
    if (errorMessage) console.error(errorMessage);
  }
  if (product.value?.variations) indexOfTypeAny.value.push(...checkForVariationTypeOfAny(product.value));
});

const updateSelectedVariations = (variations: VariationAttribute[]): void => {
  if (!product.value.variations) return;

  attrValues.value = variations.map((el) => ({ attributeName: el.name, attributeValue: el.value }));
  const cloneArray = JSON.parse(JSON.stringify(variations));
  const getActiveVariation = product.value.variations?.nodes.filter((variation: any) => {
    if (variation.attributes) {
      indexOfTypeAny.value.forEach((index) => (cloneArray[index].value = ''));
      return arraysEqual(formatArray(variation.attributes.nodes), formatArray(cloneArray));
    }
  });

  activeVariation.value = getActiveVariation[0];
  selectProductInput.value.variationId = activeVariation.value?.databaseId ?? null;
  selectProductInput.value.variation = activeVariation.value ? attrValues.value : null;
  variation.value = variations;
};

const stockStatus = computed(() => {
  if (isVariableProduct.value) return activeVariation.value?.stockStatus || StockStatusEnum.OUT_OF_STOCK;
  return type.value?.stockStatus || StockStatusEnum.OUT_OF_STOCK;
});

const disabledAddToCart = computed(() => {
  if (isSimpleProduct.value) return !type.value || stockStatus.value === StockStatusEnum.OUT_OF_STOCK || isUpdatingCart.value;
  return !type.value || stockStatus.value === StockStatusEnum.OUT_OF_STOCK || !activeVariation.value || isUpdatingCart.value;
});

// Image logic based on selected color variations
const mainImage = computed<string>(() => props.node?.image?.producCardSourceUrl || props.node?.image?.sourceUrl || '/images/placeholder.jpg');
const imagetoDisplay = computed<string>(() => {
  if (paColor.value.length) {
    const activeColorImage = props.node?.variations?.nodes.filter((variation) => {
      const hasMatchingAttributes = variation.attributes?.nodes.some((attribute) => paColor.value.some((color) => attribute?.value?.includes(color)));
      const hasMatchingSlug = paColor.value.some((color) => variation.slug?.includes(color));
      return hasMatchingAttributes || hasMatchingSlug;
    });
    if (activeColorImage?.length) return activeColorImage[0]?.image?.producCardSourceUrl || activeColorImage[0]?.image?.sourceUrl || mainImage.value;
  }
  return mainImage.value;
});
</script>

<template>
  <div class="grid md:grid-cols-10 gap-y-2.5">
    <SwiperCard class="md:col-span-6" :main-image="node.image" :gallery="node.galleryImages!" />
    <div class="md:col-span-4 p-3.5 pt-0.5 gap-y-6 grid">
      <div>
        <h3 class="absolute">{{ node.booknumber?.number }}</h3>
        <h3 class="pl-18">{{ node.name }}</h3>
        <h3 class="pl-18">{{ node.bookauthor?.author }}</h3>
        <div class="pl-18 text-body" v-html="node.shortDescription"></div>
      </div>
      <div>
        <div class="text-body" v-html="node.description"></div>
      </div>
      <div class="pl-18">
        <ProductPrice :sale-price="node.salePrice" :regular-price="node.regularPrice" />
        <form @submit.prevent="addToCart(selectProductInput)">
          <AddToCartButton :product-id="node.id" :disabled="disabledAddToCart" :class="{ loading: isUpdatingCart }" />
        </form>
      </div>
    </div>
  </div>
</template>
