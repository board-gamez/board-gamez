import { QueryOptions } from 'mongoose';
import { GetTypesInput } from './dto/get-types.dto';
import { FilterWrapper } from '@app/common/filter/filter-wrapper';

export class TypeFilter extends FilterWrapper {
  constructor(private input: GetTypesInput) {
    super({
      name: 'query-filter',
      filter: (fq: any) => {
        if (input.q) {
          fq['$or'] = [
            { name: new RegExp(`.*${input.q}.*`, 'gi') },
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
