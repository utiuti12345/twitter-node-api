import Twitter from "twitter";
import {Tweet} from "../../domain/tweet";
import {Follower, UserTimeLine} from "../../interfaces/repository/tweetRepository";
import {
    TwitterFollowerResponse,
    TwitterReTweetResponse,
    TwitterTweetResponse, TwitterUserResponse
} from "../tweet/twitterResponse";
import Long from "long";

export default class TwitterClient {
    private readonly searchLimit:number;
    private readonly friendsCount:number;
    private client: Twitter;

    constructor(config: any) {
        this.client = new Twitter({
            consumer_key: config.consumer_key,
            consumer_secret: config.consumer_secret,
            access_token_key: config.access_token_key,
            access_token_secret: config.access_token_secret
        });

        this.searchLimit = config.search_limit;
        this.friendsCount = config.friends_count;
    }

    public async postReTweet(id: string): Promise<TwitterTweetResponse> {
        try{
            console.log(id);
            const params = {
                id: id
            };
            const tweet = await this.client.post('statuses/retweet',params);
            console.log(tweet);
            return {
                id:tweet.id,
                id_str:tweet.id_str,
                text:tweet.text,
                user:{
                    id:tweet.user?.id,
                    id_str:tweet.user?.id_str,
                    name:tweet.user?.name,
                    screen_name:tweet.user?.screen_name,
                    location:tweet.user?.location,
                    url:tweet.user?.url,
                    description:tweet.user?.description,
                    followers_count:tweet.user?.followers_count,
                    friends_count:tweet.user?.friends_count,
                    listed_count:tweet.user?.listed_count,
                    favourites_count:tweet.user?.favourites_count,
                    created_at:tweet.user?.created_at,
                    profile_image_url_https:tweet.user?.profile_image_url_https,
                },
                favorite_count:tweet.favorite_count,
                retweet_count:tweet.retweet_count,
                favorited:tweet.favorited,
                retweeted:tweet.retweeted
            };
        }catch(e){
            console.log(e);
            throw e;
        }
    }

    public async postTweet(text: string): Promise<TwitterTweetResponse> {
        try{
            console.log(text);
            const status = {
                status:text,
            };
            const tweet = await this.client.post('statuses/update', status);
            console.log(tweet);
            return {
                id:tweet.id,
                id_str:tweet.id_str,
                text:tweet.text,
                user:{
                    id:tweet.user?.id,
                    id_str:tweet.user?.id_str,
                    name:tweet.user?.name,
                    screen_name:tweet.user?.screen_name,
                    location:tweet.user?.location,
                    url:tweet.user?.url,
                    description:tweet.user?.description,
                    followers_count:tweet.user?.followers_count,
                    friends_count:tweet.user?.friends_count,
                    listed_count:tweet.user?.listed_count,
                    favourites_count:tweet.user?.favourites_count,
                    created_at:tweet.user?.created_at,
                    profile_image_url_https:tweet.user?.profile_image_url_https,
                },
                favorite_count:tweet.favorite_count,
                retweet_count:tweet.retweet_count,
                favorited:tweet.favorited,
                retweeted:tweet.retweeted
            };
        }catch(e){
            console.log(e);
            throw e;
        }
    }

    public async searchTweet(query:string): Promise<TwitterTweetResponse[]> {
        try{
            const params = {
                q:query,
                count:this.searchLimit,
            };
            const response = await this.client.get('search/tweets', params);
            console.log(response);

            let twitterSearchResponse:TwitterTweetResponse[] = [];
            const tweets:TwitterTweetResponse[] = response.statuses;
            tweets.map(tweet => {
                console.log(tweet);
                twitterSearchResponse.push({
                    id:tweet.id,
                    id_str:tweet.id_str,
                    text:tweet.text,
                    user:{
                        id:tweet.user?.id,
                        id_str:tweet.user?.id_str,
                        name:tweet.user?.name,
                        screen_name:tweet.user?.screen_name,
                        location:tweet.user?.location,
                        url:tweet.user?.url,
                        description:tweet.user?.description,
                        followers_count:tweet.user?.followers_count,
                        friends_count:tweet.user?.friends_count,
                        listed_count:tweet.user?.listed_count,
                        favourites_count:tweet.user?.favourites_count,
                        created_at:tweet.user?.created_at,
                        profile_image_url_https:tweet.user?.profile_image_url_https,
                    },
                    favorite_count:tweet.favorite_count,
                    retweet_count:tweet.retweet_count,
                    favorited:tweet.favorited,
                    retweeted:tweet.retweeted,
                })
            });

            return twitterSearchResponse;
        }catch (e) {
            console.log(e);
            throw e;
        }
    }

