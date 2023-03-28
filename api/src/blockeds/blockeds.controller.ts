import { Controller, HttpCode, Param, Body, Get, Post, Put, Delete, UseFilters, ParseIntPipe, } from '@nestjs/common';
import { ApiOkResponse, ApiNotFoundResponse, ApiCreatedResponse, ApiNoContentResponse, ApiUnprocessableEntityResponse, ApiTags, ApiBadRequestResponse } from '@nestjs/swagger';
import { HttpExceptionFilter } from 'src/_common/filters/http-exception.filter';

import { BlockedsService } from './blockeds.service';
import { BlockedModel } from "./models/blocked.model";
import { BlockedDto } from './dto/blocked.dto';


@Controller('api/blockeds')
@ApiTags('api/blockeds')
@UseFilters(HttpExceptionFilter)
export class BlockedsController {
  constructor(private readonly blockedsService: BlockedsService) { }
  
  @Get()
  @ApiOkResponse({ description: 'Blockeds retrieved successfully', type: BlockedModel, isArray: true})
  public findAll(): Promise<BlockedModel[]> {
    return this.blockedsService.findAll();
  }

  @Get(':id')
  @ApiOkResponse({ description: 'Blocked retrieved successfully', type: BlockedModel })
  @ApiNotFoundResponse({ description: 'Blocked not found' })
  @ApiBadRequestResponse({ description: 'Blocked validation error' })
  public findOne(@Param('id', ParseIntPipe) id: number): Promise<BlockedModel> {
    return this.blockedsService.findOneById(id);
  }


  @Get(':id/blocked_users')
  @ApiOkResponse({ description: 'Blocked users retrieved successfully', type: BlockedModel, isArray: true })
  public blockedUsers(@Param('id', ParseIntPipe) id: number): Promise<BlockedModel[]> {
    return this.blockedsService.blockedUsers(id);
  }

  @Get(':id/blocked_by')
  @ApiOkResponse({ description: 'Blocked retrieved successfully', type: BlockedModel, isArray: true })
  public blockedBy(@Param('id', ParseIntPipe) id: number): Promise<BlockedModel[]> {
    return this.blockedsService.blockedBy(id);
  }

  @Post(':id')
  @ApiCreatedResponse({ description: 'Blocked created successfully', type: BlockedModel })
  @ApiBadRequestResponse({ description: 'Blocked validation error' })
  public blockUser(@Param('id', ParseIntPipe) id: number, @Body() blockedDto: BlockedDto): Promise<BlockedModel> {
    return this.blockedsService.blockUser(id, blockedDto.blocked_id);
  }

  @Delete(':id')
  @HttpCode(204)
	@ApiNoContentResponse({ description: 'Blocked deleted successfully.'})
	@ApiNotFoundResponse({ description: 'Blocked not found.' })
	public unblockUser(@Param('id', ParseIntPipe) id: number, @Body() blockedDto: BlockedDto): Promise<void> {  
		return this.blockedsService.unblockUser(id, blockedDto.blocked_id);
	}

}
