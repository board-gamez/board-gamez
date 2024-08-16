import { CoreOutput } from '@app/common/dto/output.dto';
import { Artist } from '../schema/artist.schema';

export class GetArtistOutput extends CoreOutput {
  artist?: Artist;
}
