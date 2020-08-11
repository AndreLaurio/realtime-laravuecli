<template>
    <div class="row">
        <div class="col-8">
            <div class="card card-default">
                <div class="card-header">Messages</div>
                <div class="card-body p-0">
                    <ul class="list-unstyled" style="height:300px; overflow-y:scroll">
                        <li class="p-2" v-for="(message, index) in messages" :key="index">  
                            <strong>{{message.user_id}}</strong>                       
                            {{message.message}}
                            <strong>{{message.sample}}</strong>
                        </li>
                    </ul>
                </div>
                <input type="text" @keyup.enter="sendMessage" v-model="newMessage" name="message" placeholder="Enter your message.." class="form-control">
            </div>
             <span class="text-muted">user is typing...</span>
        </div>
    </div>
</template>

<script>
    export default {
        props:['user'],
        data(){
            return{
                messages:[],
                newMessage:'',
            }
        },
        mounted(){
          this.fetchMessages()  

          Echo.join('chat').listen('MessageSent', (event) => this.messages.push(event.message))
        },

        methods:{
            fetchMessages(){
                axios.get('messages').then(response =>{
                    this.messages = response.data,
                    console.log(response.data)
                })
            },
            sendMessage(){
                this.messages.push({
                    user: this.user.name,
                    message: this.newMessage
                })

                axios.post('messages', {
                    sample: this.user.user_id,
                    user: this.user.user_id,
                    message: this.newMessage
                }).catch(error =>{
                    console.log(error.data)
                })
                this.newMessage = ''
            }
        }
    }
</script>
