import { CoreOutput } from '@app/common/dto/output.dto';
import { Type } from '../schema/type.schema';
import { Meta } from '@app/common/schema/meta.schema';

export class EditTypeInput {
  name: string;
  slug: string;
  meta: Meta;
  link: string;
  thumbnail: string;
}

export class EditTypeOutput extends CoreOutput {
  type?: Type;
}
