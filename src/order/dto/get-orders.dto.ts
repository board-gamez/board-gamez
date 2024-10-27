import { CoreOutput } from '@app/common/dto/output.dto';
import { CoreFilter } from '@app/common/dto/filter.dto';
import { CorePagination } from '@app/common/dto/pagination.dto';
import { Order } from '../schema/order.schema';

export class GetOrdersInput extends CoreFilter {}

export class GetOrdersOutput extends CoreOutput {
  pagination: CorePagination;
  orders: Order[];
}
