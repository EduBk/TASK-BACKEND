import "dotenv/config";

import { Request, Response } from "express";
import { newTask, getAllTasks, updateTasks, deleteTasks, getUniqueTask } from "../services/tasks.service";
import { handleHttp } from "../utils/error.handle";

const createTask = async (req: Request, res: Response) => {
  try {
    const Task = await newTask(req, res);
    res.json(Task);
  } catch (e) {
    handleHttp(res, "Error al crear la tarea", e);
  }
};

const getTasks = async (req: Request, res: Response) => {
  try {
    const Tasks = await getAllTasks(req);
    res.json(Tasks);
  } catch (e) {
    handleHttp(res, "Error al obtener las tareas", e);
  }
};

const updateTask = async (req: Request, res: Response) => {
  try {
    const Task = await updateTasks(req);
    res.json(Task);
  } catch (e) {
    handleHttp(res, "Credenciales invalidas", e);
  }
};

const deleteTask = async (req: Request, res: Response) => {
  try {
    const Task = await deleteTasks(req);
    res.json(Task);
  } catch (e) {
    handleHttp(res, "Credenciales invalidas", e);
  }
};

const getTask = async (req: Request, res: Response) => {
  try {
    const data = await getUniqueTask(req);
    res.json(data);
  } catch (e) {
    handleHttp(res, "Credenciales invalidas", e);
  }
};

export { getTasks, createTask, updateTask, deleteTask, getTask };
