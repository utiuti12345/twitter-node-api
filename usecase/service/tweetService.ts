import {TweetRepository, UserTimeLine} from '../../interfaces/repository/tweetRepository';
import {Tweet} from '../../domain/tweet';
import {
    TweetControllerReTweetRequest, TweetControllerSearchTweetRequest,
    TweetControllerTweetRequest
} from '../../interfaces/controllers/tweetController';
import TweetClient from "../../infra/tweet/twitterClient";

export type TweetServiceReTweetRequest = TweetControllerReTweetRequest;

export type TweetServiceTweetRequest = TweetControllerTweetRequest;

export type TweetServiceSearchTweetRequest = TweetControllerSearchTweetRequest;

export type TweetServiceResponse = {
    tweet: Tweet | null
}

export class TweetService {
    private tweetClient: TweetClient;

    constructor(tweetClient: TweetClient) {
        this.tweetClient = tweetClient;
    }

    public async postReTweet(req: TweetServiceReTweetRequest): Promise<TweetServiceResponse> {
        try {
            console.log(req.id);
            const tweet = await this.tweetClient.postReTweet(req.id);
            return {
                tweet: tweet,
            };
        } catch (e) {
            throw e;
        }
    }

    public async postTweet(req: TweetServiceTweetRequest): Promise<TweetServiceResponse> {
        try {
            console.log(req.text);
            const tweet = await this.tweetClient.postTweet(req.text);
            return {
                tweet: tweet
            };
        } catch (e) {
            console.log(e);
            throw e;
        }
    }

    public async searchTweet(req: TweetServiceSearchTweetRequest): Promise<TweetServiceResponse> {
        try {
            console.log(req.query);
            const tweet = await this.tweetClient.searchTweet(req.query);
            return {
                tweet: tweet
            };
        } catch (e) {
            console.log(e);
            throw e;
        }
    }
}
