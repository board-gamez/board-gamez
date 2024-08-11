import {
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { JwtService } from '@app/jwt';
import { User, UserDocument } from 'src/user/schema/user.schema';

@Injectable()
export class AuthenticationMiddleware implements NestMiddleware {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
    private readonly jwtService: JwtService,
  ) {}

  async use(req: Request, res: Response, next: NextFunction) {
    if ('authorization' in req.headers) {
      const token = req.headers['authorization']
        .toString()
        .replace('Bearer', '')
        .trim();

      const decoded = await this.jwtService.verify(token.toString());

      const user = await this.userModel.findById(decoded['userId']);

      if (!user) throw new UnauthorizedException();

      req['user'] = user;
    }

    next();
  }
}
