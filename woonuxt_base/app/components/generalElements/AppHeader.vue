<script setup lang="ts">
const { isShowingSearch } = useSearching();
</script>

<template>
  <header class="sticky top-0 z-40 bg-white">
    <div class="p-3.5 flex md:grid md:grid-cols-10 justify-between md:justify-normal">
      <div class="flex items-center md:col-span-6 md:ml-12">
        <!-- <MenuTrigger class="lg:hidden" /> -->
        <Logo class="md:pt-2.5 md:px-3.5 md:pb-3.5" />
      </div>
      <div class="md:col-span-4 grid md:flex gap-2.5 content-end md:flex-wrap">
        <LangSwitcher />
        <div class="relative inline-flex leading-none h-fit md:p-3.5">
          <NuxtLink to="/information" class="hover:text-blue leading-0 h-fit justify-end md:justify-normal">{{ $t('messages.general.information') }}</NuxtLink>
        </div>
        <CartTrigger />
      </div>
    </div>
  </header>
</template>
