import { HttpStatus } from '@nestjs/common';

export class ResponseDto<T> {
  message: string;
  statusCode: number;
  data: T;

  constructor(status: HttpStatus, message: string, data: T) {
    this.statusCode = status;
    this.message = message;
    this.data = data;
  }
}
