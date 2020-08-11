<template>
    <v-container>
        <v-row justify="center">
            <v-col cols="12">
                <v-card>
                    <v-card-title>Messages</v-card-title>
                    <v-card-text>
                        <ul class="list-unstyled" style="height:300px; overflow-y:scroll">
                            <li class="p-2" v-for="message in messages" :key="message.id">
                                <strong>{{message.user}}</strong>
                                {{message.message}}
                            </li>
                        </ul>
                    </v-card-text>
                    <v-card-actions>
                        <v-text-field v-model="newMessage" placeholder="Enter your Message" v-on:keyup.enter="sendMessage"></v-text-field>
                    </v-card-actions>
                </v-card>
            </v-col>
        </v-row>        
    </v-container>
</template>
<script>
import axios from 'axios'
import Echo from 'laravel-echo'

axios.defaults.withCredentials = true
axios.defaults.baseURL = 'http://localhost:8000'

export default {
    data(){
        return{
            userid:'',
            messages:[],
            newMessage:''
        }
    },

    mounted(){
        this.getUserInfo()
        this.fetchMessages()
    
        window.Echo.channel('chat').listen('MessageSent', (event) => this.messages.push({
            message: event.message.message,
            user: event.user.last_name
        }))
        window.Echo.channel('public-channel')
            .listen('PublicEvent', (event) => {
                console.log(event);
            });
    },

    methods:{
        getUserInfo(){
            axios.get('api/user').then(response =>{
                this.userid = response.data.user_id
                // console.log(this.userid)
            })
            .catch(error => {
                console.log("ERRRR:: ",error.response.data);
            })
        },
        fetchMessages(){
        axios.get('api/messages').then(response =>{
                this.messages = response.data
                // console.log(response.data)
            })
        },
        sendMessage(){
            axios.post('api/messages', {
                user: this.userid,
                message: this.newMessage
            }).catch(error =>{
                console.log(error.data)
            })
                this.newMessage = ''
        },
    }
}
</script>