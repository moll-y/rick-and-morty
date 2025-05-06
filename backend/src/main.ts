import { Redis } from "ioredis";
import { createHandler } from "graphql-http/lib/use/express";
import { sequelize } from "infrastructure/sequelize/config";
import { GraphController } from "api/graphql.controller";
import { middleware } from "middleware";
import express from "express";
import cron from "node-cron";

const app = express();
const redis = new Redis();
const controller = new GraphController(redis);

cron.schedule("* * * * *", () => {
  //cron.schedule('0 */12 * * *', () => {
  console.log("Cron job is running every 12 hours");
  // Your task here (e.g., sending emails, cleaning up data, etc.)
});

app.use(middleware);

app.all(
  "/graphql",
  createHandler({
    schema: controller.buildSchema(),
    rootValue: {
      character: controller.getCharacterById(),
      characters: controller.getCharactersByFilter(),
      addComment: controller.addComment(),
    },
  }),
);

app.listen(4000, async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync();
  } catch (error) {
    console.log(error);
  }
});
