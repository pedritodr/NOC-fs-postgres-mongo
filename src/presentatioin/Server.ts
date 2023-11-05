import { FileSystemDatasource } from "./../infraestructure/datasources/file-system.datasource";
import { CheckService } from "../domain/use-cases/checks/check-service";
import { CronService } from "./cron/cron-service";
import { LogRepositoryImpl } from "../infraestructure/repositories/log.repository.impl";
import { envs } from "../config/plugins/env.plugin";
import { EmailService } from "./email/email.service";
import { SendLogEmail } from "../domain/use-cases/email/send-email";
import { MongoLogDatasource } from "../infraestructure/datasources/mongo-log-datasource";
import { PostgresLogDatasource } from "../infraestructure/datasources/postgres-log.datasource";
import { CheckServiceMultiple } from "../domain/use-cases/checks/check-service-multiple";

const fsLogRepository = new LogRepositoryImpl(new FileSystemDatasource());
const PostgresLogRepository = new LogRepositoryImpl(
  new PostgresLogDatasource()
);
const MongoLogRepository = new LogRepositoryImpl(new MongoLogDatasource());
export class Server {
  public static start() {
    console.log("Server started...");
    console.log(envs);
    /*   const emailService = new EmailService();

    new SendLogEmail(emailService, fileSystemRepository).execute(
      "pedroduran014@gmail.com"
    ); */
    // CronService.createJob("*/5 * * * * *", () => {
    //   new CheckServiceMultiple(
    //     [fsLogRepository, PostgresLogRepository, MongoLogRepository],
    //     () => console.log("success"),
    //     (error) => console.error(error)
    //   ).execute("https://google.com");
    // });
  }
}
