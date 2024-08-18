import { Module } from '@nestjs/common';
import { GameService } from './game.service';
import { GameController } from './game.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { GameModelFactory } from './schema/game.schema';

@Module({
  imports: [MongooseModule.forFeatureAsync([GameModelFactory])],
  providers: [GameService],
  controllers: [GameController],
})
export class GameModule {}
