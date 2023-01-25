
APP_NAME	= ft_transcendance

COMPOSE_DEV		= -f ./docker-compose.yml -f ./docker-compose.dev.yml
COMPOSE_PROD	= -f ./docker-compose.yml -f ./docker-compose.override.yml

#Dev
DOCKER		= docker compose ${COMPOSE_DEV} -p ${APP_NAME}

#Prod
# DOCKER		= docker compose ${COMPOSE_PROD} ${ENV_FILE} -p ${APP_NAME}

all:		start

build:
			${DOCKER} build

setup:
			${DOCKER} -f ./docker-compose.setup.yml up --build -d


start:
			${DOCKER} up -d

ps:
			${DOCKER} ps -a

logs:
			${DOCKER} logs $2
flogs:
			${DOCKER} logs -f $2

run:		
			${DOCKER} exec front sh
runapi:		
			${DOCKER} exec back sh
runnginx:		
			${DOCKER} exec nginx bash


down:
			${DOCKER} down

clean:		down
#			${DOCKER} down --volumes

re:			clean build start

.PHONY:		all build start ps logs flogs run api down clean re
