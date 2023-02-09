
apk add nano

# sleep 1000000

# yarn global add @nestjs/cli										# slow docker

# # Create application
if [ "$BUILD_TYPE" = "Setup" ]; 
then 
    # nest new ./ -p yarn --strict

    # yarn add @nestjs/websockets @nestjs/platform-socket.io
	yarn install
	yarn add @nestjs/websockets@9.2.1 @nestjs/platform-socket.io@9.2.1
	yarn add @nestjs/typeorm @nestjs/swagger 
fi


# # nest new rest-api --directory ./ -p yarn --strict

# yarn add json-server
# json-server ./api/db.json --host 0.0.0.0

# Download node_modules
# yarn install


if [ "$BUILD_TYPE" = "Production" ]; 
then 
    # For start in prod
    yarn start

else 
    yarn start:dev 
fi


