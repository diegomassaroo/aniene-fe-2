<script setup>
const { toggleCart, cart } = useCart();
</script>

<template>
  <div class="relative cursor-pointer inline-flex hover:text-blue md:p-3.5 justify-end md:justify-normal" title="Cart" @click="toggleCart">
    <NuxtLink class="text-small leading-none leading-0 h-fit">{{ $t('messages.shop.cart') }}</NuxtLink>
    <ClientOnly>
      <Transition name="popIn" mode="out-in">
        <span class="text-small leading-none leading-0 h-fit" v-if="cart?.contents?.itemCount > 0">&numsp;{{ cart?.contents?.itemCount }}</span>
      </Transition>
    </ClientOnly>
  </div>
</template>

<style lang="postcss">
/* popIn */
.popIn-enter-active,
.popIn-leave-active {
  transition: all 200ms cubic-bezier(0, 0, 0.57, 1.61);
}

.popIn-enter-from,
.popIn-leave-to {
  transform: scale(0);
}
</style>
