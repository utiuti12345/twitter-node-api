import config from 'config';

import {Express} from './infra/express/server'

import {ApiHandler} from './infra/api/handler/apiHandler';
import {TweetRepository} from './interfaces/repository/tweetRepository';
import {TweetService} from './usecase/service/userService';
import {TweetController} from './interfaces/controllers/tweetController';

const tweetConfig = config.get("tweetConfig");
const apiHandler = new ApiHandler(tweetConfig);
const tweetRepository = new TweetRepository(apiHandler);
const tweetServive = new TweetService(tweetRepository);
const controllers = {
  tweet: new TweetController(tweetServive)
}

const express = new Express(3000,controllers);
express.run();