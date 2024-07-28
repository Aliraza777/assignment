import { NotificationTypeEnum } from '../enums/notification.type.enum';

export class NotificationDataDto {
  title: string;
  type: NotificationTypeEnum;
  body: string;
}
