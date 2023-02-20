import { BadRequestException, Injectable, NotFoundException, } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { BlockedModel } from "./models/blocked.model";
import { BlockedDto } from './dto/blocked.dto';

@Injectable()
export class BlockedsService {

  constructor(@InjectRepository(BlockedModel) private blockedsRepository: Repository<BlockedModel>) { }

  findAll(): Promise<BlockedModel[]> {
    return this.blockedsRepository.find();
  }

  async findOneById(id: number): Promise<BlockedModel> {
    try {
      const blockeds: BlockedModel = await this.blockedsRepository.findOneOrFail({ where: { id } });
      return blockeds;
    }
    catch (error) {
      throw new NotFoundException();
    }
  }


  async blockedUsers(id: number): Promise<BlockedModel[]> {
    return this.blockedsRepository.find({
      where: { blocker: { id: id } },
    });
  }


  async blockedBy(id: number): Promise<BlockedModel[]> {
    return this.blockedsRepository.find({
      where: { blocked: { id: id } },
    });
  }


  async blockUser(id: number, blockedDto: BlockedDto): Promise<BlockedModel> {

    const alreadyExists = await this.blockedsRepository.findOne({
      where: {
        blocker: { id: id },
        blocked: { id: blockedDto.blocked_id },
      },
      relations: {
        // first_user: true,
        // second_user: true,
        // friend_type: true,
      }
    });

    if (alreadyExists != null) {
      return alreadyExists;
    }

    const newBlocked = this.blockedsRepository.create({
      blocker: { id: id },
      blocked: { id: blockedDto.blocked_id }
    });

    try {
      return this.blockedsRepository.save(newBlocked);
    }
    catch (error) {
      throw new BadRequestException();
    }
  }

  async unblockUser(id: number, blockedDto: BlockedDto): Promise<void> {
    const blocked = await this.blockedsRepository.findOne({
      where: {
        blocker: { id: id },
        blocked: { id: blockedDto.blocked_id },
      }
    });

    if (blocked != null)
      this.blockedsRepository.delete(blocked);
    else
      throw new NotFoundException();
  }

}
