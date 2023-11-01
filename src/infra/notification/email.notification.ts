import { NotificationEmailDto } from "@/domain/notification/dto/notification-email.dto";
import { INotificationEmail } from "@/domain/notification/notification-email.interface";

export class EmailNotification implements INotificationEmail {
  sendMail(notification: NotificationEmailDto): Promise<boolean> {
    return Promise.resolve(this.randomStatus());
  }

  private randomStatus(): boolean {
    return Math.random() >= 0.33;
  }
}
