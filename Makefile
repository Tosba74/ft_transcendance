
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
			${DOCKER} logs
flogs:
			${DOCKER} logs -f

logsfront:
			${DOCKER} logs front
logsapi:
			${DOCKER} logs back
logsnginx:
			${DOCKER} logs nginx

flogsfront:
			${DOCKER} logs -f front
flogsapi:
			${DOCKER} logs -f back
flogsnginx:
			${DOCKER} logs -f nginx

refront:
			${DOCKER} restart front
reapi:
			${DOCKER} restart back
renginx:
			${DOCKER} restart nginx


run:		
			${DOCKER} exec front sh
runapi:		
			${DOCKER} exec back sh
runnginx:		
			${DOCKER} exec nginx bash
runpostg:		
			${DOCKER} exec postgres bash
rundb:		
			${DOCKER} exec postgres psql --host=postgres --dbname=test_db --username=user -W


migrate-create:
			@echo "Usage: make migrate-create DEST=name";
			@if [ ! -z ${DEST} ]; then\
				${DOCKER} exec back yarn migration:create src/typeorm/migrations/${DEST} ;\
			fi
migrate-gen:
			@echo "Usage: make migrate-gen DEST=name";
			@if [ ! -z ${DEST} ]; then \
				${DOCKER} exec back yarn migration:generate src/typeorm/migrations/${DEST} ;\
			fi
migrate-run:
			${DOCKER} exec back yarn migration:run
migrate-revert:
			${DOCKER} exec back yarn migration:revert

# package-json yarn commands for migrations
# "typeorm": "yarn ts-node ./node_modules/typeorm/cli -d ./dist/typeorm/data-source.js",
# "migration:generate": "yarn build && yarn typeorm migration:generate",
# "migration:run": "yarn build && yarn typeorm migration:run",
# "migration:revert": "yarn build && yarn typeorm migration:revert"



down:
			${DOCKER} down

clean:		down
#			${DOCKER} down --volumes

re:			clean build start

.PHONY:		all build start ps logs flogs run api down clean re
