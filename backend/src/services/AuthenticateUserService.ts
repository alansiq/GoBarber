import { getRepository } from 'typeorm';
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';

import authConfig from '../config/auth';
import User from '../models/User';

interface Request {
  email: string;
  password: string;
}

interface Response {
  user: User,
  token: string,
}

class AuthenticateUserService {
  public async execute ({email, password}: Request): Promise<Response> {
    const usersRepository = getRepository(User);

    const user = await usersRepository.findOne({ where: { email } });

    if (!user) {
      throw new Error('Email not found. Have you typed in the correct address?');
    }

    const passwordMatched = await compare(password, user.password)

    if (!passwordMatched) {
      throw new Error('Wrong email / password combination');
    }

    const { secret, expiresIn } = authConfig.jwt

    const token = sign({ }, secret, {
      subject: user.id,
      expiresIn: expiresIn,

    });

    return {
      user,
      token,
    };
  }
}

export default AuthenticateUserService;
