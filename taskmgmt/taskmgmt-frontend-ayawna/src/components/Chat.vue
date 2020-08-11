<template>
    <v-container>
        <v-row justify="center">
            <v-col cols="12">
                <v-card>
                    <v-card-title>Messages</v-card-title>
                    <v-card-text>
                        <ul class="list-unstyled" style="height:300px; overflow-y:scroll">
                            <li class="p-2" v-for="m in messages" :key="m.id">
                                {{m.message}}
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
        //  this.$echo.join('chat').listen('MessageSent', (event) => {
        //     this.messages.push(event.message)
        // });
    },

    methods:{
        getUserInfo(){
            axios.get('api/user').then(response =>{
                this.userid = response.data.user_id
                const echo = new Echo({
                    broadcaster: 'socket.io',
                    host: 'http://localhost:6001',
                    auth:{
                        headers:{
                            Authorization: `Bearer ${localStorage.getItem(token)}`
                        }
                    }
                })

                echo.join('')
            })
            .catch(error => {
                console.log("ERRRR:: ",error.response.data);
            })
        },
        fetchMessages(){
        axios.get('api/messages').then(response =>{
                this.messages = response.data,
                console.log(response.data)
            })
        },
        sendMessage(){
            this.$emit('MessageSent', {
                message: this.newMessage
            });

            this.messages.push({
                // user_id: this.user_id,
                message: this.newMessage
            })

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