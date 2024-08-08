import { CoreOutput } from '@app/common/dto/output.dto';
import { CountryCode } from 'libphonenumber-js';

export class SendCodeInput {
  region: CountryCode;
  phone: string;
}

export class SendCodeOutput extends CoreOutput {}
