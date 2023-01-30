####################################
Pour tester le chat en config local

	1. BACK
	Passer le back sur localhost:3001

	Dans api/src/main.ts:

		decommenter la ligne:
			await app.listen(3001); 
		et commenter:
			await app.listen(3000)
	
	Start:
		$ cd ./api 
		$ nest start --watch


	2. FRONT
	Passer le front sur localhost:3000
		
	Dans site/chat-client/src/App.vue:

		decommenter la ligne:
			const socket = io('http://localhost:3001'); 
		et commenter:
			const socket = io(import.meta.env.VITE_APP_BACK_URL);
	
	3. START:
		$ cd ./site/chat-client
		$ npm install
		$ npm run dev
	
	4. BROWSER:
		http://localhost:3000



####################################
Pour tester le chat en config docker

	1. BACK:
	Passer le back sur localhost:3000
		commentaires inverses par rapport a config local

	2. FRONT:
	Passer le front sur localhost:3000
		commentaires inverses par rapport a config local

	3. START:
		$ make
		(... $ make logs 'Nest application successfully started') 

	4. BROWSER:
		http://localhost:4000	->	'Hello world'	-> front ok
		http://localhost:3000						-> front ko
