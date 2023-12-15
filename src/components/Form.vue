<script setup>
import { watch, ref, inject, nextTick } from "vue";
import { useMoviesStore } from "@/stores/movies";

const emit = defineEmits(["closeModal, submitForm"]);

const isModalOpened = inject("isModalOpened");
const name = inject("name");
const image = inject("image");
const description = inject("description");
const selectedGenres = inject("selectedGenres");
const isMovieEditing = inject("isMovieEditing");
const nameInput = ref(null);

const moviesStore = useMoviesStore();
const genres = moviesStore.genres;

watch(
  isModalOpened,
  async (isOpened) => {
    isOpened && await nextTick(() => {
      const title = nameInput.value.value;
      nameInput.value.focus();

      if (title) {
        nameInput.value.setSelectionRange(title.length, title.length);
      }
    });
  },
  {
    flush: "post",
  }
);

const isMovieValid = () => {
  return (
    name.value &&
    image.value &&
    description.value &&
    selectedGenres.value.length
  );
};

const submitHandler = () => {
  return isMovieValid()
    ? emit(isMovieEditing.value ? "movieUpdate" : "movieAdd")
    : false;
};
</script>
<template>
  <form @submit.prevent="submitHandler">
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
      <div class="flex justify-end">
        <button
          type="button"
          @click="$emit('closeModal')"
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
</template>
