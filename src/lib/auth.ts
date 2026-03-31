import { SignJWT, jwtVerify } from 'jose';
import bcrypt from 'bcrypt';
import { UserRole } from '@prisma/client';

const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || 'barrera-wallplate-secret-key-change-in-production-2026'
);

const ACCESS_TOKEN_EXPIRY = '15m';
const REFRESH_TOKEN_EXPIRY = '7d';

export interface TokenPayload {
  userId: string;
  email: string;
  role: UserRole;
  type: 'access' | 'refresh';
}

export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 12);
}

export async function verifyPassword(password: string, hash: string): Promise<boolean> {
  return bcrypt.compare(password, hash);
}

export async function generateAccessToken(payload: Omit<TokenPayload, 'type'>): Promise<string> {
  return new SignJWT({ ...payload, type: 'access' as const })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime(ACCESS_TOKEN_EXPIRY)
    .setIssuer('barrera-wallplate')
    .sign(JWT_SECRET);
}

export async function generateRefreshToken(payload: Omit<TokenPayload, 'type'>): Promise<string> {
  return new SignJWT({ ...payload, type: 'refresh' as const })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime(REFRESH_TOKEN_EXPIRY)
    .setIssuer('barrera-wallplate')
    .sign(JWT_SECRET);
}

export async function verifyToken(token: string): Promise<TokenPayload | null> {
  try {
    const { payload } = await jwtVerify(token, JWT_SECRET, {
      issuer: 'barrera-wallplate',
    });
    return payload as unknown as TokenPayload;
  } catch {
    return null;
  }
}

export async function generateTokenPair(user: { id: string; email: string; role: UserRole }) {
  const tokenData = { userId: user.id, email: user.email, role: user.role };
  const [accessToken, refreshToken] = await Promise.all([
    generateAccessToken(tokenData),
    generateRefreshToken(tokenData),
  ]);
  return { accessToken, refreshToken };
}
