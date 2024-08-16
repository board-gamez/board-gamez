import { Module } from '@nestjs/common';
import { ArtistService } from './artist.service';
import { ArtistController } from './artist.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { ArtistModelFactory } from './schema/artist.schema';

@Module({
  imports: [MongooseModule.forFeatureAsync([ArtistModelFactory])],
  providers: [ArtistService],
  controllers: [ArtistController],
})
export class ArtistModule {}
