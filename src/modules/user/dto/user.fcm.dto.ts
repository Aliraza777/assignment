import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class UserFcmDto {
  @ApiProperty({ required: true, type: String })
  @IsNotEmpty()
  @IsString()
  fcm_token: string;
}
