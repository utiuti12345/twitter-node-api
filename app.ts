import config from 'config';

import {Express} from './infra/express/server'

import {TweetService} from './usecase/service/tweetService';
import {TweetController} from './interfaces/controllers/tweetController';
import TwitterClient from "./infra/tweet/twitterClient";

const tweetConfig = config.get("tweetConfig");
const twitterClient = new TwitterClient(tweetConfig);
const tweetService = new TweetService(twitterClient);
const controllers = {
  tweet: new TweetController(tweetService)
};

const express = new Express(3000,controllers);
express.run();
