import { CoreOutput } from '@app/common/dto/output.dto';
import { Category } from '../schema/category.schema';

export class AddCategoryInput {
  name: string;
  slug: string;
}

export class AddCategoryOutput extends CoreOutput {
  category?: Category;
}
