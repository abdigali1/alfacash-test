<template>
  <div class="audio-player">
    <div class="audio-player__row">
      <div class="audio-player__action-btns">
        <div class="audio-player__action-btn" @click="prev()">
          <img src="@/assets/icons/prev.svg" alt="previous song" />
        </div>
        <div
          class="audio-player__action-btn"
          @click="isPlaying ? pause() : play(songs[index])"
        >
          <img
            v-if="!isPlaying"
            src="@/assets/icons/play.svg"
            class="audio-player__action-btn_play"
            alt="play song"
          />
          <img v-else src="@/assets/icons/pause.svg" alt="pause song" />
        </div>
        <div class="audio-player__action-btn" @click="next()">
          <img src="@/assets/icons/next.svg" alt="next song" />
        </div>
      </div>
      <range-input
        class="audio-player__track"
        v-model="track"
        :max="current.duration"
        @change="onProgressChange"
      />
      <range-input
        class="audio-player__volume"
        v-model="volume"
        @change="onVolumeChange"
      />
    </div>
    <div class="audio-player__search">
      <text-input v-model="search" placeholder="Search for artists or tracks" />
    </div>
    <song-list
      :list="filteredSongs"
      :index="index"
      :current="current"
      :currentTime="currentTime"
      @onSongChange="onSongChange"
    />
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { ISong } from "../types/ISong";
import RangeInput from "./RangeInput.vue";
import TextInput from "../components/TextInput.vue";
import SongList from "../components/SongList.vue";
import { mapState } from "vuex";

export default Vue.extend({
  name: "AudioPlayer",
  components: {
    RangeInput,
    TextInput,
    SongList,
  },
  data: () => ({
    player: new Audio(),
    current: {} as ISong,
    isPlaying: false,
    volume: 100,
    index: 0,
    track: 0,
    search: "",
    currentTime: 0,
  }),
  computed: {
    ...mapState(["songs"]),
    filteredSongs(): ISong[] {
      return this.songs.filter((el: ISong) => {
        if (
          el.name.toLowerCase().includes(this.search.toLowerCase()) ||
          el.author.toLowerCase().includes(this.search.toLowerCase())
        )
          return true;
      });
    },
  },
  mounted() {
    this.current = this.songs[this.index];
    this.player.src = this.current.src;

    this.player.addEventListener("timeupdate", this.update);
    this.player.addEventListener("ended", this.next);
  },
  destroyed() {
    this.player.removeEventListener("loadeddata", this.load);
    this.player.removeEventListener("timeupdate", this.update);
    this.player.removeEventListener("ended", this.next);
  },
  methods: {
    onSongChange(index: number) {
      if (this.index === index) {
        this.isPlaying ? this.pause() : this.load();
        return;
      }

      this.index = index;
      this.play(this.songs[this.index]);
      this.track = 0;
    },
    update() {
      this.track = this.currentTime = this.player.currentTime;
    },
    onProgressChange() {
      this.player.currentTime = this.track;
    },
    onVolumeChange() {
      this.player.volume = this.volume / 100;
    },
    play(song: ISong) {
      if (this.current.id === song.id) {
        this.load();
        return;
      }

      this.player.removeEventListener("loadeddata", this.load);
      this.player.removeEventListener("timeupdate", this.update);
      this.player.removeEventListener("ended", this.next);

      this.current = song;
      this.player.src = this.current.src;

      this.player.addEventListener("loadeddata", this.load);
      this.player.addEventListener("timeupdate", this.update);
      this.player.addEventListener("ended", this.next);
    },
    async load() {
      this.isPlaying = true;
      await this.player.play();
    },
    pause() {
      this.isPlaying = false;
      this.player.pause();
    },
    next() {
      this.index++;
      if (this.index > this.songs.length - 1) this.index = 0;

      this.play(this.songs[this.index]);

      this.track = 0;
    },
    prev() {
      this.index--;
      if (this.index < 0) this.index = this.songs.length - 1;

      this.play(this.songs[this.index]);

      this.track = 0;
    },
  },
});
</script>

<style lang="scss" scoped>
.audio-player {
  &__row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 15px;
  }
  &__action-btns {
    display: flex;
    align-items: center;
    margin-right: 20px;
  }
  &__action-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 30px;
    height: 30px;
    margin-right: 10px;
    cursor: pointer;

    &:last-child {
      margin-right: 0;
    }
    img {
      width: 100%;
      height: 100%;
    }
    &_play {
      height: 90% !important;
    }
  }
  &__track {
    display: flex;
    flex-grow: 1;
    margin-right: 20px;
  }
  &__volume {
    display: flex;
    width: 25%;
  }
  &__search {
    margin-bottom: 15px;
    input {
      width: 100%;
    }
  }
}
</style>
