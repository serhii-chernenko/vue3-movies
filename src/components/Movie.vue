<script setup>
import { PencilIcon, StarIcon, TrashIcon } from "@heroicons/vue/24/solid";
import { computed } from "vue";

const props = defineProps([
  "movie",
  "index",
  "showMoviesPerRowOnDesktop",
  "maxRating",
]);

defineEmits(["movieEdit", "movieRemove"]);

const starClasses = computed(() => {
  return (star, rating) => {
    return star <= rating ? "text-violet-500" : "text-gray-300";
  };
});
const imageLoadingType = computed(() => {
  return (index) => {
    return index < props.showMoviesPerRowOnDesktop ? "eager" : "lazy";
  };
});
const imageFetchPriority = computed(() => {
  return (index) => {
    return index < props.showMoviesPerRowOnDesktop ? "high" : "low";
  };
});
const rate = (star, movie) => {
  movie.rating = star;
};
</script>

<template>
  <li class="flex">
    <div class="flex flex-col rounded-xl overflow-hidden bg-white">
      <div class="relative group overflow-hidden">
        <div
          v-if="movie.rating"
          class="absolute z-20 top-2 right-2 flex items-center"
        >
          <StarIcon class="relative z-10 w-12 h-12 text-yellow-300" />
          <span
            class="absolute z-20 top-0 left-0 w-full h-full flex items-center justify-center"
            >{{ movie.rating }}</span
          >
        </div>
        <img
          :src="movie.image"
          :alt="movie.name"
          width="200"
          height="284"
          :loading="imageLoadingType(index)"
          :fetchpriority="imageFetchPriority(index)"
          class="relative z-10 w-full mx-auto h-auto ratio-2/3 object-cover transition duration-500 ease-in-out transform group-hover:scale-110"
        />
      </div>
      <div class="flex flex-col flex-grow p-4">
        <div class="flex-grow mb-4">
          <p class="mb-1">
            <strong class="text-2xl">{{ movie.name }}</strong>
          </p>
          <ul v-if="movie.genres" class="flex flex-wrap mb-4">
            <li
              v-for="(genre, index) in movie.genres"
              :key="index"
              class="bg-violet-500 text-white rounded-full px-2 py-0.25 mr-1 mb-1"
            >
              {{ genre }}
            </li>
          </ul>
          <p>{{ movie.description }}</p>
        </div>
        <div class="flex justify-between">
          <div class="flex items-center">
            <strong>Rating: ({{ movie.rating }}/{{ maxRating }})</strong>
            <ul class="flex ml-1.5">
              <li
                v-for="star in maxRating"
                :key="star"
                class="flex items-center"
              >
                <template v-if="star !== movie.rating">
                  <button @click="rate(star, movie)">
                    <StarIcon
                      class="w-4 h-4"
                      :class="starClasses(star, movie.rating)"
                    />
                  </button>
                </template>
                <template v-else>
                  <StarIcon
                    class="w-4 h-4"
                    :class="starClasses(star, movie.rating)"
                  />
                </template>
              </li>
            </ul>
          </div>
          <div class="flex items-center">
            <button
              type="button"
              @click="$emit('movieEdit', movie.id)"
              class="btn-secondary w-10 h-10 !rounded-full flex items-center justify-center mr-2 !p-0"
              title="Edit movie"
            >
              <PencilIcon class="!w-4 !h-4" />
            </button>
            <button
              type="button"
              @click="$emit('movieRemove', movie.id)"
              class="btn-cancel w-10 h-10 !rounded-full flex items-center justify-center !p-0"
              title="Remove movie"
            >
              <TrashIcon class="!w-4 !h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  </li>
</template>
