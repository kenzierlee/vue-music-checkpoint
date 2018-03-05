<template>
  <div class="home">
    <nav class="navbar navbar-light bg-light">
      <span class="navbar-brand mb-0 h1">
        <i class="fas fa-music"></i>
      </span>
      <h1>Vue Music</h1>
      <form @submit.prevent='artistSearch'>
        <input type='text' v-model='artist' placeholder='Search By Artist'>
        <button type='submit' class="btn btn-large">Search</button>
      </form>
      <button type="button" @click.prevent="logout" class="btn btn-lg">
        <b>logout</b>
      </button>
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
    mounted() {
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
      },
      logout() {
        this.$store.dispatch('logout')
      }
    },
    components: {
      itunes,
      MyTunes
    }
  }
</script>


<style scoped>
  .my-tunes {
    background: rgba(173, 216, 230, 0.5);
  }

  .itunes {
    background: rgba(128, 128, 128, 0.5);
  }

  *nav {
    display: inline-block;
    justify-content: center;
  }

  * {
    background: url('https://images.pexels.com/photos/5156/people-eiffel-tower-lights-night.jpg?w=940&h=650&dpr=2&auto=compress&cs=tinysrgb') no-repeat center center fixed;
    -webkit-background-size: cover;
    -moz-background-size: cover;
    -o-background-size: cover;
    background-size: cover;
    color: white;
  }
</style>