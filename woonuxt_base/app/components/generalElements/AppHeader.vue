<script setup lang="ts">
const { isShowingSearch } = useSearching();
</script>

<template>
  <header class="sticky top-0 z-40 bg-white">
    <div class="p-3.5 grid grid-cols-10">
      <div class="flex items-center col-span-6 ml-14">
        <!-- <MenuTrigger class="lg:hidden" /> -->
        <Logo class="p-2.5" />
      </div>
      <div class="col-span-4 flex gap-2.5 content-end flex-wrap">
        <LangSwitcher />
        <NuxtLink to="/information" class="leading-none h-fit p-2.5 hover:text-blue">{{ $t('messages.general.information') }}</NuxtLink>
        <CartTrigger />
      </div>
    </div>
  </header>
</template>
