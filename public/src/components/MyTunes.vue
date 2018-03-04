<template>
        <div class="myTunes">
            <h1>myTunes</h1>
            <div class="playlist-results">
                <div v-for='myTune in myTunes'>
                    <div class="flexor border-grey">
                        <div class="mar-right">
                            <img v-bind:src="myTune.artworkUrl100">
                            <div class="margin-top">
                                <button @click='promoteTrack(myTune)' class='btn'><i class="fas fa-arrow-circle-up"></i></button>
                                <button @click='demoteTrack(myTune)' class='btn'><i class="fas fa-arrow-circle-down"></i></button>
                            </div>
                        </div>
                        <div class="playlist-info">
                                <i @click="removeTrack(myTune)" class="mar-left fas fa-times-circle"></i>
                            <h4>
                                <b>Artist: </b> {{myTune.artistName}}</h4>
                            <h5>
                                <b>Album: </b> {{myTune.collectionName}}</h5>
                            <h5>
                                <b>Title: </b>{{myTune.trackName}} ${{myTune.trackPrice}}</h5>
                                <audio controls><source :src="myTune.previewURL"></audio>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </template>

<script>
    export default {
        name: 'My-Tunes',
        props: ['result'],
        data() {
            return {

            }
        },
        methods: {
            promoteTrack(myTune){
                myTune.count++
                this.$store.dispatch('promoteTrack', myTune)
            },
            demoteTrack(myTune){
                myTune.count--
                this.$store.dispatch('demoteTrack', myTune)
            },
            removeTrack(myTune){
                this.$store.dispatch('removeTrack', myTune)
            }
        },
        computed: {
            myTunes() {
                return this.$store.state.myTunes
            }
        },
    }

</script>

<style scoped>
    /* .border-grey {
        border: .1rem solid #eee;
    } */

    .flexor {
        display: flex;
        margin-bottom: 1rem;
        justify-content: space-between;
    }

    .playlist-info {
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

    .mar-left {
        margin-left: 1rem;
    }
</style>