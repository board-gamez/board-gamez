import { CoreOutput } from '@app/common/dto/output.dto';
import { Designer } from '../schema/designer.schema';

export class RemoveDesignerOutput extends CoreOutput {
  designer?: Designer;
}
