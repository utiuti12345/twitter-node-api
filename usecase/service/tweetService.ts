import {TweetRepository, UserTimeLine} from '../../interfaces/repository/tweetRepository';
import {Tweet} from '../../domain/tweet';
import TweetClient from "../../infra/tweet/twitterClient";

export class TweetService {
    private tweetClient: TweetClient;

    constructor(tweetClient: TweetClient) {
        this.tweetClient = tweetClient;
    }

    public async postReTweet(id: string): Promise<Tweet> {
        try {
            console.log(id);
            const tweet = await this.tweetClient.postReTweet(id);
            return new Tweet(
                tweet.statuses.id,
                tweet.statuses.name,
                tweet.statuses.screenName,
                tweet.statuses.text,
                tweet.statuses.created,
                []);
        } catch (e) {
            throw e;
        }
    }

    public async postTweet(text: string): Promise<Tweet> {
        try {
            console.log(text);
            const tweet = await this.tweetClient.postTweet(text);
            return new Tweet(
                tweet.statuses.id,
                tweet.statuses.name,
                tweet.statuses.screenName,
                tweet.statuses.text,
                tweet.statuses.created,
                []);
        } catch (e) {
            console.log(e);
            throw e;
        }
    }

    public async searchTweet(query: string): Promise<Tweet> {
        try {
            console.log(query);
            const tweet = await this.tweetClient.searchTweet(query);
            return new Tweet(
                tweet.statuses.id,
                tweet.statuses.name,
                tweet.statuses.screenName,
                tweet.statuses.text,
                tweet.statuses.created,
                []);
        } catch (e) {
            console.log(e);
            throw e;
        }
    }

    public async participatePrizeCompetition(req: string) {

    }
}
