import { Injectable, NotFoundException, } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { GameStatusModel } from "./models/game_status.model";


@Injectable()
export class GameStatusService {

  constructor(@InjectRepository(GameStatusModel) private gameStatusRepository: Repository<GameStatusModel>) { }

  findAll(): Promise<GameStatusModel[]> {
    return this.gameStatusRepository.find();
  }

  async findOneById(id: number): Promise<GameStatusModel> {
    try {
      const game_status = await this.gameStatusRepository.findOneOrFail({ 
        where: { id } 
      });
      return game_status;
    } 
    catch (error) {
      throw new NotFoundException();
    }
  }
}
