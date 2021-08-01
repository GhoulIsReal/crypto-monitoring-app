<template>
  <div class="m-4 w-1/3 flex space-x-3">
    <button
      @click="$emit('prev-page')"
      class="w-1/2 flex items-center justify-center rounded-md bg-black text-white"
      :class="{ disabled: page <= 1 }"
      :disabled="page <= 1"
    >
      Назад
    </button>
    <button
      @click="$emit('next-page')"
      class="w-1/2 flex items-center justify-center rounded-md border border-gray-300"
      :class="{ disabled: !hasNextPage }"
      :disabled="!hasNextPage"
    >
      Вперед
    </button>
  </div>
</template>

<script>
export default {
  name: "Pagination",
  props: {
    hasNextPage: Boolean,
    page: Number,
  },
  emits: ["next-page", "prev-page"],
};
</script>

<style>
.disabled {
  background-color: #cccccc !important;
  color: #666666 !important;
  cursor: not-allowed;
}
</style>
