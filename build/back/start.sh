
apk add nano

# sleep 1000000

yarn global add @nestjs/cli

# # Create application
if [ "$BUILD_TYPE" = "Setup" ]; 
then 
    nest new ./ -p yarn --strict

fi


# # nest new rest-api --directory ./ -p yarn --strict

# yarn add json-server
# json-server ./api/db.json --host 0.0.0.0

# Download node_modules
yarn install


if [ "$BUILD_TYPE" = "Production" ]; 
then 
    # For start in prod
    yarn start

else 
    yarn start 
fi


