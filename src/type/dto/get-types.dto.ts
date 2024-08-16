import { CoreOutput } from '@app/common/dto/output.dto';
import { Type } from '../schema/type.schema';
import { CoreFilter } from '@app/common/dto/filter.dto';
import { CorePagination } from '@app/common/dto/pagination.dto';

export class GetTypesInput extends CoreFilter {}

export class GetTypesOutput extends CoreOutput {
  pagination?: CorePagination;
  types?: Type[];
}
