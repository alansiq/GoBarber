import { Router } from 'express';

import { getCustomRepository } from 'typeorm';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';
import multer from 'multer';
import uploadConfig from '../config/upload';

import UsersRepository from '../repositories/UsersRepository';
import CreateUserService from '../services/CreateUserService';
import UpdateUserAvatarService from '../services/UpdateUserAvatarService';

const usersRouter = Router();
const upload = multer(uploadConfig);



// List registered users
usersRouter.get('/', async (request, response) => {
  const usersRepository = getCustomRepository(UsersRepository)
  const users = await usersRepository.find()

  return response.json(users);
})

// Register a new user
usersRouter.post('/', async (request, response) => {
  try {
    const { name, email, password } = request.body;
    const createUser = new CreateUserService();
    const user = await createUser.execute({ name, email, password })


    return response.json(user)

  } catch (err) {
    return response.status(400).json({error: err.message})
  }
})

// Update user's avatar img
usersRouter.patch('/avatar', ensureAuthenticated, upload.single('avatar'), async (request, response) => {
  try {
    const updateUserAvatar = new UpdateUserAvatarService();

    const user = await updateUserAvatar.execute({
      user_id: request.user.id,
      avatarFilename: request.file.filename,
    })

    return response.json(user);
  } catch (err) {
    return response.status(400).json({error: err.message});
  }
})

export default usersRouter;
