import Vue from 'vue'
import Vuex from 'vuex'
import jsonp from "jsonp";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    result: {},
    time: "",
    location: {
      latitude: 59.9386300,
      longitude: 30.3141300
    },
    weather: {
      "temperature": 0,
      "pressure": 1010.34,
      "humidity": 0.83,
      "windSpeed": 5.59,
      "summary": "Drizzle",
      "icon": "rain"
    },
    iconsSrc: {
    },
    weatherArr: [{
      "time": 1509991200,
      "temperature": 0,
      "icon": "partly-cloudy-day"
    },
      {
        "time": 1509991200,
        "temperature": 0,
        "icon": "partly-cloudy-day"
      },
      {
        "time": 1509991200,
        "temperature": 0,
        "icon": "partly-cloudy-day"
      }]
  },
  getters: {
    getWeatherArrTemp: state => {
      return state.weatherArr.map(item => {
        return item.temperature;
      })
    },
    getWeatherArrIcons: state => {
      return state.weatherArr.map(item => {
        return item.icon;
      })
    }
  },
  mutations: {
    setLocation(state, location) {
      state.location.latitude = location.latitude;
      state.location.longitude = location.longitude;
    },
    setWeather(state, weather) {
      state.weather = weather;
    },
    setWeatherArr(state, arr) {
      state.weatherArr = arr;
    },
    setTime(state, time) {
      state.time = time;
    }
  },
  actions: {
    updateTime({ commit }) {
      let date = new Date();
      let time = this.time = date.getHours() + "h. " + date.getMinutes() + "m. " + date.getSeconds() + "s.";
      commit("setTime", time);

    },
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
    getWeather({state, commit, dispatch }) {
      const lat = state.location.latitude;
      const long = state.location.longitude;
      const url = `https://api.darksky.net/forecast/71be0b2a7e5f034a07355a1a85166e75/${lat},${long}?units=auto`;
      jsonp(url, (error, response) => {
        if (error) {
          throw error;
        }
        console.log("weather updated");
        dispatch("updateTime");
        commit("setWeather", response.currently);
        commit("setWeatherArr", response.hourly.data.splice(0, 24));
      });
    }
  }
})
