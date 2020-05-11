import { TweetRepository } from '../../interfaces/repository/tweetRepository';
import { Tweet } from '../../domain/tweet';
import { TweetControllerRequest } from '../../interfaces/controllers/tweetController';

export type FollowerData = {
  user_id:string
  screen_name:string
}

export type FollowersUsecaseResponse = {
  followers: FollowerData[]
}

export type TweetsImageData = {
  text:string;
  created:string;
  mediaUrl:string[];
}

export type TweetsImageResponse = {
  TweetsImage:TweetsImageData[]
}

export type ImageUrlResponse = {
  urls:string[]
}

export type TweetServiceRequest = TweetControllerRequest;

export type TweetServiceResponse = {
  tweet:Tweet
}

export class TweetService {
  private tweetRepository:TweetRepository;
  constructor(_tweetRepository:TweetRepository){
    this.tweetRepository = _tweetRepository;
  }

  public async getAllFollowers():Promise<FollowersUsecaseResponse>{
    let result = await this.tweetRepository.getAllFollowers();
    const followers = result.map((e):FollowerData => ({
      user_id:e.getUserId(),
      screen_name:e.getScreenName()
    }));
    return { followers };
  }

  public async getTweetsImage(screenName:string){
    const tweets = await this.tweetRepository.getTweetsImage(screenName);
    const tweetsImage = tweets.map((e):TweetsImageData => ({
      text:e.getText(),
      created:e.getCreated(),
      mediaUrl:e.getMediaUrl()
    }));
    return { tweetsImage };
  }

  public async getAllImages(screenName:string){
    const urls = await this.tweetRepository.getAllImages(screenName);
    return { urls };
  }

  public async execTweet(req:TweetServiceRequest):Promise<TweetServiceResponse>{
    try{
      console.log(req.text);
      const tweet = await this.tweetRepository.execTweet(new Tweet("","",req.text,"",[]));
      return { tweet };
    }catch(e){
      throw e;
    }
  }
} 