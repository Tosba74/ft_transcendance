
apk add nano
# yarn tailwindcss init -p

# # Create application
if [ "$BUILD_TYPE" = "Setup" ];
then
    yarn create react-app ./ --template typescript
    yarn add react-router-dom
    yarn add axios
    yarn add tailwindcss postcss autoprefixer classnames
    yarn add react-icons
    yarn add --dev prettier prettier-plugin-tailwindcss
    yarn add jwt-decode
    yarn add randomstring
	yarn add bcrypt

    # For testing auth module
    yarn add --dev bootstrap
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
    yarn prettier
    yarn start
fi


