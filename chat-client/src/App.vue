<script setup>
import { io } from 'socket.io-client';
import { onBeforeMount, ref } from 'vue';

const socket = io('http://localhost:4000');

const usersCount = ref('');
const users = ref([]);
const messages = ref([]);
const messageText = ref('');
const joined = ref(false);
const name = ref('');
const usersTyping = ref([]);

/*  SOCKET methods

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
			usersCount.value = `${count} users`;
		}
		else {
			usersCount.value = `${count} user`;
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
	if (name.value.length > 0) {
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
	if (typing === false) {
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

			<div class="users-container">
				<div class="count">{{ usersCount }}</div>
				<div class="users-wrapper scrollbar">
					<div class="users" v-for="user in users">
						<div :socketId="user.id" class="user-wrapper">							
							<template v-for="userTyping in usersTyping">
								<span v-if="userTyping !== name && userTyping === user.name" class="typing"></span>
								<span v-else-if="userTyping === user.name" class="me-typing"></span>
							</template>
							<span v-if="user.name === name" class="user me">{{ user.name }} [me]</span>
							<span v-else class="user else">{{ user.name }}</span>
							<span class="lister">•</span>
						</div>
					</div>
				</div>
			</div>

			<div class="messages-container">
				<div class="title">Chat</div>
				<div class="messages-wrapper">
					<div class="messages scrollbar">
						<div v-for="message in messages.slice().reverse()" class="message">
							<div v-if="message.name === name" class="name me"><span>{{ message.text }}</span></div>
							<div v-else class="name else"><span class="else-name">[{{ message.name }}]: </span><span>{{ message.text }}</span></div>
						</div>
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
@import './mycss.css';
</style>
