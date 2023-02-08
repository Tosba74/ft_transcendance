
apk add vim

if [ "$BUILD_TYPE" = "Setup" ]; 
then
	yarn install
	yarn global add @nestjs/cli
	yarn add @nestjs/websockets@9.2.1 @nestjs/platform-socket.io@9.2.1

else 
	yarn start:dev 
fi


# apk add nano vim

# # sleep 1000000

# yarn global add @nestjs/cli

# # # Create application
# if [ "$BUILD_TYPE" = "Setup" ]; 
# then 
#     nest new ./ -p yarn --strict

#     yarn add @nestjs/websockets @nestjs/platform-socket.io



# else 
#     yarn start:dev 
# fi


