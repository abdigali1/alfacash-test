<template>
  <label class="text-input">
    <input
      :value="modelValue"
      :placeholder="placeholder"
      type="text"
      @input="updateValue"
    />
  </label>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "TextInput",
  model: {
    prop: "modelValue",
    event: "input",
  },
  props: {
    modelValue: {
      required: true,
      default: "",
    },
    placeholder: {
      type: String,
      default: "",
    },
  },
  methods: {
    updateValue(event: Event) {
      this.$emit("input", (event.target as HTMLInputElement).value);
    },
  },
});
</script>

<style lang="scss" scoped>
.text-input {
  padding: 5px;
  border: 1px solid black;
  border-radius: 5px;

  display: flex;
  align-items: center;
  justify-content: center;

  input {
    width: 100%;
    border: none;
    outline: none;
  }
}
</style>
