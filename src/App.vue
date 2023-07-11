<script setup>
import { items, genres } from "./movies.json";
import { ref, computed, nextTick, onMounted, onBeforeUnmount } from "vue";
import { StarIcon, TrashIcon, PencilIcon } from "@heroicons/vue/24/solid";

const movies = ref(items);
const maxRating = 5;
const showMoviesPerRowOnDesktop = 3;
const starClasses = computed(() => {
  return (star, rating) => {
    return star <= rating ? "text-violet-500" : "text-gray-300";
  };
});
const imageLoadingType = computed(() => {
  return (index) => {
    return index < showMoviesPerRowOnDesktop ? "eager" : "lazy";
  };
});
const imageFetchPriority = computed(() => {
  return (index) => {
    return index < showMoviesPerRowOnDesktop ? "high" : "low";
  };
});
const rate = (star, movie) => {
  movie.rating = star;
};
const isModalOpened = ref(false);

const nameInput = ref(null);
const openModal = () => {
  isModalOpened.value = true;
  nextTick(() => nameInput.value.focus());
};

const closeModal = () => {
  if (!isModalOpened.value) return false;

  name.value = "";
  image.value = "";
  description.value = "";
  selectedGenres.value = [];
  inTheater.value = false;
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

const name = ref("The Flash");
const image = ref(
  "https://www.themoviedb.org/t/p/original/rktDFPbfHfUbArZ6OOOKsXcv0Bm.jpg"
);
const description = ref(
  "Worlds collide when the Flash uses his superpowers to travel back in time to change the events of the past. However, when his attempt to save his family inadvertently alters the future, he becomes trapped in a reality in which General Zod has returned, threatening annihilation. With no other superheroes to turn to, the Flash looks to coax a very different Batman out of retirement and rescue an imprisoned Kryptonian -- albeit not the one he's looking for."
);
const selectedGenres = ref(["Action", "Drama", "Adventure", "Fantasy"]);
const chosenRating = ref(0);
const inTheater = ref(false);
const isMovieEditing = ref(false);
const editedMovieId = ref(null);

const isMovieValid = () => {
  return (
    name.value &&
    image.value &&
    description.value &&
    selectedGenres.value.length
  );
};

const addMovie = () => {
  if (!isMovieValid()) {
    return false;
  }

  isMovieEditing.value = false;
  editedMovieId.value = null;

  movies.value.push({
    id: movies.value.length + 1,
    name: name.value,
    image: image.value,
    description: description.value,
    genres: selectedGenres.value,
    rating: chosenRating.value,
    inTheater: inTheater.value,
  });

  nextTick(closeModal);
};
const editMovie = (movie) => {
  name.value = movie.name;
  image.value = movie.image;
  description.value = movie.description;
  selectedGenres.value = movie.genres;
  chosenRating.value = movie.rating;
  isMovieEditing.value = true;
  editedMovieId.value = movie.id;

  nextTick(openModal);
};

const updateMovie = () => {
  if (!isMovieValid()) {
    return false;
  }

  const movie = movies.value.find((movie) => movie.id === editedMovieId.value);

  movie.name = name.value;
  movie.image = image.value;
  movie.description = description.value;
  movie.genres = selectedGenres.value;
  movie.rating = chosenRating.value;
  movie.inTheater = inTheater.value;

  nextTick(closeModal);
};

const submitHandler = () => (isMovieEditing.value ? updateMovie() : addMovie());

const removeMovie = (id) => {
  movies.value = movies.value.filter((movie) => movie.id !== id);
};

const averageRating = computed(() => {
  const totalRating = movies.value.reduce((acc, movie) => {
    return acc + movie.rating;
  }, 0);

  return totalRating / movies.value.length;
});

const resetRatings = () => {
  for (const movie of movies.value) {
    if (!movie.rating) continue;

    movie.rating = 0;
  }
};
</script>

<template>
  <div class="container mx-auto px-4">
    <div
      class="flex my-4"
      :class="{
        'justify-between': movies.length,
        'justify-end': !movies.length,
      }"
    >
      <div v-if="movies.length" class="flex items-center">
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
      <div class="flex items-center">
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
    <div
      v-if="isModalOpened"
      class="fixed z-30 inset-0 flex items-center justify-center"
    >
      <div
        @click="closeModal"
        tabindex="0"
        title="Close"
        class="fixed z-10 inset-0 bg-black bg-opacity-50 cursor-pointer"
      ></div>
      <form
        @submit.prevent="submitHandler"
        class="relative z-20 hide-scrollbar overflow-y-auto max-h-[80vh] rounded bg-white shadow-xl"
      >
        <div class="flex flex-col w-96 p-4">
          <div class="flex flex-col mb-4">
            <label for="name" class="mb-1 cursor-pointer">
              Name
              <span class="text-red-500 required-label">*</span>
            </label>
            <input
              type="text"
              id="name"
              name="name"
              v-model="name"
              ref="nameInput"
              required
              class="border border-gray-300 rounded px-2 py-1"
            />
          </div>
          <div class="flex flex-col mb-4">
            <label for="image" class="mb-1 cursor-pointer">
              Image
              <span class="text-red-500 required-label">*</span>
            </label>
            <input
              type="text"
              id="image"
              name="image"
              v-model="image"
              required
              class="border border-gray-300 rounded px-2 py-1"
            />
          </div>
          <div class="flex flex-col mb-4">
            <label for="description" class="mb-1 cursor-pointer">
              Description
              <span class="text-red-500 required-label">*</span>
            </label>
            <textarea
              id="description"
              name="description"
              v-model="description"
              required
              class="border border-gray-300 rounded px-2 py-1"
            ></textarea>
          </div>
          <div class="flex flex-col mb-4">
            <label for="genres" class="mb-1 cursor-pointer">
              Genres
              <span class="text-red-500 required-label">*</span>
            </label>
            <select
              id="genres"
              name="genres"
              class="h-36 max-h-72 min-h-[100px] border border-gray-300 rounded px-2 py-1 resize-y"
              multiple
              required
              v-model="selectedGenres"
            >
              <option v-for="genre in genres" :key="genre" :value="genre">
                {{ genre }}
              </option>
            </select>
          </div>
          <div class="flex flex-col mb-4">
            <label for="rating" class="flex items-center mb-1 cursor-pointer">
              <input
                type="checkbox"
                id="rating"
                name="rating"
                class="border border-gray-300 rounded px-2 py-1"
              />
              <span class="ml-2">In Theater</span>
            </label>
          </div>
          <div class="flex justify-end">
            <button
              type="button"
              @click="closeModal"
              title="Close"
              class="btn-cancel mr-2"
            >
              Cancel
            </button>
            <button
              type="submit"
              :title="isMovieEditing ? 'Update movie' : 'Add movie'"
              class="btn-primary"
            >
              {{ isMovieEditing ? "Update" : "Add" }}
            </button>
          </div>
        </div>
      </form>
    </div>
    <template v-if="movies.length">
      <ul class="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <li v-for="(movie, index) in movies" :key="movie.id" class="flex">
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
                    @click="editMovie(movie)"
                    class="btn-secondary w-10 h-10 !rounded-full flex items-center justify-center mr-2 !p-0"
                    title="Edit movie"
                  >
                    <PencilIcon class="!w-4 !h-4" />
                  </button>
                  <button
                    type="button"
                    @click="removeMovie(movie.id)"
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
      </ul>
    </template>
    <div
      v-else
      class="flex items-center justify-center py-2 px-4 bg-red-500 text-white rounded"
    >
      The movies list is empty.
    </div>
  </div>
</template>
