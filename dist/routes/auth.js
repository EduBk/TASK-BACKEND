"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
require("dotenv/config");
const express_1 = require("express");
const auth_1 = require("../controllers/auth");
// import { checkJwt } from "../middleware/session";
const router = (0, express_1.Router)();
exports.router = router;
const base_url = process.env.BASE_URL;
router.post("/register", auth_1.registerCtrl);
router.post("/login", auth_1.loginCtrl);
router.get("/logout", (req, res) => {
    res.redirect(base_url.concat("/auth/login"));
});
