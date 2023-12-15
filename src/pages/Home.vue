<script setup>
import { useMoviesStore } from "@/stores/movies";
import {
  ref,
  computed,
  nextTick,
  onMounted,
  onBeforeUnmount,
  provide,
  defineAsyncComponent,
} from "vue";
import Movie from "@/components/Movie.vue";

const Modal = defineAsyncComponent(() => import("@/components/Modal.vue"));
const Form = defineAsyncComponent(() => import("@/components/Form.vue"));

const moviesStore = useMoviesStore();

const movies = moviesStore.movies;
const maxRating = 5;
const showMoviesPerRowOnDesktop = 3;
const isModalOpened = ref(false);

const name = ref("The Flash");
const image = ref(
  "https://www.themoviedb.org/t/p/original/rktDFPbfHfUbArZ6OOOKsXcv0Bm.jpg"
);
const description = ref(
  "Worlds collide when the Flash uses his superpowers to travel back in time to change the events of the past. However, when his attempt to save his family inadvertently alters the future, he becomes trapped in a reality in which General Zod has returned, threatening annihilation. With no other superheroes to turn to, the Flash looks to coax a very different Batman out of retirement and rescue an imprisoned Kryptonian -- albeit not the one he's looking for."
);
const selectedGenres = ref(["Action", "Drama", "Adventure", "Fantasy"]);
const chosenRating = ref(0);
const isMovieEditing = ref(false);
const editedMovieId = ref(null);

provide("movies", movies);
provide("isModalOpened", isModalOpened);
provide("name", name);
provide("image", image);
provide("description", description);
provide("selectedGenres", selectedGenres);
provide("isMovieEditing", isMovieEditing);

const openModal = () => {
  isModalOpened.value = true;
};

const closeModal = () => {
  if (!isModalOpened.value) return false;

  name.value = "";
  image.value = "";
  description.value = "";
  selectedGenres.value = [];
  chosenRating.value = 0;
  isModalOpened.value = false;
  isMovieEditing.value = false;
  editedMovieId.value = null;
};

const modalHandler = (event) => {
  if (event.key !== "Escape") {
    return;
  }

  closeModal();
};

onBeforeUnmount(() => {
  window.removeEventListener("keyup", modalHandler);
});

onMounted(() => {
  window.addEventListener("keyup", modalHandler);
});

const addMovie = async () => {
  isMovieEditing.value = false;
  editedMovieId.value = null;

  moviesStore.addMovie({
    id: movies.length + 1,
    name: name.value,
    image: image.value,
    description: description.value,
    genres: selectedGenres.value,
    rating: chosenRating.value,
  });

  await nextTick(closeModal);
};
const editMovie = async (id) => {
  const movie = moviesStore.getMovieById(id);

  name.value = movie.name;
  image.value = movie.image;
  description.value = movie.description;
  selectedGenres.value = movie.genres;
  chosenRating.value = movie.rating;
  isMovieEditing.value = true;
  editedMovieId.value = movie.id;

  await nextTick(openModal);
};

const updateMovie = async () => {
  moviesStore.updateMovieById(editedMovieId.value, {
    name: name.value,
    image: image.value,
    description: description.value,
    genres: selectedGenres.value,
    rating: chosenRating.value,
  });

  await nextTick(closeModal);
};

const removeMovie = async (id) => {
  moviesStore.deleteMovieById(id);
};

const averageRating = computed(() => {
  const totalRating = movies.reduce((acc, movie) => {
    return acc + movie.rating;
  }, 0);

  return totalRating / movies.filter(movie => !!movie.rating).length;
});

const resetRatings = () => {
  for (const movie of movies) {
    if (!movie.rating) continue;

    movie.rating = 0;
  }
};
</script>

<template>
  <div class="container mx-auto px-4">
    <div
      class="sm:flex my-4"
      :class="{
        'justify-between': movies.length,
        'justify-end': !movies.length,
      }"
    >
      <div v-if="movies.length" class="flex items-center justify-center mb-4 sm:justify-normal sm:mb-0">
        <div>
          Total movies: <span>{{ movies.length }}</span>
        </div>
        <div v-if="averageRating" class="flex items-center">
          <span class="mx-2">/</span>
          <div>
            Average rating: <span>{{ averageRating.toFixed(1) }}</span>
          </div>
        </div>
      </div>
      <div class="flex items-center justify-center sm:justify-normal">
        <button
          @click="resetRatings"
          title="Reset movies rating"
          class="btn-cancel mr-2"
        >
          Reset ratings
        </button>
        <button @click="openModal" title="Add movie" class="btn-primary">
          Add movie
        </button>
      </div>
    </div>
    <Modal @close-modal="closeModal">
      <Form @movie-add="addMovie" @movie-update="updateMovie" @close-modal="closeModal" />
    </Modal>
    <ul
      v-if="movies.length"
      class="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-4"
    >
      <Movie
        v-for="movie in movies"
        :key="movie.id"
        :movie="movie"
        :showMoviesPerRowOnDesktop="showMoviesPerRowOnDesktop"
        :maxRating="maxRating"
        @movie-edit="editMovie"
        @movie-remove="removeMovie"
      />
    </ul>
    <div
      v-else
      class="flex items-center justify-center py-2 px-4 rounded bg-red-400 text-white"
    >
      The movies list is empty.
    </div>
  </div>
</template>
