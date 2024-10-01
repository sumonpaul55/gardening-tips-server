import express, { Application } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import globalErrorhandler from "./app/middleWare/globalErrorHandler";
import notFound from "./app/middleWare/notFound";
import router from "./app/router";
const app: Application = express();

app.use(express.json());
app.use(cors({ origin: ["http://localhost:3000"] }));
app.use(cookieParser());

app.use("/api", router);

app.get("/", (req, res) => {
  res.status(200).json("Welcome to the gardenig tips server");
});
app.use(globalErrorhandler);
// not found route
app.use(notFound);

export default app;
