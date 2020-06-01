<template>
  <div class="status-container" v-bind:style="style">
    <img v-if="status === 'success'" src="@/assets/tick.svg" alt="Good" />
    <img v-if="status === 'error'" src="@/assets/caution.svg" alt="Wrong" />
  </div>
</template>

<script>
export default {
  data() {
    return {
      status: "error",
      style: {
        left: "0px",
        top: "0px",
        opacity: 0,
      },
    };
  },
  methods: {
    showStatus(data) {
      this.status = data.status;
      this.style.left = `${data.x}px`;
      this.style.top = `${data.y}px`;
      this.style.opacity = 1;
      setTimeout(() => {
        this.status = "";
        this.style.opacity = 0;
      }, 1000);
    },
  },
};
</script>

<style lang="scss" scoped>
.status-container {
  position: fixed;
  z-index: 1;
  transition: opacity 0.5s ease;

  img {
    height: 50px;
  }
}
</style>
