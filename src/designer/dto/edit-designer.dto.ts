import { CoreOutput } from '@app/common/dto/output.dto';
import { Designer } from '../schema/designer.schema';
import { Meta } from '@app/common/schema/meta.schema';

export class EditDesignerInput {
  name: string;
  slug: string;
  meta: Meta;
  link: string;
  thumbnail: string;
}

export class EditDesignerOutput extends CoreOutput {
  designer?: Designer;
}
