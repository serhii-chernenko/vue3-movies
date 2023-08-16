<script setup>
import { inject } from "vue";

defineEmits(["closeModal"]);

const isModalOpened = inject("isModalOpened");
</script>
<template>
  <Transition type="transition">
    <div
      @click="$emit('closeModal')"
      v-show="isModalOpened"
      tabindex="0"
      title="Close"
      class="fixed z-40 inset-0 bg-black bg-opacity-50 cursor-pointer"
    ></div>
  </Transition>
  <Transition name="modal" type="animation" :duration="500">
    <div
      v-show="isModalOpened"
      class="fixed z-50 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 inset-0 flex items-center justify-center"
    >
      <div>
        <div
          class="relative hide-scrollbar overflow-y-auto max-h-[80vh] rounded bg-white shadow-xl"
        >
          <slot></slot>
        </div>
      </div>
    </div>
  </Transition>
</template>
<style>
.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}

.modal-enter-active,
.modal-leave-active {
  transition: transform 0.5s ease, opacity 0.5s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
  transform: translate(-50%, calc(-50% - 30px));
}
</style>
