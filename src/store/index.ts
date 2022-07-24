import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);
import { ISong } from "../types/ISong";

export default new Vuex.Store({
  state: {
    songs: [
      {
        id: 1,
        name: "PRIMAVARA",
        author: "harvestfred",
        duration: 282,
        src: require("@/assets/songs/one.mp3"),
      },
      {
        id: 2,
        name: "Y=MX+B",
        duration: 202,
        author: "Peppy & The Firing Squad",
        src: require("@/assets/songs/two.mp3"),
      },
      {
        id: 3,
        name: "(94)",
        author: "crashboomkapow",
        duration: 300,
        src: require("@/assets/songs/three.mp3"),
      },
    ] as ISong[],
  },
  getters: {},
  mutations: {},
  actions: {},
});
