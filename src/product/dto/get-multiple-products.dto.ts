import { CoreOutput } from '@app/common/dto/output.dto';
import { Product } from '../schema/product.schema';
import { Types } from 'mongoose';

export class GetMultipleProductsInput {
  _products: Types.ObjectId[];
}

export class GetMultipleProductsOutput extends CoreOutput {
  products: Product[];
}
