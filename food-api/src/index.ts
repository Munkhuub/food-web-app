import express from "express";
import foodRouter from "./routes/food.route";

const app = express();

const port = 3001;

app.use("/food", foodRouter).use("/category", foodRouter);

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
