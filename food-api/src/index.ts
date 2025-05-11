import express from "express";
import foodRouter from "./routes/food.route";
import { connectToDatabase } from "./database/connect-to-db";
import categoryRouter from "./routes/category.route";
import cors from "cors";
import countRouter from "./routes/count.route";
import countAllRouter from "./routes/countAll.route";
import authRouter from "./routes/auth.route";
import { config } from "dotenv";
import orderRouter from "./routes/order.route";

config();

const port = 3001;

connectToDatabase();

const app = express();

app
  .use(cors())
  .use(express.json())
  .use("/food", foodRouter)
  .use("/category", categoryRouter)
  .use("/count", countRouter)
  .use("/countAll", countAllRouter)
  .use("/auth", authRouter)
  .use("/orders", orderRouter);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
