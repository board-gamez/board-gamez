import { Module } from '@nestjs/common';
import { DesignerService } from './designer.service';
import { DesignerController } from './designer.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { DesignerModelFactory } from './schema/designer.schema';

@Module({
  imports: [MongooseModule.forFeatureAsync([DesignerModelFactory])],
  providers: [DesignerService],
  controllers: [DesignerController],
})
export class DesignerModule {}
