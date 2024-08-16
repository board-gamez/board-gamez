import { CoreOutput } from '@app/common/dto/output.dto';
import { Mechanism } from '../schema/mechanism.schema';

export class GetMechanismOutput extends CoreOutput {
  mechanism?: Mechanism;
}
