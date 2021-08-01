<template>
  <div class="space-x-3">
    <label for="filter-input">{{ labelName }}:</label>
    <input
      v-model="computedFilter"
      type="text"
      name="filter-input"
      id="filter-input"
    />
  </div>
</template>

<script>
export default {
  name: "BaseInput",
  computed: {
    computedFilter: {
      get() {
        return this.modelValue;
      },
      set(val) {
        this.$emit("update:modelValue", val);
      },
    },
  },
  props: {
    modelValue: String,
    labelName: String,
  },
  emits: ["update:modelValue"],
};
</script>

<style></style>
