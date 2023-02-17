import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { TemplateService } from './TEMPLATE.service';
import { TemplateController } from './TEMPLATE.controller';
import { TemplateModel } from './models/TEMPLATE.model';

@Module({
  imports: [TypeOrmModule.forFeature([TemplateModel])],
  providers: [TemplateService],
  controllers: [TemplateController],
  exports: [TemplateService],
})
export class TemplateModule {}
