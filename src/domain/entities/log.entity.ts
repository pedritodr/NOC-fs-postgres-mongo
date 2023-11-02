export enum LogSeverityLevel {
  low = "low",
  medium = "medium",
  high = "high",
}

export class LogEntity {
  level: LogSeverityLevel;
  message: string;
  createAt: Date;

  constructor(level: LogSeverityLevel, message: string) {
    this.level = level;
    this.message = message;
    this.createAt = new Date();
  }

  static fromJson = (json: string): LogEntity => {
    const { level, message, createdAt } = JSON.parse(json);
    const log = new LogEntity(level, message);
    log.createAt = new Date(createdAt);
    return log;
  };
}
