import {TweetService} from '../../usecase/service/tweetService';
import {TweetReTweetRequest, TweetSearchTweetRequest, TweetTweetRequest} from "../request/request";
import {TweetResponse} from "../response/response";

export class TweetController {
  private tweetService:TweetService;
  constructor(_tweetService:TweetService){
    this.tweetService = _tweetService;
  }

  public async postReTweet(request:TweetReTweetRequest):Promise<TweetResponse>{
    try{
      console.log(request.id);
      return await this.tweetService.postReTweet(request.id);
    }catch(e){
      throw e;
    }
  }

  public async postTweet(request:TweetTweetRequest):Promise<TweetResponse>{
    try{
      console.log(request.text);
      return await this.tweetService.postTweet(request.text);
    }catch(e){
      throw e;
    }
  }

  public async searchTweet(request:TweetSearchTweetRequest):Promise<TweetResponse>{
    try{
      console.log(request.query);
      return await this.tweetService.searchTweet(request.query);
    }catch(e){
      throw e;
    }
  }
}
