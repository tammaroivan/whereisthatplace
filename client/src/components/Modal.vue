<template>
  <div class="modal">
    <div class="content" v-if="state === 'start'">
      <h1 class="title">Welcome to ¿Where is that place?</h1>
      <p class="description">
        You will be asked to guess where is a specific country.
      </p>
      <p class="description">
        You have to click on it to pass to the next level. If you miss, you will
        lose a life and get a new random country.
      </p>
      <p class="description lifes">
        You have 3 lifes to guess every country in the world, good luck
        <span class="crossline">you will need it</span>.
      </p>
      <button @click="start" class="btn btn-start">Start Game</button>
    </div>
    <div class="content" v-if="state === 'end'">
      <h1 class="title">¿Where is that place?</h1>
      <p class="description">
        You did your best. You found {{ foundAmount }} countries in
        {{ formattedLastTime }}.
      </p>
      <p class="description lifes">
        Do you want to try again? Good luck
        <span class="crossline">you will need it</span>.
      </p>
      <button @click="start" class="btn btn-start">Start Game</button>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    state() {
      return this.$store.getters.gameState;
    },
    foundAmount() {
      return this.$store.getters.lastMaxFound;
    },
    formattedLastTime() {
      const time = this.$store.getters.lastTimer.split(":");
      return `${time[0]}m ${time[1]}s`;
    },
  },
  methods: {
    start() {
      this.$emit("start");
    },
  },
};
</script>

<style lang="scss" scoped>
.modal {
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  left: 0;
  top: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(#000000, 0.6);
  z-index: 2;

  .content {
    width: 100%;
    max-width: 650px;
    background: #fff;
    min-height: 300px;
    border-radius: 5px;
    box-sizing: border-box;
    padding: 10px 0;

    .title {
      font-size: 22px;
      margin-bottom: 20px;
      border-bottom: 1px solid #dedede;
      padding: 10px 0;
    }

    .description {
      padding: 5px 15px;

      .crossline {
        text-decoration: line-through;
        color: gray;
      }
    }

    .btn {
      background: #35c5f5;
      color: #fff;
      font-weight: bold;
      border: none;
      padding: 5px 30px;
      border-radius: 20px;
      font-size: 16px;
      cursor: pointer;

      &:hover {
        background: #30a3c9;
      }

      &:focus {
        outline: none;
      }

      &.btn-start {
        margin-top: 30px;
      }
    }
  }
}
</style>
