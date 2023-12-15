<script setup>
import { PencilIcon, StarIcon, TrashIcon } from "@heroicons/vue/24/solid";
import MovieRating from "../components/MovieRating.vue";
import MovieGenres from "../components/MovieGenres.vue";
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
        <MovieRating :rating="movie.rating" />
        <router-link :to="`/movie/${movie.id}`">
          <img
            :src="movie.image"
            :alt="movie.name"
            width="200"
            height="284"
            :loading="imageLoadingType(index)"
            :fetchpriority="imageFetchPriority(index)"
            class="relative z-10 w-full mx-auto h-auto ratio-2/3 object-cover transition duration-500 ease-in-out transform group-hover:scale-110"
          />
        </router-link>
      </div>
      <div class="flex flex-col flex-grow p-4">
        <div class="flex-grow mb-4">
          <div class="mt-1">
            <router-link :to="`/movie/${movie.id}`" class="inline-">
              <strong class="text-2xl">{{ movie.name }}</strong>
            </router-link>
          </div>
          <MovieGenres :genres="movie.genres" />
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
