import Twitter from "twitter";
import {Tweet} from "../../domain/tweet";
import {Follower, UserTimeLine} from "../../interfaces/repository/tweetRepository";
import Long from "long";

export default class TwitterClient {
    private readonly limit:number;
    private client: Twitter;

    constructor(config: any) {
        this.client = new Twitter({
            consumer_key: config.consumer_key,
            consumer_secret: config.consumer_secret,
            access_token_key: config.access_token_key,
            access_token_secret: config.access_token_secret
        });

        this.limit = config.search_limit;
    }

    public async postReTweet(id: string): Promise<TwitterReTweetResponse> {
        try{
            console.log(id);
            const params = {
                id:id,
            };
            const data = await this.client.post('statuses/retweet/',params);
            console.log(data);
            return {statuses:data};
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
            const data = await this.client.post('statuses/update', status);
            console.log(data);
            return {statuses:data};
        }catch(e){
            console.log(e);
            throw e;
        }
    }

    public async searchTweet(query:string): Promise<TwitterSearchResponse> {
        try{
            const params = {
                q:query,
                count:this.limit,
            };
            const data = await this.client.get('search/tweets', params);
            console.log(data);

            return {statuses:data.statuses};
        }catch (e) {
            console.log(e);
            throw e;
        }
    }

    public async findFollowers():Promise<Follower[]>{
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
