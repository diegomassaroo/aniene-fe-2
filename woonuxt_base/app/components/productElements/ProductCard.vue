<script setup lang="ts">
const route = useRoute();

const { storeSettings } = useAppConfig();

const props = defineProps({
  node: { type: Object as PropType<Product>, required: true },
  index: { type: Number, default: 1 },
});

// example: ?filter=pa_color[green,blue],pa_size[large]
const filterQuery = ref(route.query?.filter as string);
const paColor = ref(filterQuery.value?.split('pa_color[')[1]?.split(']')[0]?.split(',') || []);

// watch filterQuery
watch(
  () => route.query,
  () => {
    filterQuery.value = route.query.filter as string;
    paColor.value = filterQuery.value?.split('pa_color[')[1]?.split(']')[0]?.split(',') || [];
  },
);

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
  <div class="grid grid-cols-10">
    <SwiperCard class="col-span-6" :main-image="node.image" :gallery="node.galleryImages!" />
    <div class="col-span-4 p-3.5 pt-0.5 gap-y-6 grid">
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
        <AddToCartButton :product-id="node.id" :disabled="disabledAddToCart" :class="{ loading: isUpdatingCart }" />
      </div>
    </div>
  </div>
</template>
