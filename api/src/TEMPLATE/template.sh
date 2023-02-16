#!/bin/bash

NAME="newModel"
SINGLE_NAME="newModel"

NAME="friends"
SINGLE_NAME="friend"


if [ -d "../$NAME" ]; then
	exit 1
else
	mkdir "../$NAME"
	mkdir "../$NAME/models"
	mkdir "../$NAME/dto"

	cp ./TEMPLATE.controller.spec.ts "../$NAME/$NAME.controller.spec.ts"
	cp ./TEMPLATE.controller.ts "../$NAME/$NAME.controller.ts"
	cp ./TEMPLATE.interface.ts "../$NAME/$NAME.interface.ts"
	cp ./TEMPLATE.module.ts "../$NAME/$NAME.module.ts"
	cp ./TEMPLATE.service.spec.ts "../$NAME/$NAME.service.spec.ts"
	cp ./TEMPLATE.service.ts "../$NAME/$NAME.service.ts"

	cp ./models/TEMPLATE.model.ts "../$NAME/models/$SINGLE_NAME.model.ts"

	cp ./init.sh "../$NAME/init.sh"

fi


