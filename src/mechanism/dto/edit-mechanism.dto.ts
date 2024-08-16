import { CoreOutput } from '@app/common/dto/output.dto';
import { Mechanism } from '../schema/mechanism.schema';
import { Meta } from '@app/common/schema/meta.schema';

export class EditMechanismInput {
  name: string;
  slug: string;
  meta: Meta;
  link: string;
  thumbnail: string;
}

export class EditMechanismOutput extends CoreOutput {
  mechanism?: Mechanism;
}
