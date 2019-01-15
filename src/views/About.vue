<template>
  <v-content>
    <v-img
      src="https://cdn.vuetifyjs.com/images/backgrounds/vbanner.jpg"
      height="100%">
      <v-layout
        align-center
        column
        justify-center
        text-xs-center
      >

        <h1 class="display-2 font-weight-thin mb-3 textColor">
          Vue local weather app
        </h1>
      </v-layout>
        <span>
           This is a SPA that shows the weather in your current location.
        </span><br>
        <span>
          It's been made using: Vue.js, Vuetify.js, Vuex, VueCLI, VueRouter, Axios
        </span><br>
        <span>
          The SPA is fully mobile friendly
        </span>
        <span><br>
          For correct work of the App you should give access to your position<br>
          after that the App will get the information of weather from
          <a href="https://openweathermap.org/" target="_blank">https://openweathermap.org/</a>
        </span>

    </v-img>
  </v-content>
</template>

<script>
  export default {
    name: "About"
  }
</script>

<style scoped>
.textColor {
  color: #ffffff
}
  span {
    color: #ffffff
  }
  a {
    color: #9fa5f8
  }
</style>
