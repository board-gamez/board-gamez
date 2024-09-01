import { CoreOutput } from '@app/common/dto/output.dto';
import { Product } from '../schema/product.schema';

export class RemoveProductOutput extends CoreOutput {
  product: Product;
}
