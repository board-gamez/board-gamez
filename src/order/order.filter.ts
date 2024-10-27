import { QueryOptions } from 'mongoose';
import { FilterWrapper } from '@app/common/filter/filter-wrapper';
import { GetOrdersInput } from './dto/get-orders.dto';

export class OrderFilter extends FilterWrapper {
  constructor(private input: GetOrdersInput) {
    super();
  }

  getFilterQuery(): object {
    return super.getFilterQuery();
  }

  getQueryOptions(): QueryOptions {
    return super.getQueryOptions(this.input);
  }
}
