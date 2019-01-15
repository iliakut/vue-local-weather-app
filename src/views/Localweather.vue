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
            <span> {{ mainWeatherNumbers().temp }} °C</span><br>
            <v-img :src="iconsSrc()[weatherInfo().icon]" max-height="70"
                   contain></v-img>
          </div>
        </v-flex>
        <v-flex xs3>
          <div>
            <span class="grey--text">Pressure</span><br>
            <span>{{ mainWeatherNumbers().pressure }} hPa</span>
          </div>
        </v-flex>
        <v-flex xs3>
          <div>
            <span class="grey--text">Humidity</span><br>
            <span>{{ mainWeatherNumbers().humidity }} %</span>
          </div>
        </v-flex>
        <v-flex xs3>
          <div>
            <span class="grey--text">Wind</span><br>
            <span>{{ windInfo().speed }} m/s</span>
          </div>
        </v-flex>
        <v-flex xs3>
          <div>
            <span class="grey--text">Precipitation</span><br>
            <span>{{ weatherInfo().description }}</span>
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
        max-width="calc(100% - 32px)"
    >
      <v-sparkline
            :labels="getWeatherText()"
            :value="getWeatherArr()"
            color="white"
            line-width="1"
            padding="15"
        ></v-sparkline>

    </v-sheet>

    <v-card-text class="pt-0">
      <div class="title font-weight-light mb-2">
        Temperature sparkline
      </div>
    </v-card-text>
  </v-card>
    </v-container>
    <v-container>
        <v-btn @click="updateDataandTime">Update</v-btn>
      <span class="grey--text">Weather updated at {{ time }}</span>
    </v-container>
  </v-content>
</template>

<script>
  import { mapActions } from 'vuex'
  import { mapState } from 'vuex'
  import { mapGetters } from 'vuex'
  export default {
    data: () => ({
      ...mapState (["weather", "iconsSrc", "weatherArr"]),
      ...mapGetters (["mainWeatherNumbers", "windInfo", "weatherInfo", "getWeatherText", "getWeatherArr"]),
      value: [],
      labels: [],
      time: ""
    }),
   methods: {
     ...mapActions(["getLocation", "getLocalWeather", "getLocalWeatherSeveral"]),
     updateLocation: function() {
       this.getLocation();
     },
     updateLocationWeather: function() {
       setTimeout(() => {
         this.getLocalWeather();
         this.getLocalWeatherSeveral();
         this.updateTime();
       }, 100);
     },
     updateTime: function() {
       let date = new Date();
       this.time = date.getHours() + "h. " + date.getMinutes() + "m. " + date.getSeconds() + "s.";
     },
     updateDataandTime() {
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
