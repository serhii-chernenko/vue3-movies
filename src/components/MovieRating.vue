<script setup>
import { StarIcon } from "@heroicons/vue/24/solid";

const props = defineProps({
  rating: {
    type: Number,
    required: true,
  },
});
</script>

<template>
  <div
      v-if="rating"
      class="absolute z-20 top-2 right-2 flex items-center"
    >
      <StarIcon class="relative z-10 w-12 h-12 text-yellow-300" />
      <span
        class="absolute z-20 top-0 left-0 w-full h-full flex items-center justify-center"
        >{{ rating }}</span
      >
    </div>
</template>
