<script setup>
import { computed } from "vue";

const props = defineProps({
  genres: {
    type: Array,
    required: true,
  },
});

const isExisting = computed(() => props.genres.length);
</script>

<template>
  <ul v-if="isExisting" class="flex flex-wrap my-4">
    <li
      v-for="(genre, index) in genres"
      :key="index"
      class="bg-violet-500 text-white rounded-full px-2 py-0.25 mr-1 mb-1"
    >
      {{ genre }}
    </li>
  </ul>
</template>
