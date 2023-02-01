<script setup>
import { io } from 'socket.io-client';

// vue working-process: https://learnvue.co/tutorials/vue-lifecycle-hooks-guide
import { onBeforeMount, ref } from 'vue';

const socket = io('http://localhost:4000');

const usersCount = ref('');
const users = ref([]);
const messages = ref([]);
const messageText = ref('');
const joined = ref(false);
const name = ref('');
const usersTyping = ref([]);

/*
	emit:
	emit(event, bodyarguments, optional_callback)
	suite a une interaction avec la page html,
	mon socket emit un message au server (requete GET POST selon bodyarguments)
	fonction callback appelée que si l'event coté server retourne une valeur
	
	on:
	on(event, optional_callback)
	suite a un event emit par le server
	mon socket recoit un message du server suite
*/

// onBeforeMount: call right before the component DOM is actually rendered and mounted
onBeforeMount(() => {
	socket.emit('findAllUsers', {}, (response) => {
		users.value = response;
	})

	socket.emit('findAllMessages', {}, (response) => {
		messages.value = response;
	})

	// PAS INDISPENSABLE ?
	socket.on('users', (count) => {
		if (count > 1) {
			usersCount.value = `${count} users online`;
		}
		else {
			usersCount.value = `${count} user online`;
		}
	})

	socket.on('join', ( {id, name} ) => {
		users.value.push({id, name});
	})

	socket.on('disconect', (id) => {
		users.value = users.value.filter(user => user.id !== id);
	})

	socket.on('message', (message) => {
		messages.value.push(message);
	})
	
	socket.on('typing', (response) => {
		usersTyping.value = response;
	})
});

const join = () => {
	if (name.value.length > 0)
	{
		// fonction callback de emit appelée que si l'event coté server retourne une valeur
		socket.emit('join', { name: name.value }, () => {
			joined.value = true;
		})
	}
};

const sendMessage = () => {
	socket.emit('createMessage', { text: messageText.value }, () => {
		messageText.value = '';
	})
};

let typing = false;
const emitTyping = () => {
	const val = name.value;
	if (typing === false)
	{
		typing = true;
		socket.emit('typing', { name: val, isTyping: true } );
		
		let timeout = setTimeout (() => {
			socket.emit('typing', { name: val, isTyping: false } );
			typing = false;
		}, 5000);
	}
};
</script>

<template>
	<div class ="chat">
		
		<!-- MODULE D'IDENTIFICATION -->
		<div class="join" v-if="!joined">
			<form @submit.prevent="join">
				<input v-model="name" autofocus placeholder="Pseudo" />
				<button type="submit">Enter</button>
			</form>
		</div>
		
		<!-- MODULE DE CHATROOM -->
		<div class="chat-container" v-else>
			<div class="users-container scrollbar">
				<div class="count">{{ usersCount }}</div>
				<div>
					<div class="users" v-for="user in users">
						<div :socketId="user.id">							
							<template v-for="userTyping in usersTyping">
								<span v-if="userTyping !== name && userTyping === user.name" class="typing"></span>
								<span v-else-if="userTyping === user.name" class="me-typing"></span>
							</template>
							<span v-if="user.name === name" class="me">{{ user.name }} [me]</span>
							<span v-else class="else">{{ user.name }}</span>
						</div>
					</div>
				</div>
			</div>
			<div class="messages-container">
				<div class="title">Chat</div>
				<div class="messages scrollbar">
					<div v-for="message in messages.slice().reverse()">
						<div v-if="message.name === name" class="name me"><span>{{ message.text }}</span></div>
						<div v-else class="name else"><span class="else-name">[{{ message.name }}]: </span><span>{{ message.text }}</span></div>
					</div>
				</div>
				<div class="write">
					<form @submit.prevent="sendMessage">
						<input v-model="messageText" @input="emitTyping" autofocus placeholder="Message..."/>
						<button type="submit">Send</button>
					</form>
				</div>
			</div>
		</div>

	</div>
</template>

<style>
@import './assets/base.css';
/*
	determiner des macros pour les colours (page + text)
*/
html, body {
	background-color: rgb(15, 15, 15) !important;
	cursor: default;
}

#app {
	display: flex !important;
	justify-content: center;
	width: 100%;
	font-size: 20px;
	padding-top: 0!important;
	padding-bottom: 0!important;
}

.scrollbar {
	scrollbar-color: rgba(100, 148, 237, 0.4) rgb(15, 15, 15);
	scrollbar-width: thin;
	padding-right: 10px;
}

.chat {
	padding:20px;
	height: 100vh;
	width: 800px;
	color:rgba(100, 148, 237, 1);
}

.join {
	display: flex;
	flex-direction: column;
	justify-content: center;
	height: 100%;
}

.join input {
	max-width: 300px;
}
.join button {
	max-width: 100px;
}

.chat-container {
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	width: 100%;
	height: 100%;
}

.users-container {
	width: 25%;
	height: calc(100vh - 40px);
	overflow: auto;
	padding: 0 10px;
}

.users-container .me {
	color:rgba(100, 148, 237, 0.5);
}

.users-container .else {
	color:rgba(100, 148, 237, 0.5);
}

.count {
	text-align: center;
	color:rgba(100, 148, 237, 1);
	background-color:rgba(100, 148, 237, 0.15);
}

.messages-container {
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	width: 75%;
	padding: 0 10px;
	line-break: anywhere;
	border-left: solid 1px rgba(100, 148, 237, 0.3);
	border-right: solid 1px rgba(100, 148, 237, 0.3);
}

.title {
	text-align: center;
	background-color:rgba(100, 148, 237, 0.15);
}

.messages {
	height: calc(100vh - 100px);
	overflow: auto;
	display: flex;
	flex-direction: column-reverse;
}

.messages .me {
	padding-left: 25%;
	text-align: right;
}

.messages .else {
	padding-right: 25%;
}
.messages .else-name {
	opacity: 0.5;
}

.write {
	display: flex;
	flex-direction: column;
	justify-content: center;
	height: 60px;
}

.typing + span, .me-typing + span{
	color:rgba(100, 148, 237, 1)!important;
}
.typing + span:after{
	font-size: 12px;
	font-style: italic;
	content: ' is typing ...';
}

form {
	display: flex;
	justify-content: center;
}

label {
	opacity: 0.5;
	padding: 10px 0;
}

input, button {
	height: 35px;
	border: 0;
	border-radius: 5px;
	font-size: 20px;
	cursor: default;
	margin: 0 5px;
}

input {
	background-color:rgba(100, 148, 237, 0.3);
	color: white;
	width: calc(75% - 20px);
	padding: 5px 15px;
}

button {
	background:rgba(100, 148, 237, 0.8);
	color: rgb(5,5,5);
	width: 25%;
	padding: 5px;
}

input:hover, input:active, input:focus {
	background-color:rgba(100, 148, 237, 0.4);
	transition: .15s;
}

button:hover, button:active, button:focus {
	transition: .15s;
	background:rgba(100, 148, 237, 1);
}

@media only screen and (max-width: 600px) {
	#app {
		padding: 0px!important;
	}
	.chat {
		padding: 20px 10px!important;
	}
	button {
		line-break:normal;
	}
}
</style>
