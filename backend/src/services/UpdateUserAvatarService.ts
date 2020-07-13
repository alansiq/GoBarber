import User from '../models/User';
import { getRepository } from 'typeorm';
import uploadConfig from '../config/upload'
import path from 'path';
import fs from 'fs';

interface Request {
  user_id: string;
  avatarFilename: string;
}

class UpdateUserAvatarService {
  public async execute({ user_id, avatarFilename }: Request): Promise<User> {
    const userRepository = getRepository(User);
    const user = await userRepository.findOne(user_id);

    // Validação: Encontrou um usuário?
    if (!user) {
      throw new Error('You have to be authenticated to change avatar, dude!');
    }

    // Validação: Já existe um avatar nesse usuário?
    if (user.avatar) {
      // Cria um caminho com o nome do arquivo "avatar" e o diretório onde armazenamos as imagens
      const userAvatarFilePath = path.join(uploadConfig.directory, user.avatar);
      // Retorna o status do arquivo caso ele exista
      const userAvatarExists = await fs.promises.stat(userAvatarFilePath);

      if (userAvatarExists) {
        await fs.promises.unlink(userAvatarFilePath);
      }

    }

    user.avatar = avatarFilename;
    await userRepository.save(user);

    delete user.password;

    return user;
  }
}

export default UpdateUserAvatarService
