import { Body, Controller, Post, Put } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SendCodeInput, SendCodeOutput } from './dto/send-code.dto';
import { VerifyCodeInput, VerifyCodeOutput } from './dto/verify-code.dto';
import { Permission } from 'src/iam/authorization/decorator/permission.decorator';
import { CurrentUser } from 'src/iam/authorization/decorator/current-user.decorator';
import { User } from 'src/user/schema/user.schema';
import {
  EditCurrentUserInput,
  EditCurrentUserOutput,
} from './dto/edit-current-user.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('send-code')
  async sendCode(@Body() input: SendCodeInput): Promise<SendCodeOutput> {
    return this.authService.sendCode(input);
  }

  @Post('verify-code')
  async verifyCode(@Body() input: VerifyCodeInput): Promise<VerifyCodeOutput> {
    return this.authService.verifyCode(input);
  }

  @Permission('EDIT_CURRENT_USER')
  @Put('current-user')
  async editCurrentUser(
    @CurrentUser() currentUser: User,
    @Body() input: EditCurrentUserInput,
  ): Promise<EditCurrentUserOutput> {
    return this.authService.editCurrentUser(currentUser, input);
  }
}
