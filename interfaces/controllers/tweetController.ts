import {
  FollowersUsecaseResponse,
  ImageUrlResponse,
  TweetServiceResponse,
  TweetsImageResponse,
  UserService
} from '../../usecase/service/userService';
import {TweetService} from '../../usecase/service/tweetService';

export type FollowersControllerResponse = FollowersUsecaseResponse
export type TweetsImageConstrollerResponse = TweetsImageResponse
export type ImageConstrollerResponse = ImageUrlResponse

export type TweetControllerReTweetRequest = {
  id:string,
}

export type TweetControllerTweetRequest = {
  text:string,
}

export type TweetControlerResponse = TweetServiceResponse;

export class TweetController {
  private userService:UserService;
  private tweetService:TweetService;
  constructor(_userService:UserService,_tweetService:TweetService){
    this.userService = _userService;
    this.tweetService = _tweetService;
  }

  public async getAllFollowers():Promise<FollowersControllerResponse>{
    const res = await this.userService.getAllFollowers();
    console.log(res);
    return res;
  }

  public async getTweetsImage(screenName:string){
    return await this.userService.getTweetsImage(screenName);
  }

  public async getImages(screenName:string){
    return await this.userService.getAllImages(screenName);
  }

  public async postReTweet(request:TweetControllerReTweetRequest):Promise<TweetControlerResponse>{
    try{
      console.log(request.id);
      return await this.tweetService.postReTweet(request);
    }catch(e){
      throw e;
    }
  }

  public async postTweet(request:TweetControllerTweetRequest):Promise<TweetControlerResponse>{
    try{
      console.log(request.text);
      return await this.tweetService.postTweet(request);
    }catch(e){
      throw e;
    }
  }
}
