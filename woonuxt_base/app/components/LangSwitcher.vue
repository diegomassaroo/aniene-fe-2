<script setup>
const { locale, setLocale } = useI18n();

const switchLocale = (newLocale) => {
  locale.value = newLocale;
  setLocale(newLocale);
  localStorage.setItem('user-locale', newLocale); // Store the locale in localStorage
};

onMounted(() => {
  const storedLocale = localStorage.getItem('user-locale');
  if (storedLocale) {
    locale.value = storedLocale;
    setLocale(storedLocale);
  }
});
</script>

<template>
  <div class="langSwitch relative inline-flex leading-none md:p-3.5 h-fit justify-end md:justify-normal">
    <button 
      @click="switchLocale('en_US')"
      :class="[locale === 'en_US' ? 'active' : '', 'text-small', 'hover:text-blue', 'cursor-pointer', 'leading-0']">
      EN
    </button>
    <span class="text-small leading-0">&nbsp;/&nbsp;</span>
    <button 
      @click="switchLocale('it_IT')"
      :class="[locale === 'it_IT' ? 'active' : '', 'text-small', 'hover:text-blue', 'cursor-pointer', 'leading-0']">
      IT
    </button>
  </div>
</template>


<style lang="postcss" scoped>
.langSwitch button.active {
  @apply text-blue;
}
</style>