import vue from 'vue';
import vuex from 'vuex';
import $ from 'jquery';
import axios from 'axios';
import router from '../router';

vue.use(vuex);

let music = axios.create({
  baseURL: '//bcw-getter.herokuapp.com/?url=https://itunes.apple.com/search?term=',
  timeout: 3000
});

let api = axios.create({
  baseURL: '//localhost:3000/api/',
  timeout: 3000,
  withCredentials: true
});

var store = new vuex.Store({
  state: {
    myTunes: [],
    results: [],
    user: {}
  },
  mutations: {
    setResults(state, results) {
      state.results = results;
    },
    updateUser(state, payload) {
      state.user = payload;
    },
    setPlaylist(state, payload) {
      payload.sort(function (a,b){
        return b.count - a.count;
      })
      state.myTunes = payload
    }
  },
  actions: {
    getMusicByArtist({ commit, dispatch }, payload) {
      music.get(payload).then(res => {
        commit('setResults', res.data.results)
      })
        .catch(err => {
          console.error(err)
        })
    },
    //this should send a get request to your server to return the list of saved tunes
    getMyTunes({ commit, dispatch }) {
      api.get('mytunes/' + store.state.user + '/playlist').then(res => {
        commit('setPlaylist', res.data)
      })
    },
    //this will post to your server adding a new track to your tunes
    addToMyTunes({ commit, dispatch }, payload) {
      debugger
      api.post('mytunes/' + payload.userId + '/playlist', payload).then(res => {
        dispatch('getMyTunes', res)
      })
    },
    //Removes track from the database with delete
    removeTrack({ commit, dispatch }, payload) {
      debugger
      api.delete('mytunes/' + payload.userId + '/playlist/' + payload._id, payload).then(res => {
        dispatch('getMyTunes', res)
      })
    },
    //this should increase the position / upvotes and downvotes on the track
    promoteTrack({ commit, dispatch }, payload) {
      payload.count++
      api.put('myTunes/'+ payload.userId +'/playlist/'+ payload._id, payload).then(res => {
        dispatch('getMyTunes', res)
      })
    },
    //this should decrease the position / upvotes and downvotes on the track
    demoteTrack({ commit, dispatch }, payload) {
      payload.count--
      debugger
      api.put('myTunes/'+ payload.userId +'/playlist/'+ payload._id, payload).then(res => {
        dispatch('getMyTunes', res)
      })
    },
    login({ commit, dispatch }, payload) {
      api.post('user/login', payload).then(res => {
        commit('updateUser', res.data.user)
        router.push({ name: 'Home' })
      })
        .catch(err => {
          console.log('Invalid Information')
        })
    },
    createUser({ commit, dispatch }, payload) {
      api.post('user/register', payload).then(res => {
        commit('updateUser', res.data.user)
        router.push({ name: 'Home' })
      })
        .catch(err => {
          console.log('Invalid Information')
        })
    },
    authenticate({ commit, dispatch }, payload) {
      api.get('user/authenticate').then(res => {
        commit('updateUser', res.data)
        router.push({ name: 'Home' })
      })
        .catch(err => {
          console.log('Error Authenticating User');
          router.push({ name: 'Login' })
        })
    },
    logout({ commit, dispatch }, payload) {
      api.delete('user/logout').then(res => {
        commit('updateUser', {})
        dispatch('authenticate', payload)
      })
    }

  }
});

export default store;
