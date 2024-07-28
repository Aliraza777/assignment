import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { BypassAuth } from '../global/decorators/bypass.auth.decorator';
import { ResponseDto } from '../global/dto/response.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @BypassAuth()
  @Get()
  getHello(): ResponseDto<string> {
    return this.appService.getHello();
  }
}
