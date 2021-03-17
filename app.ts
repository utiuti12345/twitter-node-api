import config from 'config';

import {Express} from './infra/express/server'

import {ApiHandler} from './infra/api/handler/apiHandler';
import {TweetRepository} from './interfaces/repository/tweetRepository';
import {UserService} from './usecase/service/userService';
import {TweetService} from './usecase/service/tweetService';
import {TweetController} from './interfaces/controllers/tweetController';
import TwitterClient from "./infra/tweet/twitterClient";

const tweetConfig = config.get("tweetConfig");
const twitterClient = new TwitterClient(tweetConfig);
const apiHandler = new ApiHandler(tweetConfig);
const tweetRepository = new TweetRepository(apiHandler);
const userService = new UserService(tweetRepository);
const tweetService = new TweetService(twitterClient);
const controllers = {
  tweet: new TweetController(userService,tweetService)
};

const express = new Express(3000,controllers);
express.run();