    public async followUser(screenName:string):Promise<TwitterUserResponse>{
        try {
            const params = {
                screen_name:screenName
            };
            const user = await this.client.post('friendships/create',params);
            console.log(user);

            return {
                id:user?.id,
                id_str:user?.id_str,
                name:user?.name,
                screen_name:user?.screen_name,
                location:user?.location,
                url:user?.url,
                description:user?.description,
                followers_count:user?.followers_count,
                friends_count:user?.friends_count,
                listed_count:user?.listed_count,
                favourites_count:user?.favourites_count,
                created_at:user?.created_at,
                profile_image_url_https:user?.profile_image_url_https,
            };
        }catch (e) {
            console.log(e);
            throw e;
        }
    }

    public async unfollowUser(screenName:string):Promise<TwitterUserResponse>{
        try {
            const params = {
                screen_name:screenName
            };
            const user = await this.client.post('friendships/destroy',params);
            console.log(user);

            return {
                id:user?.id,
                id_str:user?.id_str,
                name:user?.name,
                screen_name:user?.screen_name,
                location:user?.location,
                url:user?.url,
                description:user?.description,
                followers_count:user?.followers_count,
                friends_count:user?.friends_count,
                listed_count:user?.listed_count,
                favourites_count:user?.favourites_count,
                created_at:user?.created_at,
                profile_image_url_https:user?.profile_image_url_https,
            };
        }catch (e) {
            console.log(e);
            throw e;
        }
    }

    public async getFriends():Promise<TwitterUserResponse[]>{
        try {
            const params = {count: this.friendsCount};
            const response = await this.client.get('friends/list',params);
            console.log(response.users.length);

            const users:TwitterUserResponse[] = response.users;

            return users.map(user => {
                return {
                    id:user?.id,
                    id_str:user?.id_str,
                    name:user?.name,
                    screen_name:user?.screen_name,
                    location:user?.location,
                    url:user?.url,
                    description:user?.description,
                    followers_count:user?.followers_count,
                    friends_count:user?.friends_count,
                    listed_count:user?.listed_count,
                    favourites_count:user?.favourites_count,
                    created_at:user?.created_at,
                    profile_image_url_https:user?.profile_image_url_https,
                };

            });
        }catch (e) {
            console.log(e);
            throw e;
        }
    }

    public async getFollowers():Promise<Follower[]>{
        var followers:Follower[] = [];
        console.log("0");
        const params = {q: ''};
        const followersData = await this.client.get('followers/list', params);
        if (followersData.length === 0) {
            return [];
        }
        for (var it in followersData.users){
            const follower = followersData.users[it];
            followers.push({userId:follower.id,screenName:follower.screen_name});
        }
        return followers;
    }

    public async findUserTimeLine(screenName:string):Promise<UserTimeLine[]>{
        var minId;
        var userTimeLines:UserTimeLine[] = [];
        // 最大 3200ツイートまでしか取得できないので、16*200で3200
        const LOOP:number = 16;
        for(var loop:number = 1; loop <= LOOP; loop++){
            // params 作り直し(本当はmax_idだけ書き換えたい)
            var params = {
                screen_name : screenName,
                count : 200,
                max_id : minId,
                exclude_replies : false,
                trim_user : true,
                include_rts : true
            };
            const data = await this.client.get('statuses/user_timeline', params);
            for(var i = 0; i < data.length; i++) {
                var d = data[i];
                var medias:string[] = [];
                if(d.extended_entities){
                    d.extended_entities.media.forEach((e: any) => {
                        medias.push(e.media_url);
                    });
                }

                userTimeLines.push({
                    id:d.id,
                    text:d.text,
                    created:d.created_at,
                    screenName:screenName,
                    medias:medias
                });
                var longId = Long.fromString(d.id_str);
                var longIdSub = longId.subtract(1);
                minId = longIdSub.toString();
            }
        }
        return userTimeLines;
    }
}
