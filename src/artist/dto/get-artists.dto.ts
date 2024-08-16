import { CoreOutput } from '@app/common/dto/output.dto';
import { Artist } from '../schema/artist.schema';
import { CoreFilter } from '@app/common/dto/filter.dto';
import { CorePagination } from '@app/common/dto/pagination.dto';

export class GetArtistsInput extends CoreFilter {}

export class GetArtistsOutput extends CoreOutput {
  pagination?: CorePagination;
  artists?: Artist[];
}
