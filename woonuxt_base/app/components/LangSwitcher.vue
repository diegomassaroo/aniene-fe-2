<script setup>
// Get locale and functions from useI18n
const { locale, setLocale, setLocaleCookie } = useI18n();

// Use a ref to track the current locale
const currentLocale = ref(locale.value);

// Log the initial locale when the component is mounted
onMounted(() => {
  console.log('Initial locale:', locale.value);
});

// Watch for changes in locale and update cookie
watch(currentLocale, (newLocale) => {
  console.log('Locale changed to:', newLocale);
  setLocale(newLocale);
  setLocaleCookie(newLocale);
});

// Function to switch locale
const switchLocale = (newLocale) => {
  console.log('Switching locale to:', newLocale);
  currentLocale.value = newLocale; // This will trigger the watcher
};
</script>

<template>
  <div class="langSwitch relative inline-flex leading-none md:p-3.5 h-fit justify-end md:justify-normal">
    <button 
      @click="switchLocale('en_US')"
      :class="[locale === 'en_US' ? 'active' : '', 'text-small', 'text-black', 'hover:text-blue', 'cursor-pointer', 'leading-0']">
      EN
    </button>
    <span class="text-small leading-0">&nbsp;/&nbsp;</span>
    <button 
      @click="switchLocale('it_IT')"
      :class="[locale === 'it_IT' ? 'active' : '', 'text-small', 'text-black', 'hover:text-blue', 'cursor-pointer', 'leading-0']">
      IT
    </button>
  </div>
</template>


<style lang="postcss" scoped>
.langSwitch button.active {
  @apply text-blue;
}
</style>