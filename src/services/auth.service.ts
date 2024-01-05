import "dotenv/config";

import { PrismaClient, Users } from "@prisma/client";
import { Request, Response } from "express";
import { encrypt, verified } from "../utils/bcrypt.handle";
import { generateToken } from "../utils/jwt.handle";
import { handleHttp } from "../utils/error.handle";

const prisma = new PrismaClient();

function exclude<User, Key extends keyof User>(
  user: User,
  keys: Key[]
): Omit<User, Key> {
  for (let key of keys) {
    delete user[key];
  }
  return user;
}

const registerNewUser = async ({ body }: Request) => {
  const alreadyExist = await prisma.users.findUnique({
    where: {
      email: body.email,
    },
  });

  if (alreadyExist) {
    return { message: "Este Usuario ya Existe" };
  }

  if (body.passwordConfirm) {
    delete body.passwordConfirm;
  }

  const passwordHashed = await encrypt(body.password);
  body.password = passwordHashed;

  const newUser = await prisma.users.create({
    data: {
      ...body,
    },
  });
  const newUserWithoutPass = exclude(newUser, ["password"]);

  return newUserWithoutPass;
};

const loginUser = async ({ body }: Request, res: Response) => {
  const userExist: Users | null = await prisma.users.findUnique({
    where: {
      email: body.email,
    },
  });

  if (!userExist) {
    handleHttp(res, "Credenciales invalidas");
  } else {
    const passIsOk = await verified(body.password, userExist.password);
    if (!passIsOk) {
      handleHttp(res, "Credenciales invalidas");
    } else {
      const tokenPayload = {
        id: userExist.id,
        email: userExist.email,
        name: userExist.name,
      };
      const token = generateToken(JSON.stringify(tokenPayload));
      const userWithoutPass = exclude(userExist, ["password"]);
      const cookieName = process.env.COOKIE_NAME as string;
      const varSite = process.env.NODE_SAMESITE === "lax" ? "lax" : "none";

      if (token) {
        res.cookie(cookieName, token, {
          maxAge: 30 * 60 * 60 * 24,
          sameSite: varSite,
          path: "/",
          // httpOnly: process.env.NODE_ENVIROMENT === "production",
          // secure: process.env.NODE_ENVIROMENT === "production",
        });

        res.cookie("User", JSON.stringify(userWithoutPass), {
          maxAge: 30 * 60 * 60 * 24,
          sameSite: varSite,
          path: "/",
          // httpOnly: process.env.NODE_ENVIROMENT === "production",
          // secure: process.env.NODE_ENVIROMENT === "production",
        });
      }

      return userWithoutPass;
    }
  }
};

export { registerNewUser, loginUser, exclude };
