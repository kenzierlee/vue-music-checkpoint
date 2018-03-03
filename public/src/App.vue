<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>

export default {
  name: 'app',
  //whenever app is 'mounted' run this function
  mounted(){
    this.$store.dispatch('authenticate')
  }
}
</script>

<style>
</style>
