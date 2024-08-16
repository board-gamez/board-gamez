import { QueryOptions } from 'mongoose';
import { GetDesignersInput } from './dto/get-designers.dto';
import { FilterWrapper } from '@app/common/filter/filter-wrapper';

export class DesignerFilter extends FilterWrapper {
  constructor(private input: GetDesignersInput) {
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
