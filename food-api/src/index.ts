import express from "express";
import foodRouter from "./routes/food.route";
import { connectToDatabase } from "./database/connect-to-db";
import categoryRouter from "./routes/category.route";
import cors from "cors";
connectToDatabase();

const app = express();

const port = 3001;

app.use(express.json());
app.use(cors());
app.use("/food", foodRouter).use("/category", categoryRouter);

app.get("/", (req, res) => {
  res.send("This is home shit");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
