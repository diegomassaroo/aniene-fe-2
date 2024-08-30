<script setup lang="ts">
const { cart, toggleCart, isUpdatingCart } = useCart();
</script>

<template>
  <div class="fixed top-0 bottom-0 right-0 z-50 p-3.5 flex flex-col w-full max-w-lg overflow-x-hidden bg-white shadow-lg">
    <div class="flex justify-between">
      <div>
        {{ $t('messages.shop.cart') }}
        <!-- <span v-if="cart?.contents?.productCount"> ({{ cart?.contents?.productCount }}) </span> -->
      </div>
      <CloseIcon size="34" @click="toggleCart(false)" />
    </div>

    <ClientOnly>
      <template v-if="cart && !cart.isEmpty">
        <ul class="grid my-3.5 flex-col flex-1 gap-5 overflow-y-scroll">
          <CartCard v-for="item in cart.contents?.nodes" :key="item.key" :item />
        </ul>
        <p>{{ $t('messages.shop.subtotal') }}</p>
        <div class="flex">
          <div v-html="cart.subtotal"></div>
          <span>&nbsp;{{ $t('messages.shop.calcShipping') }}</span>
        </div>
        <NuxtLink class="block text-blue hover:text-black" to="/checkout" @click.prevent="toggleCart()">
          <span>{{ $t('messages.shop.checkout') }}</span>
        </NuxtLink>
      </template>
      <!-- Empty Cart Message -->
      <EmptyCartMessage v-else-if="cart && cart.isEmpty" />
      <!-- Cart Loading -->
      <div v-else class="flex flex-col items-center justify-center flex-1 mb-20">
        <LoadingIcon />
      </div>
    </ClientOnly>
    <!-- Cart Loading Overlay -->
    <!-- <div v-if="isUpdatingCart" class="absolute inset-0 flex items-center justify-center bg-white">
      <LoadingIcon />
    </div> -->
  </div>
</template>
