import { sign, verify } from "jsonwebtoken";
const SESSION_SECRET = process.env.SESSION_SECRET as string;

const generateToken = (payload: any) => {
  const data = JSON.parse(payload)
  const jwt = sign(data, SESSION_SECRET, {
    expiresIn: '24h'
  });

  return jwt;
};

const verifyToken = (jwt: string) => {
  const isok = verify(jwt, SESSION_SECRET);
  return isok;
};

export { generateToken, verifyToken };
