import { CoreOutput } from '@app/common/dto/output.dto';
import { Artist } from '../schema/artist.schema';

export class RemoveArtistOutput extends CoreOutput {
  artist?: Artist;
}
