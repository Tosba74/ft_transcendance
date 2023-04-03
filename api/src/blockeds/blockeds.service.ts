import { BadRequestException, Injectable, NotFoundException, } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { BlockedModel } from "./models/blocked.model";
import { UserModel } from 'src/users/models/user.model';

@Injectable()
export class BlockedsService {

  constructor(@InjectRepository(BlockedModel) private blockedsRepository: Repository<BlockedModel>) { }

  findAll(): Promise<BlockedModel[]> {
    return this.blockedsRepository.find();
  }

  async findOneById(id: number): Promise<BlockedModel> {
    try {
      const blocked = await this.blockedsRepository.findOneOrFail({
        where: { id: id },
        relations: { blocked: true, blocker: true }
      });
      return blocked;
    }
    catch (error) {
      throw new NotFoundException('Blocked id not found');
    }
  }


  async blockedUsers(id: number): Promise<UserModel[]> {
    const blockeds = await this.blockedsRepository.find({
      where: { blocker: { id: id } },
      relations: { blocked: true, }
    });

    let res: UserModel[] = blockeds.map(value => value.blocked);

    return res;
  }


  async blockedBy(id: number): Promise<UserModel[]> {
    const blockeds = await this.blockedsRepository.find({
      where: { blocked: { id: id } },
      relations: { blocker: true, }
    });

    let res: UserModel[] = blockeds.map(value => value.blocked);

    return res;
  }


  async blockUser(id: number, blocked_id: number): Promise<BlockedModel> {

    const alreadyExists = await this.blockedsRepository.findOne({
      where: {
        blocker: { id: id },
        blocked: { id: blocked_id },
      },
      relations: {
        // first_user: true,
      }
    });


    if (alreadyExists != null) {
      return alreadyExists;
    }


    const newBlocked = this.blockedsRepository.create({
      blocker: { id: id },
      blocked: { id: blocked_id }
    });

    const created = await this.blockedsRepository.save(newBlocked).catch((err: any) => {
      throw new BadRequestException('Blocked creation error');
    });

    return created;
  }

  async unblockUser(id: number, blocked_id: number): Promise<void> {

    const blocked = await this.blockedsRepository.findOne({
      where: {
        blocker: { id: id },
        blocked: { id: blocked_id },
      }
    });

    if (blocked != null)
      this.blockedsRepository.delete(blocked.id);
    else
      throw new NotFoundException('Blocked id not found');
  }

}
