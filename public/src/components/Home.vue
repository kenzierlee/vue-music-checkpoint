<template>
  <div class="home">
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <h1>Vue Music</h1>
      <form class='col-sm-12' @submit.prevent='artistSearch'>
        <input type='text' v-model='artist' placeholder='Search By Artist'>
        <button type='submit' class="btn btn-large">Search</button>
      </form>
    </nav>
    <div class="container-fluid">
      <div class="row">
        <div class="col-md-6">
          <itunes class="itunes"></itunes>
        </div>
        <div class="col-md-6">
          <my-tunes class="my-tunes"></my-tunes>
        </div>
      </div>
    </div>
    <!-- YOU WILL PROBABLY END UP WITH SOMETHING LIKE THIS -->
  </div>
</template>

<script>
  import itunes from './Itunes.vue'
  import MyTunes from './MyTunes.vue'
  export default {
    name: 'home',
    mounted(){
      this.$store.dispatch('getMyTunes')
    },
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
    computed: {

    },
    components: {
      itunes,
      MyTunes
    }
  }
</script>


<style>
  .my-tunes {
    background: lightblue;
  }

  .itunes {
    background: gray;
  }
</style>