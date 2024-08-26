<script setup lang="ts">
const { isShowingSearch } = useSearching();
</script>

<template>
  <header class="sticky top-0 z-40 bg-white shadow-sm shadow-light-500">
    <div class="container flex items-center justify-between py-4">
      <div class="flex items-center">
        <!-- <MenuTrigger class="lg:hidden" /> -->
        <Logo />
      </div>
      <NuxtLink to="/information">{{ $t('messages.general.information') }}</NuxtLink>
      <CartTrigger />
    </div>
  </header>
</template>
