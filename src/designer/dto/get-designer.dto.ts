import { CoreOutput } from '@app/common/dto/output.dto';
import { Designer } from '../schema/designer.schema';

export class GetDesignerOutput extends CoreOutput {
  designer?: Designer;
}
