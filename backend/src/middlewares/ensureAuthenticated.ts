import { Request, Response, NextFunction } from 'express';
import authConfig from '../config/auth';
import { verify } from 'jsonwebtoken';
import AppError from '../errors/AppError';


interface TokenPayload {
  iat: number,
  exp: number,
  sub: string,
}


function ensureAuthenticated(request: Request, response: Response, next: NextFunction):void  {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    throw new AppError('Missing session token / is the user authenticated?', 403)
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
    throw new AppError('Wrong token, are you a hacker?', 403)
  }

}

export default ensureAuthenticated;
