import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { ArtistService } from './artist.service';
import { GetArtistsInput, GetArtistsOutput } from './dto/get-artists.dto';
import { AddArtistInput, AddArtistOutput } from './dto/add-artist.dto';
import { Permission } from 'src/iam/authorization/decorator/permission.decorator';
import { EditArtistInput, EditArtistOutput } from './dto/edit-artist.dto';
import { RemoveArtistOutput } from './dto/remove-artist.dto';
import { GetArtistOutput } from './dto/get-artist.dto';

@Controller('artists')
export class ArtistController {
  constructor(private readonly artistService: ArtistService) {}

  @Permission('ADD_ARTIST')
  @Post()
  async addArtist(@Body() input: AddArtistInput): Promise<AddArtistOutput> {
    return this.artistService.addArtist(input);
  }

  @Permission('EDIT_ARTIST')
  @Put(':slug')
  async editArtist(
    @Param('slug') slug: string,
    @Body() input: EditArtistInput,
  ): Promise<EditArtistOutput> {
    return this.artistService.editArtist(slug, input);
  }

  @Permission('REMOVE_ARTIST')
  @Delete(':slug')
  async removeArtist(@Param('slug') slug: string): Promise<RemoveArtistOutput> {
    return this.artistService.removeArtist(slug);
  }

  @Get(':slug')
  async getArtist(@Param('slug') slug: string): Promise<GetArtistOutput> {
    return this.artistService.getArtist(slug);
  }

  @Get()
  async getArtists(@Query() input: GetArtistsInput): Promise<GetArtistsOutput> {
    return this.artistService.getArtists(input);
  }
}
