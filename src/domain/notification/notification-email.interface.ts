import { NotificationEmailDto } from "./dto/notification-email.dto";

export interface INotificationEmail {
  sendMail(notification: NotificationEmailDto): Promise<boolean>;
}
