<template>
  <v-content>
    <h1>Localweather view</h1>
    <h3>{{ mainWeatherNumbers() }}</h3>
    <h3>{{ windInfo() }}</h3>
    <h3>{{ weatherInfo() }}</h3>
</v-content>
</template>

<script>
  import { mapActions } from 'vuex'
  import { mapState } from 'vuex'
  import { mapGetters } from 'vuex'
  export default {
    data: () => ({
      ...mapState (["weather"]),
      ...mapGetters (["mainWeatherNumbers", "windInfo", "weatherInfo"])
    }),
   methods: {
     ...mapActions(["getLocation", "getLocationKey"]),
     updateLocation: function() {
       this.getLocation();
     },
     updateLocationKey: function() {
       setTimeout(() => { this.getLocationKey() }, 100);

     }
   },
    mounted: function() {
      this.updateLocation();
      this.updateLocationKey();
    }
  }
</script>

<style>

</style>
