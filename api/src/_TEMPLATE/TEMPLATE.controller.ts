import { Controller, Param, Body, Get, Post, Put, Delete, UseFilters, ParseIntPipe, } from '@nestjs/common';
import { ApiOkResponse, ApiNotFoundResponse, ApiCreatedResponse, ApiUnprocessableEntityResponse, ApiTags, ApiBadRequestResponse } from '@nestjs/swagger';
import { HttpExceptionFilter } from '../_common/filters/http-exception.filter';

import { TemplateService } from './TEMPLATE.service';
import { TemplateModel } from "./models/TEMPLATE.model";


@Controller('api/template')
@ApiTags('api/template')
@UseFilters(HttpExceptionFilter)
export class TemplateController {
  constructor(private readonly templateService: TemplateService) { }
  
  @Get()
  @ApiOkResponse({ description: 'templates_name retrieved successfully', type: TemplateModel, isArray: true})
  public findAll(): Promise<TemplateModel[]> {
    return this.templateService.findAll();
  }

  @Get(':id')
  @ApiOkResponse({ description: 'template_name retrieved successfully', type: TemplateModel })
  @ApiNotFoundResponse({ description: 'template_name not found' })
  @ApiBadRequestResponse({ description: 'template_name validation error' })
  public findOne(@Param('id', ParseIntPipe) id: number): Promise<TemplateModel> {
    return this.templateService.findOneById(id);
  }

  // @Post()
  // @ApiCreatedResponse({ description: 'template_name created successfully', type: TemplateModel })
  // @ApiBadRequestResponse({ description: 'template_name validation error' })
  // public create(@Body() createUserDto: CreateUserDto): Promise<TemplateModel> {
  //   return this.templateService.create(createUserDto);
  // }

  // @Put(':id')
  // @ApiCreatedResponse({ description: 'Password updated successfully', type: TemplateModel })
  // @ApiNotFoundResponse({ description: 'template_name not found' })
  // @ApiBadRequestResponse({ description: 'template_name validation error' })
  // public update(@Param('id', ParseIntPipe) id: number, @Body() updateUserDto: UpdateUserDto): Promise<TemplateModel> {
  //   return this.templateService.update(id, updateUserDto);
  // }

  // @Delete(':id')
	// @ApiOkResponse({ description: 'template_name deleted successfully.'})
	// @ApiNotFoundResponse({ description: 'template_name not found.' })
	// public delete(@Param('id', ParseIntPipe) id: number): void {  
	// 	this.templateService.delete(id);
	// }

}
