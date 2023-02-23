#!/bin/bash

NAME="newModel"
SINGLE_NAME="newModel"

NAME="chat_messages"
SINGLE_NAME="chat_message"


DEST_FOLDER="../$NAME"

if [ -d $DEST_FOLDER ]; then
	exit 1
else

	mkdir "$DEST_FOLDER"
	mkdir "$DEST_FOLDER/models"
	mkdir "$DEST_FOLDER/dto"

	cp ./TEMPLATE.controller.spec.ts "$DEST_FOLDER/$NAME.controller.spec.ts"
	cp ./TEMPLATE.controller.ts "$DEST_FOLDER/$NAME.controller.ts"
	cp ./TEMPLATE.interface.ts "$DEST_FOLDER/$NAME.interface.ts"
	cp ./TEMPLATE.module.ts "$DEST_FOLDER/$NAME.module.ts"
	cp ./TEMPLATE.service.spec.ts "$DEST_FOLDER/$NAME.service.spec.ts"
	cp ./TEMPLATE.service.ts "$DEST_FOLDER/$NAME.service.ts"

	cp ./models/TEMPLATE.model.ts "$DEST_FOLDER/models/$SINGLE_NAME.model.ts"

	cp ./init.sh "$DEST_FOLDER/init.sh"

fi


