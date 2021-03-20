import {Tweet} from '../../domain/tweet';
import TweetClient from "../../infra/tweet/twitterClient";
import {User} from "../../domain/user";

export class TweetService {
    private tweetClient: TweetClient;

    constructor(tweetClient: TweetClient) {
        this.tweetClient = tweetClient;
    }

    public async postReTweet(id: string): Promise<Tweet> {
        try {
            console.log(id);
            const tweet = await this.tweetClient.postReTweet(id);
            const user = new User(
                tweet.user?.id,tweet.user?.id_str,tweet.user?.name,tweet.user?.screen_name, tweet.user?.location,tweet.user?.url,
                tweet.user?.description,tweet.user?.followers_count,tweet.user?.friends_count,tweet.user?.listed_count,tweet.user?.favourites_count,
                tweet.user?.created_at,tweet.user?.profile_image_url_https);
            return new Tweet(
                tweet.id,tweet.id_str,tweet.text,user,tweet.favorite_count,tweet.retweet_count,tweet.favorited,tweet.retweeted
            );
        } catch (e) {
            throw e;
        }
    }

    public async postTweet(text: string): Promise<Tweet> {
        try {
            console.log(text);
            const tweet = await this.tweetClient.postTweet(text);
            const user = new User(
                tweet.user?.id,tweet.user?.id_str,tweet.user?.name,tweet.user?.screen_name, tweet.user?.location,tweet.user?.url,
                tweet.user?.description,tweet.user?.followers_count,tweet.user?.friends_count,tweet.user?.listed_count,tweet.user?.favourites_count,
                tweet.user?.created_at,tweet.user?.profile_image_url_https);
            return new Tweet(
                tweet.id,tweet.id_str,tweet.text,user,tweet.favorite_count,tweet.retweet_count,tweet.favorited,tweet.retweeted
            );
        } catch (e) {
            console.log(e);
            throw e;
        }
    }

    public async searchTweet(query: string): Promise<Tweet[]> {
        try {
            console.log(query);

            const tweetResponses = await this.tweetClient.searchTweet(query);
            const tweets = tweetResponses.map(tweet => {
                const user = new User(
                    tweet.user?.id,tweet.user?.id_str,tweet.user?.name,tweet.user?.screen_name, tweet.user?.location,tweet.user?.url,
                    tweet.user?.description,tweet.user?.followers_count,tweet.user?.friends_count,tweet.user?.listed_count,tweet.user?.favourites_count,
                    tweet.user?.created_at,tweet.user?.profile_image_url_https);
                return new Tweet(
                    tweet.id,tweet.id_str,tweet.text,user,tweet.favorite_count,tweet.retweet_count,tweet.favorited,tweet.retweeted
                )
            });
            return tweets;
        } catch (e) {
            console.log(e);
            throw e;
        }
    }

    public async geyFriends():Promise<User[]>{
        try{
            const tweetUserResponse = await this.tweetClient.getFriends();
            return tweetUserResponse.map(user => {
                return  new User(
                    user?.id,user?.id_str,user?.name,user?.screen_name, user?.location,user?.url,
                    user?.description,user?.followers_count,user?.friends_count,user?.listed_count,user?.favourites_count,
                    user?.created_at,user?.profile_image_url_https);
            });
        }catch (e) {
            console.log(e);
            throw e;
        }
    }

    public async participatePrizeCompetition(query: string): Promise<Tweet[]> {
        try {
            console.log(query);

            const tweetResponses = await this.tweetClient.searchTweet(query);
            const tweets = tweetResponses.map(tweet => {
                const user = new User(
                    tweet.user?.id,tweet.user?.id_str,tweet.user?.name,tweet.user?.screen_name, tweet.user?.location,tweet.user?.url,
                    tweet.user?.description,tweet.user?.followers_count,tweet.user?.friends_count,tweet.user?.listed_count,tweet.user?.favourites_count,
                    tweet.user?.created_at,tweet.user?.profile_image_url_https);
                return new Tweet(
                    tweet.id,tweet.id_str,tweet.text,user,tweet.favorite_count,tweet.retweet_count,tweet.favorited,tweet.retweeted
                )
            });
            const retweets = tweets.map(async tweet => {
                return await this.tweetClient.postReTweet(tweet.getidStr());
            });
            return tweets;
        } catch (e) {
            console.log(e);
            throw e;
        }
    }
}
