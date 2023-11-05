export enum LogSeverityLevel {
  low = "low",
  medium = "medium",
  high = "high",
}

export interface LogEntityOptions {
  level: LogSeverityLevel;
  message: string;
  createdAt?: Date;
  origin: string;
}

export class LogEntity {
  level: LogSeverityLevel;
  message: string;
  createdAt: Date;
  origin: string;
  constructor(options: LogEntityOptions) {
    const { origin, message, level, createdAt = new Date() } = options;
    this.level = level;
    this.message = message;
    this.createdAt = createdAt;
    this.origin = origin;
  }

  static fromJson = (json: string): LogEntity => {
    json = json === "" ? "{}" : json;
    const { level, message, createdAt } = JSON.parse(json);
    const log = new LogEntity({ level, message, createdAt, origin });

    return log;
  };

  static fromObject = (object: { [key: string]: any }): LogEntity => {
    const { level, message, createdAt, origin } = object;

    const log = new LogEntity({ level, message, createdAt, origin });

    return log;
  };
}
