NAME		= ft_transcendance

COMPOSE		:= docker-compose -p ${NAME}
COMP		:= ${COMPOSE}

all: up

folder:
	${shell mkdir -p ./requirements/data}

up: folder
	${COMP} up -d --build

clean:
	${COMP} stop
	docker network prune -f

fclean:
	${COMP} down -v

prune:	fclean
	docker system prune --volumes --force --all
	rm -rf ./requirements/data

image:	prune
	docker rmi -f ${shell docker images -a -q}

re: fclean all

.PHONY: all up clean fclean re

