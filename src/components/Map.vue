<template>
  <MglMap
    :accessToken="accessToken"
    :mapStyle="mapStyle"
    class="map"
    :zoom="2"
    @click="onClick"
  >
    <MglGeojsonLayer
      sourceId="maine"
      :source="geoJsonSource"
      layerId="maine"
      :layer="geoJsonLayer"
    />
  </MglMap>
</template>

<script>
import * as wc from "which-country";
import Mapbox from "mapbox-gl";
import { MglMap, MglGeojsonLayer } from "vue-mapbox";
import countries from "which-country/lib/data.geo.json";

export default {
  components: {
    MglMap,
    MglGeojsonLayer,
  },
  methods: {
    onClick(e) {
      console.log(countries);

      const countryId = wc([
        e.mapboxEvent.lngLat.lng,
        e.mapboxEvent.lngLat.lat,
      ]);
      this.$emit("pickedCountry", {
        country: countryId,
        x: e.mapboxEvent.point.x,
        y: e.mapboxEvent.point.y,
      });
    },
  },
  data() {
    return {
      accessToken: process.env.VUE_APP_MAP_TOKEN, // your access token. Needed if you using Mapbox maps
      mapStyle: "mapbox://styles/tammaroivan/ckawnwq9d0dee1ilnxrnegehr", // your map style
      test: countries.features,
      geoJsonSource: {
        type: "vector",
        url: "mapbox://saurabhp.countries_tileset",
      },
      geoJsonLayer: {
        "source-layer": "countries",
        id: "maine",
        type: "fill",
        layout: {},
        paint: {
          "fill-color": {
            property: "name",
            type: "categorical",
            stops: [
              ["Argentina", "#A30059"],
            ],
          },
          "fill-opacity": 0.1,
        },
      },
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
