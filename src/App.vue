<template>
  <v-app :dark=darkThemeOn>
    <v-navigation-drawer
        clipped
        v-model="drawer"
        app>
      <v-list>
        <v-list-tile :to="'/'">
          About
        </v-list-tile>
        <v-list-tile :to="'/Localweather'">
          Local weather
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>

    <v-toolbar app fixed clipped-left>
      <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
      <v-toolbar-title>Weather App</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items>
        <v-switch v-model="darkThemeOn"></v-switch>
      </v-toolbar-items>
    </v-toolbar>

    <v-fade-transition mode="out-in">
      <router-view></router-view>
    </v-fade-transition>
  </v-app>
</template>

<script>

export default {
  name: 'App',
  components: {
  },
  data () {
    return {
      darkThemeOn: true,
      drawer: true
    }
  }
}
</script>
