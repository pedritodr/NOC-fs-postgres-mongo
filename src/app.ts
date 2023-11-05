import { envs } from "./config/plugins/env.plugin";
import { MongoDatabase } from "./data/mongo";
import { Server } from "./presentatioin/Server";

(() => {
  main();
})();

function main() {
  MongoDatabase.connect({
    mongoUrl: envs.MONGO_URL,
    dbName: envs.MONGO_DB_NAME,
  });
  Server.start();
}
