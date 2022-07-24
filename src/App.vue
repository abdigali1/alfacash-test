<template>
  <div class="alfacash">
    <audio-player ref="audio" />
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { mapState } from "vuex";
import AudioPlayer from "./components/AudioPlayer.vue";

export default Vue.extend({
  name: "App",
  components: {
    AudioPlayer,
  },
  computed: {
    ...mapState(["songs"]),
  },
});
</script>

<style lang="scss">
@import "@/assets/styles/base.scss";

.alfacash {
  max-width: 720px;
  margin: 0 auto;
  padding: 2rem 1rem;
}
</style>
