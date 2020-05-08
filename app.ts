import config from 'config';

import {Express} from './infra/express/server'

import {ApiHandler} from './infra/api/handler/apiHandler';
import {UserRepository} from './interfaces/repository/userRepository';
import {UserService} from './usecase/service/userService';
import {UserController} from './interfaces/controllers/userController';

const tweetConfig = config.get("tweetConfig");
const apiHandler = new ApiHandler(tweetConfig);
const userRepository = new UserRepository(apiHandler);
const userServive = new UserService(userRepository);
const controllers = {
  user: new UserController(userServive)
}

const express = new Express(3000,controllers);
express.run();