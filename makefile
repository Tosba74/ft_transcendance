NAME		= ft_transcendance

PATH_R		:= requirements
PATH_D		:= data

DATABASE	= ${addprefix ${PATH_R}/, ${PATH_D}}

COMPOSE		:= docker-compose -p ${NAME}
COMP		:= ${COMPOSE}

all: up

folder:
	${shell mkdir -p ${DATABASE}}

up: folder
	${COMP} up -d --build

clean:
	${COMP} stop
	docker network prune -f

fclean:
	${COMP} down -v

prune:	fclean
	docker system prune --volumes --force --all
	rm -rf ${DATABASE}

image:	prune
	docker rmi -f ${shell docker images -a -q}

re: fclean all

.PHONY: all up clean fclean re

