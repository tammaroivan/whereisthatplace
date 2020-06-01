<template>
  <div id="app">
    <GameController />
  </div>
</template>

<script>
import GameController from "./components/GameController";

export default {
  name: "App",
  components: {
    GameController,
  },
};
</script>

<style>
* {
  margin: 0;
  padding: 0;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
