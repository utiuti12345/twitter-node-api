import { TweetService,FollowersUsecaseResponse,TweetServiceResponse,ImageUrlResponse,TweetsImageResponse } from '../../usecase/service/userService';

export type FollowersControllerResponse = FollowersUsecaseResponse
export type TweetsImageConstrollerResponse = TweetsImageResponse
export type ImageConstrollerResponse = ImageUrlResponse

export type TweetControllerRequest = {
  text:string,
}

export type TweetControlerResponse = TweetServiceResponse;

export class TweetController {
  private tweetService:TweetService;
  constructor(_tweetService:TweetService){
    this.tweetService = _tweetService;
  }

  public async getAllFollowers():Promise<FollowersControllerResponse>{
    const res = await this.tweetService.getAllFollowers();
    console.log(res);
    return res;
  }

  public async getTweetsImage(screenName:string){
    return await this.tweetService.getTweetsImage(screenName);
  }

  public async getImages(screenName:string){
    return await this.tweetService.getAllImages(screenName);
  }

  public async execTweet(request:TweetControllerRequest):Promise<TweetControlerResponse>{
    try{
      console.log(request.text);
      return await this.tweetService.execTweet(request);
    }catch(e){
      throw e;
    }
  }
}