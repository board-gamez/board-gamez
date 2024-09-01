import { CoreOutput } from '@app/common/dto/output.dto';
import { Meta } from '@app/common/schema/meta.schema';
import { Product } from '../schema/product.schema';

export class AddProductInput {
  title: string;
  content: string;
  slug: string;
  price: number;
  quantity: number;
  meta: Meta;
  thumbnail: string;
}

export class AddProductOutput extends CoreOutput {
  product: Product;
}
