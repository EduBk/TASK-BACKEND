import "dotenv/config";

import { PrismaClient, Users, Tasks } from "@prisma/client";
import { Request, Response } from "express";
import { handleHttp } from "../utils/error.handle";

const prisma = new PrismaClient();

const newTask = async ({ body }: Request, res: Response) => {
  const TaskObj = await prisma.tasks.create({
    data: {
      ...body,
    },
  });

  return TaskObj;
};

const getUniqueTask = async (req: Request) => {
  const TaskObj = await prisma.tasks.findUnique({
    where: {
      id: req.params.id,
    },
  });

  return TaskObj;
};

const getAllTasks = async (req: Request) => {
  const userId = req.query.userId as string;

  const TaskObj = await prisma.tasks.findMany({
    where: {
      userId: userId,
    },
  });
  // console.log(TaskObj);
  return TaskObj;
};

const updateTasks = async (req: Request) => {
  const TaskObj = await prisma.tasks.update({
    where: {
      id: req.params.id,
    },
    data: req.body,
  });

  return TaskObj;
};

const deleteTasks = async (req: Request) => {
  const TaskObj = await prisma.tasks.delete({
    where: {
      id: req.params.id,
    },
  });

  return TaskObj;
};

export { newTask, getAllTasks, updateTasks, deleteTasks, getUniqueTask };
