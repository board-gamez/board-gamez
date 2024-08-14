import { CoreOutput } from '@app/common/dto/output.dto';
import { Publisher } from '../schema/publisher.schema';
import { CoreFilter } from '@app/common/dto/filter.dto';
import { CorePagination } from '@app/common/dto/pagination.dto';

export class GetPublishersInput extends CoreFilter {}

export class GetPublishersOutput extends CoreOutput {
  pagination?: CorePagination;
  publishers?: Publisher[];
}
