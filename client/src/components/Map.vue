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
import countries from "@/assets/countries.geo.json";
import * as whichPolygon from "which-polygon";
import Mapbox from "mapbox-gl";
import { MglMap, MglGeojsonLayer } from "vue-mapbox";

export default {
  props: ["highlightAreas"],
  components: {
    MglMap,
    MglGeojsonLayer,
  },
  methods: {
    onClick(e) {
      const query = whichPolygon(countries);
      const country = query([
        e.mapboxEvent.lngLat.lng,
        e.mapboxEvent.lngLat.lat,
      ]);
      
      if (country)
        this.$emit("pickedCountry", {
          country: country.adm0_a3,
          x: e.mapboxEvent.point.x,
          y: e.mapboxEvent.point.y,
        });
    },
    updateHighlightedAreas(highlight) {
      this.geoJsonSource.data.features = highlight;
    },
  },
  data() {
    return {
      accessToken: process.env.VUE_APP_MAP_TOKEN, // your access token. Needed if you using Mapbox maps
      mapStyle: "mapbox://styles/tammaroivan/ckawnwq9d0dee1ilnxrnegehr", // your map style
      geoJsonSource: {
        type: "geojson",
        data: {
          type: "FeatureCollection",
          features: {},
        },
      },
      geoJsonLayer: {
        id: "maine",
        type: "fill",
        source: "maine",
        layout: {},
        paint: {
          "fill-color": "#088",
          "fill-opacity": 0.8,
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
