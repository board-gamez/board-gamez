import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Artist, ArtistDocument } from './schema/artist.schema';
import { Model } from 'mongoose';
import { AddArtistInput, AddArtistOutput } from './dto/add-artist.dto';
import { EditArtistInput, EditArtistOutput } from './dto/edit-artist.dto';
import { RemoveArtistOutput } from './dto/remove-artist.dto';
import { GetArtistOutput } from './dto/get-artist.dto';
import { GetArtistsInput, GetArtistsOutput } from './dto/get-artists.dto';
import { ArtistFilter } from './artist.filter';

@Injectable()
export class ArtistService {
  constructor(
    @InjectModel(Artist.name)
    private readonly artistModel: Model<ArtistDocument>,
  ) {}

  async addArtist(input: AddArtistInput): Promise<AddArtistOutput> {
    const artist = await this.artistModel.create({
      ...input,
    });

    return {
      message: 'artist added successfully',
      artist,
    };
  }

  async editArtist(
    slug: string,
    input: EditArtistInput,
  ): Promise<EditArtistOutput> {
    const artist = await this.artistModel.findOneAndUpdate(
      { slug },
      { ...input },
      { new: true },
    );

    if (!artist) throw new NotFoundException();

    return {
      message: 'artist edited successfully',
      artist,
    };
  }

  async removeArtist(slug: string): Promise<RemoveArtistOutput> {
    const artist = await this.artistModel.findOneAndDelete({ slug });

    if (!artist) throw new NotFoundException();

    return {
      message: 'artist removed successfully',
      artist,
    };
  }

  async getArtist(slug: string): Promise<GetArtistOutput> {
    const artist = await this.artistModel.findOne({ slug });

    if (!artist) throw new NotFoundException();

    return {
      message: 'artist was found successfully',
      artist,
    };
  }

  async getArtists(input: GetArtistsInput): Promise<GetArtistsOutput> {
    const filters = new ArtistFilter(input);

    const artists = await this.artistModel.find(
      filters.getFilterQuery(),
      {},
      filters.getQueryOptions(),
    );

    const totalCount = await this.artistModel.countDocuments(
      filters.getFilterQuery(),
    );

    return {
      message: 'artists was found successfully',
      pagination: { page: input.page, totalCount },
      artists,
    };
  }
}
