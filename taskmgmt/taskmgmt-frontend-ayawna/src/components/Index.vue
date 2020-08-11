<template>
  <v-container>
    <v-form>
      <v-text-field label="email" v-model="email"></v-text-field>
      <v-text-field label="password" v-model="password"></v-text-field>
      <v-btn v-on:click="login">Login</v-btn>
    </v-form>
  </v-container>
</template>

<script>
import axios from 'axios'

axios.defaults.withCredentials = true
axios.defaults.baseURL = 'http://localhost:8000'

  export default {
    name: 'Index',
    data(){
      return{
        email:'',
        password:''
      }
    },
    mounted(){
      Echo.channel('public-channel').listen('public.event', (e) =>{
        console.log(e);
      })
    },
    methods:{
      login(){
        axios.get('/sanctum/csrf-cookie').then(response =>{
               axios.post('/login',{
                   email: this.email,
                   password: this.password,
               })
               .then(response =>{
                  this.$router.push({ name: 'chat' })
               })
                .catch(error => {
                    console.log('login failed');
                })
        }).catch(error =>{
          console.log('laravel error')
        })        
      }
    }
  }
</script>
