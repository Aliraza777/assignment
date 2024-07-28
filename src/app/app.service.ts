import { HttpStatus, Injectable } from '@nestjs/common';
import { ResponseDto } from '../global/dto/response.dto';

@Injectable()
export class AppService {
  getHello(): ResponseDto<string> {
    return new ResponseDto(HttpStatus.OK, 'Success', 'Welcome to Nest App');
  }
}
