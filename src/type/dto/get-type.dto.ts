import { CoreOutput } from '@app/common/dto/output.dto';
import { Type } from '../schema/type.schema';

export class GetTypeOutput extends CoreOutput {
  type?: Type;
}
