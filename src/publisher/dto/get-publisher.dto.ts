import { CoreOutput } from '@app/common/dto/output.dto';
import { Publisher } from '../schema/publisher.schema';

export class GetPublisherOutput extends CoreOutput {
  publisher?: Publisher;
}
