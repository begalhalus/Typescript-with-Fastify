import plugin from "fastify-plugin";
import { createConnection, getConnectionOptions } from "typeorm";
import { News } from "../entity/News";
import { Topic } from "../entity/Topic";

export default plugin(async (fastify: any) => {
  try {
    const connectionOptions = await getConnectionOptions();
    const connection = await createConnection(connectionOptions);

    fastify.decorate("db", {
      memo: connection.getRepository(News),
      user: connection.getRepository(Topic),
    });
  } catch (err) {
    console.log(err);
  }
});
