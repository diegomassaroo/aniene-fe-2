<script setup>
import { Swiper, SwiperSlide } from 'swiper/vue';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';
const modules = [Navigation];

const props = defineProps({
  mainImage: { type: Object, required: true },
  gallery: { type: Object, required: true },
});

const primaryImage = computed(() => ({
  sourceUrl: props.mainImage.sourceUrl || FALLBACK_IMG,
  title: props.mainImage.title,
  altText: props.mainImage.altText,
  databaseId: props.mainImage.databaseId,
}));

const galleryImages = computed(() => {
  // Add the primary image to the start of the gallery and remove duplicates
  return [primaryImage.value, ...props.gallery.nodes].filter((img, index, self) => index === self.findIndex((t) => t?.databaseId === img?.databaseId));
});

const currentSlide = ref(1);
const totalSlides = ref(galleryImages.value.length);
// const totalSlides = ref(props.gallery.nodes.length);

const updateCurrentSlide = (swiper) => {
  const slideIndex = swiper.realIndex;
  currentSlide.value = slideIndex + 1;
};
</script>

<template>
  <swiper
    @slideChange="updateCurrentSlide"
    @swiper="updateCurrentSlide"
    :loop="true"
    :modules="modules"
    :navigation="{ prevEl: '.prevEl', nextEl: '.nextEl' }"
    :slides-per-view="1"
    :space-between="0"
    :speed="200"
    class="w-full h-fit">
    <swiper-slide v-for="picture in galleryImages"><img :src="picture.sourceUrl" /></swiper-slide>
    <div ref="pagEl" class="hidden md:block absolute w-full h-full top-0 z-10">
      <button class="prevEl w-1/2 h-full cursor-pointer"></button>
      <button class="nextEl w-1/2 h-full cursor-pointer"></button>
    </div>
    <div class="absolute bottom-2.5 right-2.5 z-10 text-small leading-0">
      <span>{{ currentSlide }}</span
      >/<span>{{ totalSlides }}</span>
    </div>
  </swiper>
</template>
