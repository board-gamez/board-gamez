import { CoreOutput } from '@app/common/dto/output.dto';
import { Category } from '../schema/category.schema';

export class RemoveCategoryOutput extends CoreOutput {
  category?: Category;
}
