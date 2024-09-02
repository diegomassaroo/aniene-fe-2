<script setup lang="ts">
const { locale, setLocaleCookie } = useI18n();

const switchLocale = (newLocale: string) => {
  locale.value = newLocale;
  setLocaleCookie(newLocale);
};

onMounted(() => {
  console.log('Current locale on mount:', locale.value);
});
</script>


<template>
  <div class="relative inline-flex leading-none md:p-3.5 h-fit justify-end md:justify-normal">
    <button 
      @click="switchLocale('en_US')"
      :class="{ 'text-blue': locale === 'en_US', 'text-black': locale !== 'en_US' }"
      class="text-small hover:text-blue cursor-pointer leading-0">
      EN
    </button>
    <span class="text-small leading-0">&nbsp;/&nbsp;</span>
    <button 
      @click="switchLocale('it_IT')"
      :class="{ 'text-blue': locale === 'it_IT', 'text-black': locale !== 'it_IT' }"
      class="text-small hover:text-blue cursor-pointer leading-0">
      IT
    </button>
  </div>
</template>