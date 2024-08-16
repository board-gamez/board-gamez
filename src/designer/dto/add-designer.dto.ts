import { CoreOutput } from '@app/common/dto/output.dto';
import { Designer } from '../schema/designer.schema';
import { Meta } from '@app/common/schema/meta.schema';

export class AddDesignerInput {
  name: string;
  slug: string;
  meta: Meta;
  link: string;
  thumbnail: string;
}

export class AddDesignerOutput extends CoreOutput {
  designer?: Designer;
}
