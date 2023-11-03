import { FileSystemDatasource } from "./../infraestructure/datasources/file-system.datasource";
import { CheckService } from "../domain/use-cases/checks/check-service";
import { CronService } from "./cron/cron-service";
import { LogRepositoryImpl } from "../infraestructure/repositories/log.repository.impl";
import { envs } from "../config/plugins/env.plugin";
import { EmailService } from "./email/email.service";
import { SendLogEmail } from "../domain/use-cases/email/send-email";

const fileSystemRepository = new LogRepositoryImpl(new FileSystemDatasource());
export class Server {
  public static start() {
    console.log("Server started...");
    console.log(envs);
    const emailService = new EmailService();

    new SendLogEmail(emailService, fileSystemRepository).execute(
      "pedroduran014@gmail.com"
    );
    CronService.createJob("*/5 * * * * *", () => {
      new CheckService(
        fileSystemRepository,
        () => console.log("success"),
        (error) => console.error(error)
      ).execute("https://google.com");
    });
  }
}
