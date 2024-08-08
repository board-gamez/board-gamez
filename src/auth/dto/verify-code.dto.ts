import { CoreOutput } from '@app/common/dto/output.dto';
import { CountryCode } from 'libphonenumber-js';
import { User } from 'src/user/schema/user.schema';

export class VerifyCodeInput {
  region: CountryCode;
  phone: string;
  code: string;
}

export class VerifyCodeOutput extends CoreOutput {
  token?: string;
  user?: User;
}
