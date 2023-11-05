import { LogModel } from "../../data/mongo";
import { LogDatasource } from "../../domain/datasources/log.datasource";
import { LogEntity, LogSeverityLevel } from "../../domain/entities/log.entity";

export class MongoLogDatasource implements LogDatasource {
  async saveLog(log: LogEntity): Promise<void> {
    const newLog = await LogModel.create(log);
  }
  async getLog(severety: LogSeverityLevel): Promise<LogEntity[]> {
    const logs = await LogModel.find({ level: severety });

    return logs.map(LogEntity.fromObject);
  }
}
