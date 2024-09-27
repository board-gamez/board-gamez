import {
  GetObjectCommand,
  PutObjectCommand,
  S3Client,
} from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { extname } from 'path';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class FileService {
  private s3Client: S3Client;
  private bucketName: string;

  constructor(private readonly configService: ConfigService) {
    this.bucketName = this.configService.get<string>('S3_BUCKET');

    this.s3Client = new S3Client({
      region: 'default',
      endpoint: this.configService.get<string>('S3_ENDPOINT'),
      credentials: {
        accessKeyId: this.configService.get<string>('S3_ACCESS_KEY'),
        secretAccessKey: this.configService.get<string>('S3_SECRET_KEY'),
      },
    });
  }

  async uploadFile(file: Express.Multer.File): Promise<string> {
    try {
      const key = uuidv4() + extname(file.originalname);

      const data = await this.s3Client.send(
        new PutObjectCommand({
          Bucket: this.bucketName,
          Key: key,
          Body: file.buffer,
          ACL: 'public-read',
        }),
      );

      if (
        data.$metadata.httpStatusCode !== 200 &&
        data.$metadata.httpStatusCode !== 201
      ) {
        throw new Error('has a error');
      }

      return key;
    } catch (error) {
      throw new Error(error);
    }
  }

  async getFileLink(
    key: string,
    expiresIn: number = 60 * 60 * 24,
  ): Promise<string> {
    try {
      const command = new GetObjectCommand({
        Bucket: this.bucketName,
        Key: key,
      });

      const url = await getSignedUrl(this.s3Client, command, { expiresIn });

      return url;
    } catch (error) {
      throw new Error(error);
    }
  }

  async getFilesLink(
    keys: string[],
    expiresIn: number = 60 * 60 * 24,
  ): Promise<string[]> {
    const result: string[] = [];

    for (const key of keys) {
      const link = await this.getFileLink(key, expiresIn);

      result.push(link);
    }

    return result;
  }
}
