import nodemailer from "nodemailer";
import { EmailSendCommandParamsType, IEmailService } from "./types";

export class SMTPEmailService implements IEmailService {
  private transporter: nodemailer.Transporter;

  constructor(private senderEmailAddress: string = process.env.SENDER_EMAIL!) {
    this.transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT!),
      secure: process.env.SMTP_SECURE === "true",
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });
  }

  async sendEmail(params: EmailSendCommandParamsType): Promise<unknown> {
    const { subject, body, receiver } = params;
    return this.transporter.sendMail({
      from: this.senderEmailAddress,
      to: receiver,
      subject: subject,
      text: body,
    });
  }
}
