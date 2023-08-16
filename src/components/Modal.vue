<script setup>
defineEmits(["closeModal"]);
</script>
<template>
  <div class="fixed z-30 inset-0 flex items-center justify-center">
    <div
      @click="$emit('closeModal')"
      tabindex="0"
      title="Close"
      class="fixed z-10 inset-0 bg-black bg-opacity-50 cursor-pointer"
    ></div>
    <slot></slot>
  </div>
</template>
