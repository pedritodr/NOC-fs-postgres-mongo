import { CheckService } from "../domain/use-cases/checks/check";
import { CronService } from "./cron/cron-service";

export class Server {
  public static start() {
    console.log("Server started...");
    CronService.createJob("*/5 * * * * *", () => {
      new CheckService(
        () => console.log("success"),
        (error) => console.error(error)
      ).execute("https://google.com");
    });
  }
}
