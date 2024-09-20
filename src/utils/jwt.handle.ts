import { sign, verify } from 'jsonwebtoken';
const SESSION_SECRET = process.env.SESSION_SECRET as string;

const generateToken = (payload: any) => {
  console.log('Generating token with payload:', payload);
  const jwt = sign(payload, SESSION_SECRET, {
    expiresIn: '24h',
  });
  console.log('Generated token:', jwt);
  return jwt;
};

const verifyToken = (jwt: string) => {
  try {
    const decoded = verify(jwt, SESSION_SECRET);
    return decoded;
  } catch (error) {
    console.error('Error verifying token:', error);
    return null;
  }
};

export { generateToken, verifyToken };
