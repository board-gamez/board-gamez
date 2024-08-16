import { CoreOutput } from '@app/common/dto/output.dto';
import { Mechanism } from '../schema/mechanism.schema';
import { CoreFilter } from '@app/common/dto/filter.dto';
import { CorePagination } from '@app/common/dto/pagination.dto';

export class GetMechanismsInput extends CoreFilter {}

export class GetMechanismsOutput extends CoreOutput {
  pagination?: CorePagination;
  mechanisms?: Mechanism[];
}
