import { CoreOutput } from '@app/common/dto/output.dto';
import { Designer } from '../schema/designer.schema';
import { CoreFilter } from '@app/common/dto/filter.dto';
import { CorePagination } from '@app/common/dto/pagination.dto';

export class GetDesignersInput extends CoreFilter {}

export class GetDesignersOutput extends CoreOutput {
  pagination?: CorePagination;
  designers?: Designer[];
}
