import { CoreOutput } from '@app/common/dto/output.dto';
import { Category } from '../schema/category.schema';
import { Meta } from '@app/common/schema/meta.schema';

export class AddCategoryInput {
  name: string;
  slug: string;
  meta: Meta;
  link: string;
  thumbnail: string;
}

export class AddCategoryOutput extends CoreOutput {
  category?: Category;
}
