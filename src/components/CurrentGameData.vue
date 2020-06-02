<template>
  <nav class="nav" v-bind:class="{ active: currentCountry }">
    <span>{{ foundCountriesAmount }}/{{ totalCountries }}</span>
    <span v-if="currentCountry" class="current-country"
      >Current country: <u>{{ currentCountry.properties.name }}</u></span
    >
    <div>
      <span class="timer"> {{ timer }}</span>
      <span
        >{{ lifes }}
        <img class="heart" src="@/assets/heart.svg" />
      </span>
    </div>
  </nav>
</template>

<script>
import * as moment from "moment";

export default {
  data() {
    return {
      startTime: "",
    };
  },
  methods: {
    startTimer() {
      this.startTime = moment.now();
      setInterval(() => {
        const current = moment.now();
        const diff = current - this.startTime;
        this.$store.commit("setTimer", moment(diff).format("mm:ss"));
      }, 1000);
    },
  },
  computed: {
    currentCountry() {
      return this.$store.getters.currentCountry;
    },
    foundCountriesAmount() {
      return this.$store.getters.foundCountriesAmount;
    },
    totalCountries() {
      return this.$store.getters.getTotalCountries;
    },
    timer() {
      return this.$store.getters.timer;
    },
    lifes() {
      return this.$store.getters.remainingLifes;
    },
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

  .current-country {
    font-weight: bold;
    font-size: 18px;
  }

  .timer {
    font-weight: bold;
    margin-right: 30px;
  }

  .heart {
    height: 14px;
  }
}
</style>
