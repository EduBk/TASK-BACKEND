import { NextFunction, Request, Response } from "express";
import { verifyToken } from "../utils/jwt.handle";

const checkJwt = (req: Request, res: Response, next: NextFunction) => {
  try {
    const jwtByUser = req.headers.authorization || "";
    // console.log(jwtByUser);
    const jwt = jwtByUser.split(" ").pop();
    const sessionOk = verifyToken(`${jwt}`);

    if (!sessionOk) {
      res.status(401);
      res.json({ message: "INVALID TOKEN" });
    } else {
      // req.user = sessionOk;
      next();
    }
  } catch (e) {
    res.status(400);
    res.json({ message: "SESSION NOT AVAILABLE" });
  }
};

export { checkJwt };
