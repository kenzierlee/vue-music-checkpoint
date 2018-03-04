<template>
    <div class="login-signup">
        <h1>Welcome to Vue Music Login or Sign Up to Continue!</h1>
        <h4>Login:</h4>
        <form @submit.prevent="login">
            <input type="text" v-model="user.email" placeholder="Email">
            <input type="password" v-model="user.password" placeholder="Password">
            <button type="submit" class="btn btn-primary">Login</button>
        </form>
        <h4>Sign Up</h4>
        <form @submit.prevent="createUser">
            <input type="text" v-model="createdUser.email" placeholder="Email">
            <input type="password" v-model="createdUser.password" placeholder="Password">
            <button type="submit" class="btn btn-primary">Sign Up</button>
        </form>
    </div>
</template>
<script>
    export default {
        name: 'Login',
        data() {
            return {
                user: {},
                createdUser: {}
            }
        },
        methods: {
            login() {
                this.$store.dispatch("login", this.user)
            },
            createUser() {
                this.$store.dispatch('createUser', this.createdUser)
            }
        }
    }
</script>
<style scoped>
    * {
        background: url('https://images.pexels.com/photos/172289/pexels-photo-172289.jpeg?w=940&h=650&dpr=2&auto=compress&cs=tinysrgb') no-repeat center center fixed;
        -webkit-background-size: cover;
        -moz-background-size: cover;
        -o-background-size: cover;
        background-size: cover;
        color: white;
    }
</style>