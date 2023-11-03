import nodemailer from "nodemailer";
import { envs } from "../../config/plugins/env.plugin";

interface SendMailOptions {
  to: string | string[];
  subject: string;
  htmlBody: string;
  attachments?: Attachments[];
}

interface Attachments {
  filename: string;
  path: string;
}
export class EmailService {
  private transport = nodemailer.createTransport({
    service: envs.MAILER_SERVICE,
    auth: {
      user: envs.MAILER_MAIL,
      pass: envs.MAILER_SECRET_KEY,
    },
  });

  async sendMail(options: SendMailOptions): Promise<boolean> {
    const { to, subject, htmlBody, attachments = [] } = options;

    try {
      const sendInformation = await this.transport.sendMail({
        to: to,
        subject: subject,
        html: htmlBody,
        attachments: attachments,
      });
      console.log(
        "🚀 ~ file: email.service.ts:30 ~ EmailService ~ sendMail ~ sendInformation:",
        sendInformation
      );
      return true;
    } catch (error) {
      return false;
    }
  }

  sendEmalWithFileSystemLogs(to: string | string[]): Promise<boolean> {
    const subject = "Logs del servidor";
    const htmlBody = `
    <h3>Notification logs NOC app</h3>
    <p>Sint et officia Lorem velit incididunt commodo non consectetur veniam ex proident id laborum. Voluptate ut eu mollit ipsum veniam nulla reprehenderit do. Sunt dolore fugiat labore officia cillum commodo do reprehenderit. Reprehenderit labore labore veniam id culpa minim veniam amet magna laboris deserunt. Non sit consequat cillum ea duis. Laborum dolor do magna anim pariatur esse culpa mollit amet pariatur nostrud. Non ut aute esse labore excepteur elit commodo eu adipisicing.</p>
   .<p>Ver los log</p> `;

    const attachments: Attachments[] = [
      { filename: "logs-low.log", path: "logs/logs-low.log" },
      { filename: "logs-high.log", path: "logs/logs-high.log" },
      { filename: "logs-medium.log", path: "logs/logs-medium.log" },
    ];
    return this.sendMail({
      attachments,
      to,
      subject,
      htmlBody,
    });
  }
}
