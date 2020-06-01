<template>
  <MglMap
    :accessToken="accessToken"
    :mapStyle="mapStyle"
    class="map"
    :zoom="2"
    @click="onClick"
  />
</template>

<script>
import * as wc from "which-country";
import Mapbox from "mapbox-gl";
import { MglMap } from "vue-mapbox";

export default {
  components: {
    MglMap,
  },
  methods: {
    onClick(e) {
      const countryId = wc([e.mapboxEvent.lngLat.lng, e.mapboxEvent.lngLat.lat])
      this.$emit("pickedCountry", {country: countryId, x: e.mapboxEvent.point.x, y: e.mapboxEvent.point.y });
    },
  },
  data() {
    return {
      accessToken:
        "pk.eyJ1IjoidGFtbWFyb2l2YW4iLCJhIjoiY2thd2UzcWNkMGt1aTMzcGNraDkyNmN3ZCJ9.5psgFsIH3BdJyk50wfTONA", // your access token. Needed if you using Mapbox maps
      mapStyle: "mapbox://styles/tammaroivan/ckaweiy564nd61ik9viii2gtv", // your map style
    };
  },
  created() {
    this.mapbox = Mapbox;
  },
};
</script>

<style>
.map {
  height: 100vh;
  width: 100vw;
}
</style>
