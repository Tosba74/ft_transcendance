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
      const blocked = await this.blockedsRepository.findOneOrFail({
        where: { id: id }
      });
      return blocked;
    }
    catch (error) {
      throw new NotFoundException('Blocked id not found');
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

    const created = await this.blockedsRepository.save(newBlocked).catch((err: any) => {
      throw new BadRequestException('Blocked creation error');
    });

    return created;
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
      throw new NotFoundException('Blocked id not found');
  }

}
