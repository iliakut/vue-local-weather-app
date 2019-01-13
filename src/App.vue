<template>
  <v-app black>
    <v-navigation-drawer app fixed clipped>
      <v-list>
        <v-list-tile :to="'/About'">
          About
        </v-list-tile>
        <v-list-tile :to="'/Localweather'">
          Local weather
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>

    <v-toolbar app fixed clipped-left>
      <v-menu>
        <v-toolbar-title slot="activator">
          Navigation
        </v-toolbar-title>
        <v-list>
          <v-list-tile :to="'/About'">
            About
          </v-list-tile>
          <v-list-tile :to="'/Localweather'">
            Local weather
          </v-list-tile>
        </v-list>
      </v-menu>
    </v-toolbar>
    <v-fade-transition mode="out-in">
      <router-view></router-view>
    </v-fade-transition>
  </v-app>
</template>

<script>
import HelloWorld from './views/Localweather'
import About from './views/About'

export default {
  name: 'App',
  components: {
    HelloWorld,
    About
  },
  data () {
    return {
      //
    }
  }
}
</script>
