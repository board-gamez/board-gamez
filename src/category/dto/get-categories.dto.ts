import { CoreOutput } from '@app/common/dto/output.dto';
import { Category } from '../schema/category.schema';
import { CoreFilter } from '@app/common/dto/filter.dto';
import { CorePagination } from '@app/common/dto/pagination.dto';

export class GetCategoriesInput extends CoreFilter {}

export class GetCategoriesOutput extends CoreOutput {
  pagination?: CorePagination;
  categories?: Category[];
}
