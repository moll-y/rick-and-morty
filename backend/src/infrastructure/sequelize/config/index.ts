import { config } from "dotenv";
import { Sequelize } from "sequelize";

// Load .env file.
config();

const database = process.env.POSTGRES_DB;
const username = process.env.POSTGRES_USER;
const password = process.env.POSTGRES_PASSWORD;
const host = process.env.POSTGRES_HOST;

if (!database || !username || !password || !host) {
  throw new Error(
    "The following variables must be defined in the .env file: POSTGRES_DB, POSTGRES_USER, POSTGRES_HOST, and POSTGRES_HOST.",
  );
}

const sequelize = new Sequelize(database, username, password, {
  host,
  dialect: "postgres",
});

export { sequelize };
