import dotenv from "dotenv";
import dbconnect from "./DB/dbconnection.js";
import { app } from "./app.js";

dotenv.config({
  path: "./env",
});
dbconnect().then(() => {
  app.on("error", (error) => {
    console.error("Error :", error);
    throw error;
  });
  app.listen(process.env.PORT || 8000, () => {
    console.log(`Server started at port: ${process.env.PORT}`);
  });
});
