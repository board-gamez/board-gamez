import { CoreOutput } from '@app/common/dto/output.dto';
import { Category } from '../schema/category.schema';

export class EditCategoryInput {
  name: string;
  slug: string;
}

export class EditCategoryOutput extends CoreOutput {
  category?: Category;
}
