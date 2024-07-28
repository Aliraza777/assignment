import { ApiProperty } from '@nestjs/swagger';
import {
  ArrayMaxSize,
  ArrayMinSize,
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import { AuthProviderEnum } from '../../../global/enums/auth.provider.enum';
import { UserPermissionsEnum } from '../../../global/enums/user.permissions.enum';
import { UserRolesEnum } from '../../../global/enums/user.roles.enum';
import { Expose } from 'class-transformer';
import {
  HasMimeType,
  IsFile,
  MaxFileSize,
  MemoryStoredFile,
} from 'nestjs-form-data';

export class CreateUserDto {
  @ApiProperty({ required: true, type: String })
  @IsNotEmpty()
  @IsString()
  @Expose()
  uuid: string;

  @ApiProperty({ required: true, type: String })
  @IsString()
  @IsEmail()
  @IsNotEmpty()
  @Expose()
  email: string;

  @ApiProperty({ required: true, type: String })
  @IsString()
  @IsNotEmpty()
  @Expose()
  name: string;

  @ApiProperty({
    required: false,
    type: Boolean,
    default: false,
  })
  @IsOptional()
  @Expose()
  is_deleted?: boolean;
  @ApiProperty({
    required: false,
    enum: UserRolesEnum,
    default: UserRolesEnum.USER,
  })
  @IsEnum(UserRolesEnum)
  @IsOptional()
  @Expose()
  role?: UserRolesEnum;
}
