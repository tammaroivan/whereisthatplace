export default {
  state: {
    totalCountries: 0,
    foundCountries: [],
    currentCountry: null,
    timer: "00:00",
    lifes: 3,
    gameState: "start",
    lastTimer: "00:00",
    lastMaxFound: 0,
  },
  mutations: {
    setTotalCountries(state, n) {
      state.totalCountries = n;
    },
    addFoundCountry(state, country) {
      state.foundCountries.push(country);
    },
    clearFoundCountries(state) {
      state.foundCountries = [];
    },
    setCurrentCountry(state, country) {
      state.currentCountry = country;
    },
    setTimer(state, time) {
      state.timer = time;
    },
    setLifes(state, lifes) {
      state.lifes = lifes;
    },
    setGameState(state, status) {
      state.gameState = status;
    },
    setLastMaxFound(state) {
      state.lastMaxFound = state.foundCountries.length;
    },
    setLastTimer(state) {
      state.lastTimer = state.timer;
    },
  },
  actions: {
    decreaseLifes({ commit, state }) {
      commit("setLifes", state.lifes - 1);
    },
  },
  modules: {},
  getters: {
    getTotalCountries: (state) => state.totalCountries,
    foundCountries: (state) => state.foundCountries,
    foundCountriesAmount: (state) => state.foundCountries.length,
    currentCountry: (state) => state.currentCountry,
    timer: (state) => state.timer,
    remainingLifes: (state) => state.lifes,
    gameState: (state) => state.gameState,
    lastTimer: (state) => state.lastTimer,
    lastMaxFound: (state) => state.lastMaxFound,
  },
};
