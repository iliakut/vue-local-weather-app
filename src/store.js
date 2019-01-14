import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    result: {},
    location: {
      latitude: 0,
      longitude: 0
    },
    weather: {
      main: 0,
      wind: 0,
      weather: [0]
    }
  },
  getters: {
    mainWeatherNumbers: state => { return state.weather.main },
    windInfo: state => { return state.weather.wind },
    weatherInfo: state => { return state.weather.weather[0] }
  },
  mutations: {
    setLocation(state, location) {
      state.location.latitude = location.latitude;
      state.location.longitude = location.longitude;
    },
    setLocationKey(state, key) {
      state.key = key;
    },
    setWeather(state, weather) {
      state.weather = weather;
    }
  },
  actions: {
    getLocation({ commit }) {
      const options = {
        timeout: 5000,
        maximumAge: 0
      };
      function success(pos) {
        let location = pos.coords;
        console.log(`Latitude : ${location.latitude}`);
        console.log(`Longitude: ${location.longitude}`);
        commit("setLocation", location);
      }
      function error(err) {
        console.warn(`ERROR(${err.code}): ${err.message}`);
      }

      navigator.geolocation.getCurrentPosition(success, error, options);
    },
    getLocationKey({ commit, state }) {
      const lat = state.location.latitude;
      const long = state.location.longitude;
      const APIkey = "5c28bda07c6ade5505cb5932556d6e92";
      const url = `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&APPID=${APIkey}&units=metric`;
        /*.then(response => (commit("setLocationKey", response.data.Key)))*/
      axios
        .get(url)
        .then(response => commit("setWeather", response.data))
        .catch(error => console.log(error));

    }
  }
})
