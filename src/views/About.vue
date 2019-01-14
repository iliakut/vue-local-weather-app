<template>
  <v-content>
    <v-img
      src="https://cdn.vuetifyjs.com/images/backgrounds/vbanner.jpg"
      height="100%">
      <v-layout
        align-center
        column
        justify-center
      >
        <h1 class="display-2 font-weight-thin mb-3">
          Vue local weather app
        </h1>
        <h3>
          This is a SPA that shows the weather in your current location.
        </h3>
        <h3>
          It's been made using: Vue.js, Vuetify.js, Vuex, VueCLI, VueRouter...
        </h3>
        <h3>The SPA is fully mobile friendly</h3>
      </v-layout>
    </v-img>
  </v-content>
</template>

<script>
  export default {
    name: "About"
  }
</script>

<style scoped>

</style>
