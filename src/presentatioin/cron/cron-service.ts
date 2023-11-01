import { CronJob } from "cron";

type CronTime = string | Date;
type Ontick = () => void;
export class CronService {
  public static createJob(cronTime: CronTime, onTick: Ontick): CronJob {
    const job = new CronJob(
      cronTime, // cronTime
      onTick, // onTick
      null, // onComplete
      true, // start
      "America/Los_Angeles" // timeZone
    );

    job.start();

    return job;
  }
}
