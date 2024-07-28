import { Injectable } from '@nestjs/common';
import { FirebaseService } from './firebase.service';
import { NotificationDataDto } from '../../global/dto/notification.data.dto';

@Injectable()
export class FirebaseNotificationService {
  async sendNotification(
    devicesFCM: string[],
    messagingPayload: NotificationDataDto,
  ) {
    if (process.env.NODE_ENV !== 'test') {
      const chunkSize = 1000;
      while (devicesFCM.length) {
        const deviceFCMs = devicesFCM.splice(0, chunkSize);
        FirebaseService.firebaseMessaging
          .sendToDevice(deviceFCMs, {
            notification: {
              title: messagingPayload.title,
              type: messagingPayload.type.toString(),
              body: messagingPayload.body,
            },
          })
          .then(function (response) {
            console.log('Successfully sent message:', response);
          })
          .catch(function (error) {
            console.log('Error sending message:', error);
          });
      }
    }
  }
}
