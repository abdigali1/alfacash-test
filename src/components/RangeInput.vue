<template>
  <div class="range-input">
    <input
      :value="modelValue"
      @input="updateValue"
      type="range"
      :min="min"
      :max="max"
    />
  </div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "RangeInput",
  model: {
    prop: "modelValue",
    event: "change",
  },
  props: {
    modelValue: {
      required: true,
      default: 0,
    },
    min: {
      type: Number,
      default: 0,
    },
    max: {
      type: Number,
      default: 100,
    },
  },
  methods: {
    updateValue(event: Event) {
      this.$emit("change", parseInt((event.target as HTMLInputElement).value));
    },
  },
});
</script>

<style lang="scss" scoped>
.range-input {
  @media screen and (-webkit-min-device-pixel-ratio: 0) {
    input[type="range"] {
      cursor: pointer;
      overflow: hidden;
      width: 100%;
      -webkit-appearance: none;
      background-color: white;
      outline: none;
      border: 1px solid black;
      border-radius: 5px;
    }

    input[type="range"]::-webkit-slider-runnable-track {
      height: 25px;
      -webkit-appearance: none;
      color: gray;
      margin-top: -1px;
    }

    input[type="range"]::-webkit-slider-thumb {
      -webkit-appearance: none;
      height: 25px;
      width: 0px;
      cursor: ew-resize;
      box-shadow: -400px 0 0 400px gray;
    }
  }
  input[type="range"]::-moz-range-progress {
    background-color: gray;
  }
  input[type="range"]::-moz-range-track {
    background-color: white;
  }
  input[type="range"]::-ms-fill-lower {
    background-color: gray;
  }
  input[type="range"]::-ms-fill-upper {
    background-color: white;
  }
}
</style>
