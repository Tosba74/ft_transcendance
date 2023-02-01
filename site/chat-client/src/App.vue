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
const me = ref(false);
const name = ref('');
const typingDisplay = ref('');

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

	socket.on('users', (count) => {
		if (count > 1) {
			usersCount.value = `${count} users online`;
		}
		else {
			usersCount.value = `${count} user online`;
		}
	})

	socket.on('join', ({id, name}) => {
		users.value.push({id, name});
	})

	socket.on('disconect', (id) => {
		users.value = users.value.filter(user => user.id !== id);
	})

	socket.on('message', (message) => {
		messages.value.push(message);
	})
	
	socket.on('typing', ({name, isTyping}) => {
		if (isTyping) {
			typingDisplay.value = `${name} is typing ...`;
		}
		else {
			typingDisplay.value = '';
		}
	})
});

const join = () => {
	if (name.value.length > 0)
	{
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

const emitTyping = () => {
	socket.emit('typing', { isTyping: true});
	let timeout = setTimeout (() => {
		socket.emit('typing', { isTyping: false});
	}, 5000);
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
				<div>
					<div class="users" v-for="user in users">
						<div :socketId="user.id">
							<span v-if="user.name === name" class="me">{{ user.name }}</span>
							<span v-else class="else">{{ user.name }}</span>
						</div>	 <!-- PAS MIS A JOUR PAR DISCONNECT -->
					</div>
				</div>
				<div class="count">{{ usersCount }}</div>
			</div>
			<div class="messages-container">
				<div class="messages scrollbar">
					<div v-for="message in messages.slice().reverse()">
						<div v-if="message.name === name" class="name me"><span>{{  message.text }}</span></div>
						<div v-else class="name else"><span class="else-name">[{{ message.name }}]:</span><span>{{  message.text }}</span></div>
					</div>
				</div>
				<div class="write">
					<div class="typing">
						<div v-if="typingDisplay">{{ typingDisplay }}</div>
					</div>
					<form @submit.prevent="sendMessage">
						<input v-model="messageText" @input="emitTyping" autofocus placeholder="Message ..."/>
						<button type="submit">Send</button>
					</form>
				</div>
			</div>
		</div>

	</div>
</template>

<style>
@import './assets/base.css';

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
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	width: 25%;
	height: calc(100vh - 40px);
	overflow: auto;
	padding: 0 10px;
}

.users-container .me {
	opacity: 1;
}

.users-container .else {
	opacity: 0.5;
}

.count {
	padding-bottom: 5px;
	opacity: 0.5;
}

.messages-container {
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	width: 75%;
	padding: 0 10px;
	line-break: anywhere;
}

.messages {
	height: calc(100vh - 140px);
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
	justify-content: end;
	height: 100px;
}

.typing {
	opacity: 0.5;
	margin: 10px 5px;
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
