<template>
  <div>
    <Modal @start="startGame" v-show="!currentCountry" />
    <StatusUpdate ref="status" />
    <nav class="nav" v-bind:class="{ active: currentCountry }">
      <span>{{ guessedCountries.length }}/{{ totalCountries }}</span>
      <span v-if="currentCountry"
        >Current Country: {{ currentCountry.properties.name }}</span
      >
      <span
        >{{ lifes }}
        <img class="heart" src="@/assets/heart.svg" />
      </span>
    </nav>
    <Map @pickedCountry="choosedCountry" />
  </div>
</template>

<script>
import countries from "which-country/lib/data.geo.json";
import Modal from "./Modal";
import StatusUpdate from "./StatusUpdate";
import Map from "./Map";

export default {
  components: {
    Modal,
    Map,
    StatusUpdate,
  },
  data() {
    return {
      totalCountries: 0,
      guessedCountries: [],
      remainingCountries: [],
      currentCountry: "",
      countries: [],
      lifes: 3,
      showType: "",
    };
  },
  methods: {
    startGame() {
      this.setNewCountry();
    },
    choosedCountry(clickData) {
      if (clickData) {
        const selectedCountry = countries.features.find(
          (country) => country.id === clickData.country
        );
        if (selectedCountry.id === this.currentCountry.id) {
          this.$refs.status.showStatus({
            status: "success",
            x: clickData.x,
            y: clickData.y,
          });
          this.guessedCountries.push(selectedCountry);
          this.remainingCountries = this.remainingCountries.filter(
            (c) => c.id !== clickData.country
          );
          this.setNewCountry();
        } else {
          this.lifes--;
          if (this.lifes === 0) {
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
      this.guessedCountries = [];
      this.currentCountry = "";
      this.remainingCountries = this.countries;
      this.lifes = 3;
    },
    setNewCountry() {
      this.currentCountry = this.remainingCountries[
        Math.floor(
          Math.random() * (this.totalCountries - this.guessedCountries.length)
        )
      ];
    },
  },
  mounted() {
    this.countries = countries.features;
    this.remainingCountries = this.countries;
    this.totalCountries = countries.features.length;
  },
};
</script>

<style lang="scss" scoped>
.nav {
  position: fixed;
  width: 100%;
  background: #fff;
  top: 0;
  left: 0;
  padding: 10px 0;
  display: flex;
  justify-content: space-around;
  align-items: center;
  z-index: 1;
  top: -42px;
  transition: all 0.5s ease;

  &.active {
    top: 0;
  }
}

.heart {
  height: 14px;
}
</style>
