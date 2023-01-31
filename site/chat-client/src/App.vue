<script setup>
import { io } from 'socket.io-client';

// vue working-process: https://learnvue.co/tutorials/vue-lifecycle-hooks-guide
import { onBeforeMount, ref } from 'vue';

const socket = io('http://localhost:4000');

const usersCount = ref('');
const users = ref([]);
// const users = ref('');
const messages = ref([]);
const messageText = ref('');
const joined = ref(false);
const name = ref('');
const typingDisplay = ref('');

/*
	emit(event, bodyarguments, optional_callback)
	suite a une interaction avec la page html,
	mon socket emit un message au server (requete GET POST selon bodyarguments)

	on(event, optional_callback)
	suite a un event emit par le server
	mon socket recoit un message du server suite

	!!! optional_callback appelée que si l'event coté server retourne une valeur
*/

// Called right before the component DOM is actually rendered and mounted
onBeforeMount(() => {
	socket.emit('findAllUsers', {}, (response) => {
		console.log(response);
		users.value = response;
	})

	socket.emit('findAllMessages', {}, (response) => {
		console.log(response);
		messages.value = response;
	})

	socket.on('users', (count) => {
		if (count > 1) {
			usersCount.value = `${count} users connected`;
		}
		else {
			usersCount.value = `${count} user connected`;
		}
	})

	socket.on('join', (user) => {
		console.log(users);
		users.value.push(user);
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
	}, 3500);
};
</script>

<template>
	<div class ="chat">
		
		<!-- MODULE D'IDENTIFICATION -->
		<div v-if="!joined">
			<form @submit.prevent="join">
				<label>What's your name?</label>
				<input v-model="name" />
				<button type="submit">Send</button>
			</form>
		</div>
		
		<!-- MODULE DE CHATROOM -->
		<div class="chat-container" v-else>
			<div class="users-container">
				<div class="count">{{ usersCount }}</div>
				<div v-for="user in users">{{ user }}</div>
			</div>
			<div class="messages-container">
				<div class="messages">
					<div v-for="message in messages">
						[{{ message.name }}]: {{  message.text }}
					</div>
				</div>
				<div class="write">
					<div class="typing">
						<div v-if="typingDisplay">{{ typingDisplay }}</div>
					</div>
					<form @submit.prevent="sendMessage">
						<label>Message:</label>
						<input v-model="messageText" @input="emitTyping" />
						<button type="submit">Send</button>
					</form>
				</div>
			</div>
		</div>

	</div>
</template>

<style>
@import './assets/base.css';

#app {
	display: flex !important;
	justify-content: center;
	width: 100%;
}

.chat {
	padding:20px;
	height: 100vh;
	width: 800px;
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
	text-align: right;
	padding: 0 10px;
}

.messages-container {
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	width: 75%;
	padding: 0 10px;
}

.count {
	text-decoration: underline;
	padding-bottom: 5px;
}

</style>
