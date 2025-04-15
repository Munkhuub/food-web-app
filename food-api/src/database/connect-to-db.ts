import { connect } from "mongoose";

export const connectToDatabase = async () => {
  connect(
    "mongodb+srv://admin:Munkhuu0729@cluster0.wcxfxrz.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
  );
  console.log("Connect to database");
};
