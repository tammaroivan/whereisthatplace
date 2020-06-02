<template>
  <div>
    <Modal @start="startGame" v-show="!currentCountry" :state="state" />
    <StatusUpdate ref="status" />
    <CurrentGameData ref="gameData" />
    <Map @pickedCountry="choosedCountry" ref="map" />
  </div>
</template>

<script>
import countries from "which-country/lib/data.geo.json";
import Map from "./Map";
import Modal from "./Modal";
import StatusUpdate from "./StatusUpdate";
import CurrentGameData from "./CurrentGameData";

export default {
  components: {
    Modal,
    Map,
    StatusUpdate,
    CurrentGameData,
  },
  data() {
    return {
      remainingCountries: [],
      countries: [],
      showType: "",
      state: "start",
    };
  },
  methods: {
    startGame() {
      this.setNewCountry();
      this.$store.commit("setGameState", "started");
      this.$refs.gameData.startTimer();
    },
    choosedCountry(clickData) {
      if (clickData) {
        const selectedCountry = countries.features.find(
          (country) => country.id === clickData.country
        );
        if (selectedCountry.id === this.$store.getters.currentCountry.id) {
          this.$refs.status.showStatus({
            status: "success",
            x: clickData.x,
            y: clickData.y,
          });
          this.$store.commit("addFoundCountry", selectedCountry);
          this.$refs.map.updateHighlightedAreas(
            this.$store.getters.foundCountries
          );
          this.remainingCountries = this.remainingCountries.filter(
            (c) => c.id !== clickData.country
          );
          this.setNewCountry();
        } else {
          this.$store.dispatch("decreaseLifes");
          if (this.$store.getters.remainingLifes === 0) {
            this.restartGame();
          } else {
            this.$refs.status.showStatus({
              status: "error",
              x: clickData.x,
              y: clickData.y,
            });
            this.setNewCountry();
          }
        }
      }
    },
    restartGame() {
      this.$store.commit("setLastMaxFound");
      this.$store.commit("setLastTimer");
      this.$store.commit("setGameState", "end");
      this.$store.commit("clearFoundCountries");
      this.$refs.map.updateHighlightedAreas(this.$store.getters.foundCountries);
      this.$store.commit("setCurrentCountry", null);
      this.remainingCountries = this.countries;
      this.$store.commit("setLifes", 3);
    },
    setNewCountry() {
      const newCountry = this.remainingCountries[
        Math.floor(
          Math.random() *
            (this.$store.getters.getTotalCountries -
              this.$store.getters.foundCountriesAmount)
        )
      ];
      this.$store.commit("setCurrentCountry", newCountry);
    },
  },
  computed: {
    currentCountry() {
      return this.$store.getters.currentCountry;
    },
  },
  mounted() {
    this.countries = countries.features;
    this.remainingCountries = this.countries;
    this.$store.commit("setTotalCountries", countries.features.length);
  },
};
</script>

<style lang="scss" scoped></style>
