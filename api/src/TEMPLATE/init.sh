#!/bin/bash

# user_types
PASCAL_CASE="new_models"

# user_type
SINGLE_PASCAL_CASE="new_model"

# UserTypes
UPPER_CAMEL_CASE="NewModel"

# UserType
SINGLE_UPPER_CAMEL_CASE="NewModel"

# userTypes
LOWER_CAMEL_CASE="newModel"

# user types
OBJECT_NAME="Models"

# user type
SINGLE_OBJECT_NAME="Model"



# user_types
PASCAL_CASE="friends"

# user_type
SINGLE_PASCAL_CASE="friend"

# UserTypes
UPPER_CAMEL_CASE="Friends"

# UserType
SINGLE_UPPER_CAMEL_CASE="Friend"

# userTypes
LOWER_CAMEL_CASE="friends"

# user types
OBJECT_NAME="Friends"

# user type
SINGLE_OBJECT_NAME="Friend"

if [[ $(PWD) == *"TEMPLATE"* ]]; then
	echo "IN TEMPLATE FOLDER"
	exit 1
else
	echo "good"

	


	sed -i '' "s/TEMPLATE.controller/${PASCAL_CASE}.controller/g" *.ts **/*.ts
	sed -i '' "s/TEMPLATE.service/${PASCAL_CASE}.service/g" *.ts **/*.ts
	sed -i '' "s/TEMPLATE.model/${SINGLE_PASCAL_CASE}.model/g" *.ts **/*.ts

	sed -i '' "s/TemplateModel/${SINGLE_UPPER_CAMEL_CASE}Model/g" *.ts **/*.ts
	sed -i '' "s/TemplateService/${UPPER_CAMEL_CASE}Service/g" *.ts **/*.ts
	sed -i '' "s/TemplateController/${UPPER_CAMEL_CASE}Controller/g" *.ts **/*.ts
	sed -i '' "s/TemplateModule/${UPPER_CAMEL_CASE}Module/g" *.ts **/*.ts

	sed -i '' "s/templateRepository/${LOWER_CAMEL_CASE}Repository/g" *.ts **/*.ts
	sed -i '' "s/templateService/${LOWER_CAMEL_CASE}Service/g" *.ts **/*.ts

	sed -i '' "s/template_table/${PASCAL_CASE}/g" *.ts **/*.ts


	sed -i '' "s#api/template#api/${PASCAL_CASE}#g" *.ts **/*.ts

	sed -i '' "s/templateVar/${PASCAL_CASE}/g" *.ts **/*.ts

	sed -i '' "s/templates_name/${OBJECT_NAME}/g" *.ts **/*.ts
	sed -i '' "s/template_name/${SINGLE_OBJECT_NAME}/g" *.ts **/*.ts


fi


