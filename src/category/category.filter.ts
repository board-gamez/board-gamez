import { QueryOptions } from 'mongoose';
import { GetCategoriesInput } from './dto/get-categories.dto';
import { FilterWrapper } from '@app/common/filter/filter-wrapper';

export class CategoryFilter extends FilterWrapper {
  constructor(private input: GetCategoriesInput) {
    super({
      name: 'query-filter',
      filter: (fq: any) => {
        if (input.q) {
          fq['name'] = new RegExp(`.*${input.q}.*`, 'gi');
        }
      },
    });
  }

  getFilterQuery(): object {
    return super.getFilterQuery();
  }

  getQueryOptions(): QueryOptions {
    return super.getQueryOptions(this.input);
  }
}
