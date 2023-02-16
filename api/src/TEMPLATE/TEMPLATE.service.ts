import { Injectable, NotFoundException, } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { TemplateModel } from "./models/TEMPLATE.model";


@Injectable()
export class TemplateService {

  constructor(@InjectRepository(TemplateModel) private templateRepository: Repository<TemplateModel>) { }

  findAll(): Promise<TemplateModel[]> {
    return this.templateRepository.find();
  }

  async findOneById(id: number): Promise<TemplateModel> {
    try {
      const templateVar: TemplateModel = await this.templateRepository.findOneOrFail({ where: { id } });
      return templateVar;
    } 
    catch (error) {
      throw new NotFoundException();
    }
  }
}
