NAME		= arnatrans


COMPOSE		:= docker-compose -p ${NAME}
COMP		:= ${COMPOSE}

all: up

up:
	${COMP} up -d --build

clean:
	${COMP} stop
	docker network prune -f

fclean:
	${COMP} down -v

prune:	fclean
	docker system prune --volumes --force --all

image:	prune
	docker rmi -f ${shell docker images -a -q}

re: fclean all

.PHONY: all up clean fclean re

