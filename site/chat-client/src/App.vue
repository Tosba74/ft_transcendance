<script setup>
import { io } from 'socket.io-client';
import { onBeforeMount, ref } from 'vue';


// console.log(import.meta.env.VITE_APP_BACK_URL);
// const socket = io(import.meta.env.VITE_APP_BACK_URL);	// COMMENT FAIRE COMMUNIQUER AVEC LE back:3000 ???
const socket = io('http://localhost:3001');	// pour tester en local (car le front utilise le 3000)

const messages = ref([]);
const messageText = ref('');
const joined = ref(false);
const name = ref('');
const typingDisplay = ref('');

// EVENTS LIES AUX AUTRES SOCKETS (on)
onBeforeMount(() => {
	socket.emit('findAllMessages', {}, (response) => {
		messages.value = response;
	})

	socket.on('message', (message) => {
		messages.value.push(message);
	})
	
	socket.on('typing', ({name, isTyping}) => {
		if (isTyping) {
			typingDisplay.value = `${name} is typing`;
		}
		else {
			typingDisplay.value = '';
		}
	});
});

// EVENTS LIES A MON SOCKET (emit)
const join = () => {
	socket.emit('join', {name: name.value}, () => {
		joined.value = true;
	})
};

const sendMessage = () => {
	socket.emit('createMessage', { text: messageText.value }, () => {
		messageText.value = '';
	})
};

// let timeout;
const emitTyping = () => {
	socket.emit('typing', { isTyping: true});
	let timeout = setTimeout (() => {
		socket.emit('typing', { isTyping: false});
	}, 3500);
};
</script>

<template>
	<div class ="chat">
		
		<div v-if="!joined">
			<form @submit.prevent="join">
				<label>What's your name?</label>
				<input v-model="name" />
				<button type="submit">Send</button>
			</form>
		</div>

		<div class="chat-container" v-else>
			<div class="messages-container">
				<div v-for="message in messages">
					[{{ message.name}}]: {{  message.text }}
				</div>
			</div>
			<div class="message-input">
				<div v-if="typingDisplay">{{ typingDisplay }}</div>
				<form @submit.prevent="sendMessage">
					<label>Message:</label>
					<input v-model="messageText" @input="emitTyping" />
					<button type="submit">Send</button>
				</form>
			</div>
		</div>

	</div>
</template>

<style>
@import './assets/base.css';

.chat {
	padding:20px;
	height: 100vh;
}

.chat-container {
	display: flex;
	flex-direction: column;
	height: 100%;
	justify-content: space-between;
}

.message-container {
	flex: 1;
}
</style>
