import { CoreOutput } from '@app/common/dto/output.dto';
import { Mechanism } from '../schema/mechanism.schema';

export class RemoveMechanismOutput extends CoreOutput {
  mechanism?: Mechanism;
}
