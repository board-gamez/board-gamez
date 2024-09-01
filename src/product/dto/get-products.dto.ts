import { CoreOutput } from '@app/common/dto/output.dto';
import { CoreFilter } from '@app/common/dto/filter.dto';
import { CorePagination } from '@app/common/dto/pagination.dto';
import { Product } from '../schema/product.schema';

export class GetProductsInput extends CoreFilter {}

export class GetProductsOutput extends CoreOutput {
  pagination: CorePagination;
  products: Product[];
}
