import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
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
      base:"stations",
      main: {
        "temp":-2,
        "pressure":980,
        "humidity":92,
        "temp_min":-2,
        "temp_max":-2},
      wind: {
        "speed":3,
        "deg":270},
      weather: [{
        "id":620,
        "main":"Snow",
        "description":"light shower snow",
        "icon":"13n"}]
    },
    iconsSrc: {
      "01d": "http://openweathermap.org/img/w/01d.png",
      "01n": "http://openweathermap.org/img/w/01n.png",
      "02d": "http://openweathermap.org/img/w/02d.png",
      "02n": "http://openweathermap.org/img/w/02n.png",
      "03d": "http://openweathermap.org/img/w/03d.png",
      "03n": "http://openweathermap.org/img/w/03n.png",
      "04d": "http://openweathermap.org/img/w/04d.png",
      "04n": "http://openweathermap.org/img/w/04n.png",
      "09d": "http://openweathermap.org/img/w/09d.png",
      "09n": "http://openweathermap.org/img/w/09n.png",
      "10d": "http://openweathermap.org/img/w/10d.png",
      "10n": "http://openweathermap.org/img/w/10n.png",
      "11d": "http://openweathermap.org/img/w/11d.png",
      "11n": "http://openweathermap.org/img/w/11n.png",
      "13d": "http://openweathermap.org/img/w/13d.png",
      "13n": "http://openweathermap.org/img/w/13n.png",
      "50d": "http://openweathermap.org/img/w/50d.png",
      "50n": "http://openweathermap.org/img/w/50n.png"
    },
    weatherArr: [{
      "dt_txt": "",
      "main": {
        "temp": "0"
      }
    }]
  },
  getters: {
    mainWeatherNumbers: state => { return state.weather.main },
    windInfo: state => { return state.weather.wind },
    weatherInfo: state => { return state.weather.weather[0] },
    getWeatherText: state => {
      return state.weatherArr.map(item => {
        return item.dt_txt;
      })
    },
    getWeatherArr: state => {
      return state.weatherArr.map(item => {
        return item.main.temp;
      })
    }
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
    getLocalWeather({ commit, state, dispatch }) {
      const lat = state.location.latitude;
      const long = state.location.longitude;
      const APIkey = "5c28bda07c6ade5505cb5932556d6e92";
      const url = `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&APPID=${APIkey}&units=metric`;
      axios
        .get(url)
        .then(response => {
          dispatch("updateTime");
          commit("setWeather", response.data)})
        .catch(error => console.log(error));
    },
    getLocalWeatherSeveral({ commit, state }) {
      const lat = state.location.latitude;
      const long = state.location.longitude;
      const APIkey = "5c28bda07c6ade5505cb5932556d6e92";
      const url = `http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${long}&APPID=${APIkey}&units=metric`;
      axios
        .get(url)
        .then(response => {
          let responseArr = response.data.list.splice(0, 5);
          console.log("weather Arr's been received");
          commit("setWeatherArr", responseArr)})
        .catch(error => console.log(error));
    },
    getTest({commit}) {
      const query = "123";
      const url = "https://api.darksky.net/forecast/71be0b2a7e5f034a07355a1a85166e75/37.8267,-122.4233";
      jsonp(url, (error, response) => {
        if (error) {
          throw error;
        }
        console.log(response);
      });
    }
  }
})
