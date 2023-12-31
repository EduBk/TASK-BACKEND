"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.exclude = exports.loginUser = exports.registerNewUser = void 0;
require("dotenv/config");
const client_1 = require("@prisma/client");
const bcrypt_handle_1 = require("../utils/bcrypt.handle");
const jwt_handle_1 = require("../utils/jwt.handle");
const error_handle_1 = require("../utils/error.handle");
const prisma = new client_1.PrismaClient();
function exclude(user, keys) {
    for (let key of keys) {
        delete user[key];
    }
    return user;
}
exports.exclude = exclude;
const registerNewUser = ({ body }) => __awaiter(void 0, void 0, void 0, function* () {
    const alreadyExist = yield prisma.users.findUnique({
        where: {
            email: body.email,
        },
    });
    if (alreadyExist) {
        return { message: "User with email already exists" };
    }
    const passwordHashed = yield (0, bcrypt_handle_1.encrypt)(body.password);
    body.password = passwordHashed;
    const newUser = yield prisma.users.create({
        data: Object.assign({}, body),
    });
    const newUserWithoutPass = exclude(newUser, ["password"]);
    return newUserWithoutPass;
});
exports.registerNewUser = registerNewUser;
const loginUser = ({ body }, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userExist = yield prisma.users.findUnique({
        where: {
            email: body.email,
        },
        // include: {
        //   roles: true,
        // },
    });
    if (!userExist) {
        (0, error_handle_1.handleHttp)(res, "Credenciales invalidas");
    }
    else {
        const passIsOk = yield (0, bcrypt_handle_1.verified)(body.password, userExist.password);
        if (!passIsOk) {
            (0, error_handle_1.handleHttp)(res, "Credenciales invalidas");
        }
        else {
            const tokenPayload = {
                id: userExist.id,
                email: userExist.email,
                name: userExist.name,
                // isPatient: userExist.isPatient,
            };
            const token = (0, jwt_handle_1.generateToken)(JSON.stringify(tokenPayload));
            const userWithoutPass = exclude(userExist, ["password"]);
            const cookieName = process.env.COOKIE_NAME;
            const varSite = process.env.NODE_SAMESITE === "lax" ? "lax" : "none";
            if (token) {
                res.cookie(cookieName, token, {
                    maxAge: 30 * 60 * 60 * 24,
                    sameSite: varSite,
                    path: "/",
                    httpOnly: process.env.NODE_ENVIROMENT === "production",
                    secure: process.env.NODE_ENVIROMENT === "production",
                });
                res.cookie("user", JSON.stringify(userWithoutPass));
            }
            return userWithoutPass;
        }
    }
});
exports.loginUser = loginUser;
