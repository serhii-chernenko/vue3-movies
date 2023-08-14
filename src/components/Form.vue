<script setup>
import { onMounted, ref, inject } from "vue";
import { genres } from "../movies.json";

const emit = defineEmits(["closeModal", "submitForm"]);
const nameInput = ref(null);

onMounted(() => nameInput.value.focus());

const isMovieEditing = inject("isMovieEditing");
const name = inject("name");
const image = inject("image");
const description = inject("description");
const selectedGenres = inject("selectedGenres");

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
  <div class="fixed z-30 inset-0 flex items-center justify-center">
    <div
      @click="$emit('closeModal')"
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
  </div>
</template>
