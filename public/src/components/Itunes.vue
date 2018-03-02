<template>
    <div class="itunes">
        <h1>Search Results</h1>
        <div class="search-results">
            <div v-for='result in results'>
                <div class="flexor mar-bottom border-grey">
                    <div class="mar-right">
                        <img v-bind:src="result.artworkUrl60">
                        <div class="margin-top">
                            <button @click='addTrack(result)' class='btn btn-lg'>
                                <i class="fas fa-1x fa-arrow-circle-up"></i>Add To Playlist</button>
                        </div>
                    </div>
                    <div class="result-info">
                        <h4>
                            <b>Artist: </b> {{result.artistName}}</h4>
                        <h5>
                            <b>Album: </b> {{result.collectionName}}</h5>
                        <h5>
                            <b>Title: </b>{{result.trackName}} ${{result.trackPrice}}</h5>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'iTunes',
        props: ['artist'],
        methods: {
           addTrack(result){
               this.$store.dispatch('addToMyTunes', result)
           }
        },
        computed: {
            results() {
                return this.$store.state.results
            }
        }
    }

</script>

<style>
    .flexor {
        display: flex;
        margin-bottom: .3rem;
        padding: .5rem;
        border-radius: 10px;
        justify-content: space-between
    }

    .result-info {
        align-self: center;
        padding: .5rem;
        width: 100%;
    }
</style>