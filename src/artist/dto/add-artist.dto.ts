import { CoreOutput } from '@app/common/dto/output.dto';
import { Artist } from '../schema/artist.schema';
import { Meta } from '@app/common/schema/meta.schema';

export class AddArtistInput {
  name: string;
  slug: string;
  meta: Meta;
  link: string;
  thumbnail: string;
}

export class AddArtistOutput extends CoreOutput {
  artist?: Artist;
}
