import { LogEntity, LogSeverityLevel } from "../../entities/log.entity";
import { LogRepository } from "../../repository/log.repository";

interface CheckServiceMultipleUseCase {
  execute(url: string): Promise<boolean>;
}

type SuccessCallback = (() => void) | undefined;
type ErrorCallback = ((error: string) => void) | undefined;

export class CheckServiceMultiple implements CheckServiceMultipleUseCase {
  constructor(
    private readonly logRepository: LogRepository[],
    private readonly successCallback: SuccessCallback,
    private readonly errorCallback: ErrorCallback
  ) {}

  private callLogs(log: LogEntity) {
    this.logRepository.forEach((logRepository) => {
      logRepository.saveLog(log);
    });
  }
  async execute(url: string): Promise<boolean> {
    try {
      const req = await fetch(url);
      if (!req) {
        throw new Error(`Error  on check service ${url}`);
      }

      const log = new LogEntity({
        origin: "check-service.ts",
        level: LogSeverityLevel.low,
        message: `Service ${url} working`,
      });
      this.callLogs(log);
      this.successCallback && this.successCallback();
      console.log(`${url} is ok`);
      return true;
    } catch (error) {
      const errorMessage = `${url} is not ok. ${error}`;
      const log = new LogEntity({
        origin: "check-service.ts",
        level: LogSeverityLevel.high,
        message: errorMessage,
      });
      this.errorCallback && this.errorCallback(errorMessage);
      this.callLogs(log);
      console.log(
        "🚀 ~ file: check.ts:14 ~ CheckService ~ execute ~ error:",
        error
      );
      return false;
    }
  }
}
