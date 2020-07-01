import { Request, Response, NextFunction } from 'express';
import authConfig from '../config/auth';
import { verify } from 'jsonwebtoken';

interface TokenPayload {
  iat: number,
  exp: number,
  sub: string,
}


function ensureAuthenticated(request: Request, response: Response, next: NextFunction):void  {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    throw new Error('Missing session token / is the user authenticated?')
  }

  const [, token] = authHeader.split(' ');
  try {
    const { secret } = authConfig.jwt;

    const decoded = verify( token, secret );

    const { sub } = decoded as TokenPayload;

    request.user = {
      id: sub,
    }

    return next();

  } catch {
    throw new Error('Wrong token, are you a hacker?')
  }

}

export default ensureAuthenticated;
