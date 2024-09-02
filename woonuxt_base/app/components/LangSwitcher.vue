<script setup>
const { locale, setLocaleCookie } = useI18n();

const switchLocale = (newLocale) => {
  locale.value = newLocale;
  setLocaleCookie(newLocale);
};

// Computed properties to determine button classes
const enButtonClass = computed(() => ({
  'text-blue': locale.value === 'en_US',
  'text-black': locale.value !== 'en_US'
}));

const itButtonClass = computed(() => ({
  'text-blue': locale.value === 'it_IT',
  'text-black': locale.value !== 'it_IT'
}));
</script>


<template>
  <div class="relative inline-flex leading-none md:p-3.5 h-fit justify-end md:justify-normal">
    <button 
      @click="switchLocale('en_US')"
      :class="enButtonClass"
      class="text-small hover:text-blue cursor-pointer leading-0">
      EN
    </button>
    <span class="text-small leading-0">&nbsp;/&nbsp;</span>
    <button 
      @click="switchLocale('it_IT')"
      :class="itButtonClass"
      class="text-small hover:text-blue cursor-pointer leading-0">
      IT
    </button>
  </div>
</template>