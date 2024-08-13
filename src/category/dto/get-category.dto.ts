import { CoreOutput } from '@app/common/dto/output.dto';
import { Category } from '../schema/category.schema';

export class GetCategoryOutput extends CoreOutput {
  category?: Category;
}
