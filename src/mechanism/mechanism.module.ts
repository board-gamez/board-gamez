import { Module } from '@nestjs/common';
import { MechanismService } from './mechanism.service';
import { MechanismController } from './mechanism.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { MechanismModelFactory } from './schema/mechanism.schema';

@Module({
  imports: [MongooseModule.forFeatureAsync([MechanismModelFactory])],
  providers: [MechanismService],
  controllers: [MechanismController],
})
export class MechanismModule {}
