import { CoreOutput } from '@app/common/dto/output.dto';
import { Product } from '../schema/product.schema';

export class GetProductOutput extends CoreOutput {
  product: Product;
}
