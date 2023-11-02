import fs from "fs";
import { LogDatasource } from "../../domain/datasources/log.datasource";
import { LogEntity, LogSeverityLevel } from "../../domain/entities/log.entity";

export class FileSystemDatasource implements LogDatasource {
  private readonly logPath = "logs/";
  private readonly allLogsPath = "logs/logs-low.log";
  private readonly mediumLogPath = "logs/logs-medium.log";
  private readonly highLogPath = "logs/logs-high.log";

  constructor() {
    this.createLogFile();
  }

  private createLogFile = () => {
    if (!fs.existsSync(this.logPath)) {
      fs.mkdirSync(this.logPath);
    }
    [this.allLogsPath, this.mediumLogPath, this.highLogPath].forEach((path) => {
      if (fs.existsSync(path)) return;
      fs.writeFileSync(path, "");
    });
  };

  async saveLog(newLog: LogEntity): Promise<void> {
    const logAsJson = `${JSON.stringify(newLog)}\n`;
    fs.appendFileSync(this.allLogsPath, logAsJson);
    if (newLog.level === LogSeverityLevel.medium) {
      fs.appendFileSync(this.mediumLogPath, logAsJson);
    } else {
      fs.appendFileSync(this.highLogPath, logAsJson);
    }
  }

  private getLogsFromFile = (path: string): LogEntity[] => {
    const content = fs.readFileSync(path, "utf8");
    const logs = content.split("\n").map(LogEntity.fromJson);
    return logs;
  };

  async getLog(severety: LogSeverityLevel): Promise<LogEntity[]> {
    switch (severety) {
      case LogSeverityLevel.low:
        return this.getLogsFromFile(this.allLogsPath);
      case LogSeverityLevel.medium:
        return this.getLogsFromFile(this.mediumLogPath);
      case LogSeverityLevel.high:
        return this.getLogsFromFile(this.highLogPath);
      default:
        throw new Error(`${severety} not implemented.`);
    }
  }
}
