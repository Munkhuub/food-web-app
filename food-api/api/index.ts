import express from "express";
import foodRouter from "../src/routes/food.route";
import { connectToDatabase } from "../src/database/connect-to-db";
import categoryRouter from "../src/routes/category.route";
import cors from "cors";
import countRouter from "../src/routes/count.route";
import countAllRouter from "../src/routes/countAll.route";
import authRouter from "../src/routes/auth.route";
import { config } from "dotenv";
import orderRouter from "../src/routes/order.route";
import userRouter from "../src/routes/user.route";

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
  .use("/orders", orderRouter)
  .use("/user", userRouter);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
