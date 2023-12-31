import "dotenv/config";

import { Request, Response, Router } from "express";
import { registerCtrl, loginCtrl } from "../controllers/auth";
// import { checkJwt } from "../middleware/session";

const router = Router();
const base_url = process.env.BASE_URL as string;

router.post("/register", registerCtrl);
router.post("/login", loginCtrl);
router.get("/logout", (req: Request, res: Response) => {
  res.redirect(base_url.concat("/auth/login"));
});

export { router };