import { JwtService } from '@app/jwt';
import { NotificationService } from '@app/notification';
import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from 'src/user/schema/user.schema';
import { SendCodeInput, SendCodeOutput } from './dto/send-code.dto';
import parsePhoneNumber from 'libphonenumber-js';
import * as otpGenerator from 'otp-generator';
import * as moment from 'moment';
import { ConfigService } from '@nestjs/config';
import { VerifyCodeInput, VerifyCodeOutput } from './dto/verify-code.dto';

@Injectable()
export class AuthService {
  private kvnTemplate: string;

  constructor(
    private readonly notificationService: NotificationService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
  ) {
    this.kvnTemplate = this.configService.get<string>('KAVENEGAR_TEMPLATE');
  }

  async sendCode(input: SendCodeInput): Promise<SendCodeOutput> {
    const phone = parsePhoneNumber(input.phone, input.region).number;

    const user = await this.userModel.findOneAndUpdate(
      { phone },
      {},
      { new: true, upsert: true },
    );

    if (
      user.verificationExpireDate &&
      moment().isBefore(moment(user.verificationExpireDate))
    ) {
      const seconds = Math.ceil(
        (user.verificationExpireDate.getTime() - moment().valueOf()) / 1000,
      ).toFixed(0);

      throw new BadRequestException(
        `the previous verification code still is valid. please wait ${seconds} seconds and try again`,
      );
    }

    const code = otpGenerator.generate(5, {
      digits: true,
      lowerCaseAlphabets: false,
      upperCaseAlphabets: false,
      specialChars: false,
    });

    user.verificationCode = code;
    user.verificationExpireDate = moment().add(2, 'minutes').toDate();

    await user.save();

    await this.notificationService.lookup(this.kvnTemplate, phone, code);

    return {
      message: 'code sent successfully',
    };
  }

  async verifyCode(input: VerifyCodeInput): Promise<VerifyCodeOutput> {
    const phone = parsePhoneNumber(input.phone, input.region).number;

    const user = await this.userModel.findOne({ phone });

    if (!user) {
      throw new NotFoundException('user not found');
    }

    if (!user.verificationCode || !user.verificationExpireDate) {
      throw new ForbiddenException('get the code first');
    }

    if (new Date().getTime() > user.verificationExpireDate.getTime()) {
      throw new ForbiddenException('the code has expired');
    }

    if (user.verificationCode !== input.code) {
      throw new ForbiddenException('the code is wrong');
    }

    user.isVerified = true;
    user.verificationCode = null;
    user.verificationExpireDate = null;

    await user.save();

    return {
      message: 'user authenticated successfully',
      token: await this.jwtService.sign(7, user._id.toString()),
      user,
    };
  }
}
