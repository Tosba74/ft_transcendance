
apk add nano

# # Create application
if [ "$BUILD_TYPE" = "Setup" ]; 
then 
    yarn create react-app ./ --template typescript
    yarn add react-router-dom 
    
    # For testing auth module
    yarn add bootstrap
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
    yarn start 
fi


