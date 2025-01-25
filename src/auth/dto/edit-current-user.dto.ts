import { CoreOutput } from '@app/common/dto/output.dto';
import { User } from 'src/user/schema/user.schema';

export class EditCurrentUserInput {
  name: string;
}

export class EditCurrentUserOutput extends CoreOutput {
  user?: User;
}
