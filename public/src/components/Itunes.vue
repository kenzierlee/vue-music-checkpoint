<template>
    <div class="itunes">
        <h1>Search Results</h1>
        <div class="search-results">
            <div v-for='result in results'>
                <div class="flexor border-grey">
                    <div class="mar-right">
                        <img v-bind:src="result.artworkUrl100">
                        <div class="margin-top">
                            <button @click='addTrack(result)' class='btn btn-lg'>Add To Playlist</button>
                        </div>
                    </div>
                    <div class="result-info">
                        <h4>
                            <b>Artist: </b> {{result.artistName}}</h4>
                        <h5>
                            <b>Album: </b> {{result.collectionName}}</h5>
                        <h5>
                            <b>Title: </b>{{result.trackName}} ${{result.trackPrice}}</h5>
                            <audio controls><source :src="result.previewUrl" type="audio/mp4"></audio>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import myTunes from './MyTunes'
    export default {
        name: 'iTunes',
        props: ['artist'],
        computed: {
            results() {
                return this.$store.state.results
            }
        },
        methods: {
            addTrack(result) {
                this.$store.dispatch('addToMyTunes', result)
            }
        },
        components: {
            myTunes
        }
    }

</script>

<style scoped>
    .flexor {
        display: flex;
        margin-bottom: 1rem;
        justify-content: space-between
    }

    .result-info {
        align-self: center;
        padding: .5rem;
        margin-bottom: 2.5rem;
        margin-left: 2rem;
        width: 100%;
    }

    img {
        margin-bottom: .5rem;
        margin-left: 2.75rem;
    }

    button {
        margin-left: 1rem;
    }

    h1 {
        margin-bottom: 3rem;
    }

    .mar-right {
        margin-right: 1rem;
    }
</style>