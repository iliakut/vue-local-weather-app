<template>
  <v-content>
    <v-container  grid-list-md text-xs-center>
      <v-card>
      <v-layout row wrap>
        <v-flex xs12>
          <span class="headline">The weather in your current position</span>
        </v-flex>
        <v-flex xs12>
          <div>
            <span class="grey--text">Temperature</span>
            <span> {{ weather().temperature }} °C</span><br>
            <v-img max-height="70"
                   contain></v-img>
          </div>
        </v-flex>
        <v-flex xs3>
          <div>
            <span class="grey--text">Pressure</span><br>
            <span>{{ weather().pressure }} hPa</span>
          </div>
        </v-flex>
        <v-flex xs3>
          <div>
            <span class="grey--text">Humidity</span><br>
            <span>{{ weather().humidity * 100 }} %</span>
          </div>
        </v-flex>
        <v-flex xs3>
          <div>
            <span class="grey--text">Wind</span><br>
            <span>{{ weather().windSpeed }} m/s</span>
          </div>
        </v-flex>
        <v-flex xs3>
          <div>
            <span class="grey--text">Precipitation</span><br>
            <span>{{ weather().summary }}</span>
          </div>
        </v-flex>
      </v-layout>
      </v-card>
    </v-container>
    <v-container>
      <v-card>
    <v-sheet
        class="v-sheet--offset mx-auto"
        color="indigo  accent-2"
        elevation="12"
        max-width="calc(100% - 32px)">
    </v-sheet>
        <v-sparkline
            :labels="getWeatherArrTemp()"
            :value="getWeatherArrTemp()"
            color="white"
            line-width="1"
            padding="15"
        ></v-sparkline>
    <v-card-text class="pt-0">
      <div class="title font-weight-light mb-2">
        Temperature sparkline (for 24 next hours)
      </div>
    </v-card-text>
  </v-card>
    </v-container>
    <v-container>
        <v-btn @click="updateDataAndTime">Update</v-btn>
      <span v-if="time() === ''"  class="grey--text">Weather was not updated</span>
      <span v-else class="grey--text">Weather updated at {{ time() }}</span>
    </v-container>
  </v-content>
</template>

<script>
  import { mapActions } from 'vuex'
  import { mapState } from 'vuex'
  import { mapGetters } from 'vuex'
  export default {
    data: () => ({
      ...mapState (["weather", "time"]),
      ...mapGetters (["getWeatherArrTemp"]),
      value: [],
      labels: []
    }),
   methods: {
     ...mapActions(["getLocation", "getWeather"]),
     updateLocation: function() {
       this.getLocation();
     },
     updateLocationWeather: function() {
       setTimeout(() => {
         this.getWeather();
       }, 100);
     },
     updateDataAndTime() {
       // time updated in Vuex
       this.updateLocation();
       this.updateLocationWeather();
     }
   },
    mounted: function() {
      this.updateLocation();
      this.updateLocationWeather();
    }
  }
</script>

<style>
  text {
    font-size: 3px;
  }
</style>
