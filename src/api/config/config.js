import dotenv from "dotenv";

dotenv.config();

export default {
  db: {
    str: process.env.DB_STRING,
  },
  port: process.env.PORT,
};
