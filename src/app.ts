import "dotenv/config";

import express, { Request, Response } from "express";
import cors from "cors";
import { router } from "./routes";
import morgan from "morgan";

import swaggerUi from "swagger-ui-express";
import swaggerSetup from "./docs/swagger";
import cookieParser from "cookie-parser";
import { corsOptions } from "./utils/cors.handle";

const app = express();
const base_url = process.env.BASE_URL as string;

app.use(morgan("dev"));
app.use(cors(corsOptions));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api", router);
app.use("/documentation", swaggerUi.serve, swaggerUi.setup(swaggerSetup));

export default app;
