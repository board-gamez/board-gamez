import { CoreOutput } from '@app/common/dto/output.dto';
import { Category } from '../schema/category.schema';
import { Meta } from '@app/common/schema/meta.schema';

export class EditCategoryInput {
  name: string;
  slug: string;
  meta: Meta;
  link: string;
  thumbnail: string;
}

export class EditCategoryOutput extends CoreOutput {
  category?: Category;
}
