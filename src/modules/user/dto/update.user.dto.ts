import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString } from 'class-validator';
export class UpdateUserDto {
  @ApiProperty({ required: false, type: String })
  @IsString()
  @IsOptional()
  name?: string;

  @ApiProperty({ required: false, type: Boolean })
  @IsOptional()
  is_deleted?: boolean;
}
