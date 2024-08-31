<script setup>
const { cart, isUpdatingCart } = useCart();
</script>

<template>
  <aside v-if="cart" class="md:col-span-4 md:sticky p-3.5 pt-0.5">
    <h2 class="mb-7">{{ $t('messages.shop.orderSummary') }}</h2>

    <ul class="flex flex-col gap-3.5 overflow-y-auto">
      <CartCard v-for="item in cart.contents.nodes" :key="item.key" :item />
    </ul>

    <!-- <AddCoupon class="my-8" /> -->

    <div class="grid gap-1 mt-7">
      <div class="flex justify-between">
        <span>{{ $t('messages.shop.subtotal') }}</span>
        <span class="tabular-nums" v-html="cart.subtotal" />
      </div>
      <div class="flex justify-between">
        <span>{{ $t('messages.general.shipping') }}</span>
        <span class="text-black tabular-nums">+ <span v-html="cart.shippingTotal" /></span>
      </div>
      <!-- <Transition name="scale-y" mode="out-in">
        <div v-if="cart && cart.appliedCoupons" class="flex justify-between">
          <span>{{ $t('messages.shop.discount') }}</span>
          <span class="text-primary tabular-nums">- <span v-html="cart.discountTotal" /></span>
        </div>
      </Transition> -->
      <div class="flex justify-between mt-3.5">
        <span>{{ $t('messages.shop.total') }}</span>
        <span class=" tabular-nums" v-html="cart.total" />
      </div>
    </div>

    <slot></slot>

    <div v-if="isUpdatingCart" class="absolute inset-0 flex items-center justify-center bg-white bg-opacity-50">
      <LoadingIcon />
    </div>
  </aside>
</template>
