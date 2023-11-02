import { FileSystemDatasource } from "./../infraestructure/datasources/file-system.datasource";
import { CheckService } from "../domain/use-cases/checks/check";
import { CronService } from "./cron/cron-service";
import { LogRepositoryImpl } from "../infraestructure/repositories/log.repository.impl";

const fileSystemRepository = new LogRepositoryImpl(new FileSystemDatasource());
export class Server {
  public static start() {
    console.log("Server started...");
    CronService.createJob("*/5 * * * * *", () => {
      new CheckService(
        fileSystemRepository,
        () => console.log("success"),
        (error) => console.error(error)
      ).execute("https://google.com");
    });
  }
}
