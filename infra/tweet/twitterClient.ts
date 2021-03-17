import Twitter from "twitter";
import {Tweet} from "../../domain/tweet";

export default class TwitterClient {
    private client: Twitter;

    constructor(config: any) {
        this.client = new Twitter({
            consumer_key: config.consumer_key,
            consumer_secret: config.consumer_secret,
            access_token_key: config.access_token_key,
            access_token_secret: config.access_token_secret
        });
    }

    public async postReTweet(id: string): Promise<Tweet> {
        try{
            console.log(id);
            const data = await this.client.post('statuses/retweet/'+id+'.json');
            console.log(data);
            return new Tweet(data.id, data.user.name, data.user.screen_name, data.text, data.created_at, [])
        }catch(e){
            console.log(e);
            throw e;
        }
    }

    public async postTweet(text: string): Promise<Tweet> {
        try{
            console.log(text);
            const status = {
                status:text,
            };
            const data = await this.client.post('statuses/update', status);
            console.log(data);
            return new Tweet(data.id, data.user.name, data.user.screen_name, data.text, data.created_at, [])
        }catch(e){
            console.log(e);
            throw e;
        }
    }
}
