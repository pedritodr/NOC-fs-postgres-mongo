import { EmailService } from "../../../presentatioin/email/email.service";
import { LogRepository } from "../../../domain/repository/log.repository";
import { LogEntity, LogSeverityLevel } from "../../entities/log.entity";

interface SendLogEmailUseCase {
  execute: (to: string | string[]) => Promise<boolean>;
}

export class SendLogEmail implements SendLogEmailUseCase {
  constructor(
    private readonly emailService: EmailService,
    private readonly logRepository: LogRepository
  ) {}
  async execute(to: string | string[]) {
    try {
      const sent = await this.emailService.sendEmalWithFileSystemLogs(to);
      if (!sent) throw new Error("Email not sent");
      const log = new LogEntity({
        message: "log email sent",
        level: LogSeverityLevel.low,
        origin: "send-email.ts",
      });
      this.logRepository.saveLog(log);
      return true;
    } catch (error) {
      const log = new LogEntity({
        message: "log email not sent",
        level: LogSeverityLevel.high,
        origin: "send-email.ts",
      });
      this.logRepository.saveLog(log);
      return false;
    }
  }
}
