import { ApiHandler } from '../../infra/api/handler/apiHandler';
import { User } from '../../domain/user';
import { Tweet } from '../../domain/tweet';

export interface Follower {
  userId:string
  screenName:string
}

export interface UserTimeLine {
  id:string
  text:string
  created:string
  screenName:string
  medias:string[]
}

export class TweetRepository{
  private apiHandler: ApiHandler;

  public constructor(_apiHandler: ApiHandler) {
    this.apiHandler = _apiHandler
  }

  public async getAllFollowers():Promise<User[]>{
    const res = await this.apiHandler.findFollowers();
    const followers = res.map((i) => new User(i.userId,i.screenName));
    return followers;
  }

  public async getTweetsImage(screenName:string){
    const userTimeLine = await this.apiHandler.findUserTimeLine("@"+screenName);
    var tweets:Tweet[] = [];
    userTimeLine
        .filter((medias) => medias.medias.length > 0)
        .map((tweet) => {
          tweets.push(new Tweet("","",screenName,tweet.text,tweet.created,tweet.medias));
        });
    return tweets;
  }

  public async getAllImages(screenName:string){
    const userTimeLine = await this.apiHandler.findUserTimeLine("@"+screenName);
    var urls:string[] = [];
    userTimeLine
        .filter((medias) => medias.medias.length > 0)
        .map((medias) => {
          medias.medias.map((media)=> {
            urls.push(media);
          })
        });
    return urls;
  }

  public async execTweet(tweet:Tweet):Promise<Tweet>{
    try{
      console.log(tweet.getText());
      const res = await this.apiHandler.execTweet(tweet.getText());
      return new Tweet("","",res.screenName,res.text,res.created,[]);
    }catch(e){
      throw e;
    }
  }
}
