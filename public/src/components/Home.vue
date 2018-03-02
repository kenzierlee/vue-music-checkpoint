<template>
  <div class="home">
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <h1>Vue Music</h1>
      <form class='col-sm-12' @submit.prevent='artistSearch'>
        <input type='text' v-model='artist' placeholder='Search By Artist'>
        <button type='submit' class="btn btn-large">Search</button>
      </form>
    </nav>
    <!-- YOU WILL PROBABLY END UP WITH SOMETHING LIKE THIS -->
    <itunes class="itunes"></itunes>
    <my-tunes class="my-tunes"></my-tunes>
  </div>
</template>

<script>
  import MyTunes from './MyTunes.vue'
  import Itunes from './Itunes.vue'
  export default {
    name: 'home',
    data() {
      return {
        artist: ''
      }
    },
    methods: {
      artistSearch() {
        this.$store.dispatch('getMusicByArtist', this.artist)
      }
    },
    components: {
      Itunes,
      MyTunes
    }
  }
</script>


<style>
  .my-tunes {
    display: inline-block;
    min-height: 500px;
    min-width: 50%;
    background: lightblue;
  }

  .itunes {
    display: inline-block;
    background: gray;
    min-height: 500px;
    min-width: 45%;
  }
</style>