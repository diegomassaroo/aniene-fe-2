<script setup>
const { locale, setLocaleCookie } = useI18n();

const switchLocale = (newLocale) => {
  locale.value = newLocale;
  setLocaleCookie(newLocale);
};
</script>


<template>
  <div class="relative inline-flex leading-none p-3.5 h-fit">
    <button 
      @click="switchLocale('en_US')"
      :class="{ 'text-blue': locale === 'en_US', 'text-black': locale !== 'en_US' }"
      class="hover:text-blue cursor-pointer leading-0">
      EN
    </button>
    <span class="leading-0">&nbsp;/&nbsp;</span>
    <button 
      @click="switchLocale('it_IT')"
      :class="{ 'text-blue': locale === 'it_IT', 'text-black': locale !== 'it_IT' }"
      class="hover:text-blue cursor-pointer leading-0">
      IT
    </button>
  </div>
</template>