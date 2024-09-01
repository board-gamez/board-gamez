import { QueryOptions } from 'mongoose';
import { GetProductsInput } from './dto/get-products.dto';
import { FilterWrapper } from '@app/common/filter/filter-wrapper';

export class ProductFilter extends FilterWrapper {
  constructor(private input: GetProductsInput) {
    super({
      name: 'query-filter',
      filter: (fq: any) => {
        if (input.q) {
          fq['$or'] = [
            { title: new RegExp(`.*${input.q}.*`, 'gi') },
            { slug: new RegExp(`.*${input.q}.*`, 'gi') },
          ];
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
