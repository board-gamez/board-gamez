import { CoreOutput } from '@app/common/dto/output.dto';
import { Publisher } from '../schema/publisher.schema';

export class RemovePublisherOutput extends CoreOutput {
  publisher?: Publisher;
}
