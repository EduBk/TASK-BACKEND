import "dotenv/config";

import { Request, Response, Router } from "express";
import {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
  getTask,
} from "../controllers/tasks";
import { checkJwt } from "../middleware/session";

const router = Router();
const base_url = process.env.BASE_URL as string;

router.get("/", checkJwt, getTasks);
router.get("/:id", checkJwt, getTask);
router.post("/create-task", checkJwt, createTask);
router.patch("/:id", checkJwt, updateTask);
router.delete("/:id", checkJwt, deleteTask);

export { router };
