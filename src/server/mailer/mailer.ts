import { AWSEmailService } from "./ses";
import { SMTPEmailService } from "./smtp";
import { IEmailService } from "./types";

export class EmailServiceFactory {
  static createEmailService(): IEmailService {
    const provider = process.env.EMAIL_PROVIDER;

    switch (provider) {
      case "ses":
        console.log("Using AWS SES");
        return new AWSEmailService();

      case "smtp":
        console.log("Using SMTP");
        return new SMTPEmailService();
      default:
        throw new Error(`Unknown email provider: ${provider}`);
    }
  }
}

export const mailer = EmailServiceFactory.createEmailService();
