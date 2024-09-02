<script setup lang="ts">
const { locale, setLocaleCookie } = useI18n();

const checkLangSelEn = ref(false);
const checkLangSelIt = ref(false);

const switchLocale = (newLocale: string) => {
  locale.value = newLocale;
  setLocaleCookie(newLocale);
};

const updateActiveButton = (val: string) => {
  checkLangSelEn.value = val === 'en_US';
  checkLangSelIt.value = val === 'it_IT';
};

watch(
  locale,
  (newLocale: string) => {
    updateActiveButton(newLocale);
  },
  { immediate: true } // Ensure that the watcher runs immediately with the current value.
);

// Initialize visibility based on the current locale when the component is mounted.
onMounted(() => {
  updateActiveButton(locale.value);
});
</script>

<template>
  <div class="relative inline-flex leading-none md:p-3.5 h-fit justify-end md:justify-normal">
    <button 
      @click="switchLocale('en_US')"
      :class="[checkLangSelEn ? 'text-blue' : 'text-black', 'text-small', 'hover:text-blue', 'cursor-pointer', 'leading-0']">
      EN
    </button>
    <span class="text-small leading-0">&nbsp;/&nbsp;</span>
    <button 
      @click="switchLocale('it_IT')"
      :class="[checkLangSelIt ? 'text-blue' : 'text-black', 'text-small', 'hover:text-blue', 'cursor-pointer', 'leading-0']">
      IT
    </button>
  </div>
</template>
