<script setup>
import { items } from "./movies.json";
import { ref, computed } from "vue";
import { StarIcon } from "@heroicons/vue/24/solid";

const movies = ref(items);
const maxRating = 5;
const starClasses = computed(() => {
  return (star, rating) => {
    return star <= rating ? "text-violet-500" : "text-gray-300";
  };
});
const rate = (star, movie) => {
  movie.rating = star;
};
</script>

<template>
  <ul class="flex flex-col flex-wrap items-center lg:flex-row lg:items-stretch">
    <li
      v-for="movie in movies"
      :key="movie.id"
      class="flex w-full sm:w-2/3 md:w-1/2 lg:w-1/3 p-4"
    >
      <div class="flex flex-col rounded-xl overflow-hidden bg-white">
        <div class="group overflow-hidden">
          <img
            :src="movie.image"
            :alt="movie.name"
            width="200"
            height="284"
            class="w-full mx-auto h-auto ratio-2/3 max-h-[439px] xl:max-h-[560px] 2xl:max-h-[670px] object-cover transition duration-500 ease-in-out transform group-hover:scale-110"
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
          <div class="flex">
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
        </div>
      </div>
    </li>
  </ul>
</template>
