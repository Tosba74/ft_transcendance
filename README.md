####################################
Pour tester le chat en config local

	1. BACK
	Start:
		$ cd ./api 
		$ nest start --watch

	2. FRONT
	Start:
		$ cd ./site/chat-client
		$ npm install
		$ npm run dev
	
	3. BROWSER:
		http://localhost:3000


####################################
Pour tester le chat en config docker

	1. START:
		$ make
		(... $ make logs 'Nest application successfully started') 

	2. BROWSER:
		http://localhost:3000
		http://localhost:8080
		https://localhost:8443

