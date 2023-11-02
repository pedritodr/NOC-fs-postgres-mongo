import { LogEntity, LogSeverityLevel } from "../../entities/log.entity";
import { LogRepository } from "../../repository/log.repository";

interface CheckServiceUseCase {
  execute(url: string): Promise<boolean>;
}

type SuccessCallback = (() => void) | undefined;
type ErrorCallback = ((error: string) => void) | undefined;

export class CheckService implements CheckServiceUseCase {
  constructor(
    private readonly logRepository: LogRepository,
    private readonly successCallback: SuccessCallback,
    private readonly errorCallback: ErrorCallback
  ) {}
  async execute(url: string): Promise<boolean> {
    try {
      const req = await fetch(url);
      if (!req) {
        throw new Error(`Error  on check service ${url}`);
      }

      const log = new LogEntity(LogSeverityLevel.low, `Service ${url} working`);
      this.logRepository.saveLog(log);
      this.successCallback && this.successCallback();
      console.log(`${url} is ok`);
      return true;
    } catch (error) {
      const errorMessage = `${url} is not ok. ${error}`;
      const log = new LogEntity(LogSeverityLevel.high, errorMessage);
      this.errorCallback && this.errorCallback(errorMessage);
      this.logRepository.saveLog(log);
      console.log(
        "🚀 ~ file: check.ts:14 ~ CheckService ~ execute ~ error:",
        error
      );
      return false;
    }
  }
}
