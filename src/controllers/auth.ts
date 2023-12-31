import "dotenv/config";

import { Request, Response } from "express";
import { registerNewUser, loginUser } from "../services/auth.service";
import { handleHttp } from "../utils/error.handle";

const registerCtrl = async (req: Request, res: Response) => {
  try {
    const responserUser = await registerNewUser(req);
    res.json(responserUser);
  } catch (e) {
    handleHttp(res, "Error en la creación", e);
  }
};

const loginCtrl = async (req: Request, res: Response) => {
  try {
    const data = await loginUser(req, res);
    res.json(data);
  } catch (e) {
    handleHttp(res, "Credenciales invalidas", e);
  }
};

export { registerCtrl, loginCtrl };
