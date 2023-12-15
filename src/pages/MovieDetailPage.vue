<script setup>
import MovieRating from "../components/MovieRating.vue";
import MovieGenres from "../components/MovieGenres.vue";

const props = defineProps({
  movie: {
    type: Object,
    required: true,
  },
});
</script>

<template>
  <div
    class="container md:flex max-w-6xl gap-4 p-10 m-auto dark:text-white"
  >
    <figure class="relative shrink-0 w-full md:max-w-xs mx-auto">
      <MovieRating :rating="movie.rating"/>
      <img :src="movie.image" :alt="movie.name" class="block w-full object-cover" />
    </figure>

    <div>
      <h1 class="my-4 text-5xl">{{ movie.name }}</h1>
      <MovieGenres :genres="movie.genres" />
      <p class="text-xl">{{ movie.description }}</p>
    </div>
  </div>

  <aside class="flex justify-center mt-10 ">
    <router-link to="/" class="btn-primary">Back</router-link>
  </aside>
</template>
