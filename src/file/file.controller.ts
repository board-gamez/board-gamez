import {
  Controller,
  Get,
  Param,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Permission } from 'src/iam/authorization/decorator/permission.decorator';
import { FileService } from './file.service';

@Controller('files')
export class FileController {
  constructor(private readonly fileService: FileService) {}

  @Permission('UPLOAD_FILE')
  @Post()
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(@UploadedFile() file: Express.Multer.File): Promise<string> {
    return this.fileService.uploadFile(file);
  }

  @Get(':key')
  async getFileLink(@Param('key') key: string): Promise<string> {
    return this.fileService.getFileLink(key);
  }
}
