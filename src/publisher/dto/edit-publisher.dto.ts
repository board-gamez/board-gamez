import { CoreOutput } from '@app/common/dto/output.dto';
import { Publisher } from '../schema/publisher.schema';
import { Meta } from '@app/common/schema/meta.schema';

export class EditPublisherInput {
  name: string;
  slug: string;
  meta: Meta;
  link: string;
  thumbnail: string;
}

export class EditPublisherOutput extends CoreOutput {
  publisher?: Publisher;
}
