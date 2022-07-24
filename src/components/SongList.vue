<template>
  <div class="song-list">
    <template v-if="list.length">
      <div
        class="song-list__item"
        :class="{ active: index === i }"
        v-for="(song, i) in list"
        :key="song.id"
        @click="onSongChange(i)"
      >
        <div class="song-list__item-info">
          <span>{{ song.name }}</span> - <span>{{ song.author }}</span>
        </div>
        <div class="song-list__item-duration">
          {{
            current && i === index
              ? convertTimeHHMMSS(currentTime)
              : convertTimeHHMMSS(song.duration)
          }}
        </div>
      </div>
    </template>
    <template v-else>
      <div class="song-list__item">Empty</div>
    </template>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Song } from "../types/ISong";

export default Vue.extend({
  name: "SongList",
  props: {
    list: {
      required: true,
      type: Array as () => Song[],
      default: () => [],
    },
    index: {
      required: true,
      type: Number,
      default: 0,
    },
    current: {
      required: true,
      type: Song,
      default: () => ({}),
    },
    currentTime: {
      required: true,
      type: Number,
      default: 0,
    },
  },
  methods: {
    onSongChange(index: number) {
      this.$emit("onSongChange", index);
    },
    convertTimeHHMMSS(value: number) {
      return new Date(value * 1000).toISOString().slice(14, 19);
    },
  },
});
</script>

<style lang="scss">
.song-list {
  border: 1px solid black;
  border-radius: 6px;
  overflow: hidden;

  &__item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 8px;
    border-bottom: 1px solid black;
    cursor: pointer;
    font-size: 16px;

    &:last-child {
      border-bottom: none;
    }
  }
}
.active {
  background-color: rgb(221, 221, 221);
  // border-radius: 5px;
}
</style>
