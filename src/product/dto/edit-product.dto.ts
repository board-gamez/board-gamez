import { CoreOutput } from '@app/common/dto/output.dto';
import { Product } from '../schema/product.schema';
import { Meta } from '@app/common/schema/meta.schema';

export class EditProductInput {
  title: string;
  content: string;
  slug: string;
  price: number;
  quantity: number;
  meta: Meta;
  image: string;
}

export class EditProductOutput extends CoreOutput {
  product: Product;
}
