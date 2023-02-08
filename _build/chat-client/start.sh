
apk add nano vim

# # Create application
if [ ! -e package.json ]; 
then 
    yarn create vite ./ --template vue
    yarn add socket.io-client
fi

# Download node_modules
yarn install


if [ "$BUILD_TYPE" = "Production" ]; 
then 
    # For start in prod
    yarn global add serve

    yarn build
    serve -s build 

else 
    yarn dev
fi


