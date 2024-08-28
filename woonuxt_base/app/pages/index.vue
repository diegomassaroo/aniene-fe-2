<script lang="ts" setup>
const { siteName, description, shortDescription, siteImage } = useAppConfig();

const { setProducts, updateProductList } = useProducts();
const route = useRoute();
const { storeSettings } = useAppConfig();
const { isQueryEmpty } = useHelpers();

const { data } = await useAsyncGql('getProducts');
const allProducts = (data.value?.products?.nodes || []) as Product[];
setProducts(allProducts);

onMounted(() => {
  if (!isQueryEmpty.value) updateProductList();
});

watch(
  () => route.query,
  () => {
    if (route.name !== 'products') return;
    updateProductList();
  },
);

useSeoMeta({
  title: `Aniene`,
  ogTitle: siteName,
  description: description,
  ogDescription: shortDescription,
  ogImage: siteImage,
  twitterCard: `summary_large_image`,
});

useHead({
  titleTemplate: `Aniene`,
});
</script>

<template>
  <main>
    <div class="w-full px-3.5 pt-10 pb-20">
      <ProductGrid />
    </div>
  </main>
</template>

<style scoped>
.brand img {
  max-height: min(8vw, 120px);
  object-fit: contain;
  object-position: center;
}
</style>
