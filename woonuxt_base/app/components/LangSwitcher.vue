<script setup lang="ts">
const { locale, setLocale, setLocaleCookie } = useI18n();
const currentLocale = ref(locale.value);

onMounted(() => {
  setLocale(currentLocale.value);
});

const switchLocale = (newLocale: string) => {
  currentLocale.value = newLocale;
  setLocale(newLocale);
  setLocaleCookie(newLocale);
};
</script>

<template>
  <div v-if="currentLocale" class="langSwitch relative inline-flex leading-none md:p-3.5 h-fit justify-end md:justify-normal">
    <button 
      @click="switchLocale('en_US')"
      :class="[currentLocale === 'en_US' ? 'active' : '', 'text-small', 'hover:text-blue', 'cursor-pointer', 'leading-0']">
      EN
    </button>
    <span class="text-small leading-0">&nbsp;/&nbsp;</span>
    <button 
      @click="switchLocale('it_IT')"
      :class="[currentLocale === 'it_IT' ? 'active' : '', 'text-small', 'hover:text-blue', 'cursor-pointer', 'leading-0']">
      IT
    </button>
  </div>
</template>


<style lang="postcss" scoped>
.langSwitch button.active {
  @apply text-blue;
}
</style>