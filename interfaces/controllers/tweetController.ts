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
      const retweet = await this.tweetService.postReTweet(request.id);
      return {
        id:retweet.getId(),
        text:retweet.getText(),
      }
    }catch(e){
      throw e;
    }
  }

  public async postTweet(request:TweetTweetRequest):Promise<TweetResponse>{
    try{
      console.log(request.text);
      const tweet =  await this.tweetService.postTweet(request.text);
      return {
        id:tweet.getId(),
        text:tweet.getText(),
      }
    }catch(e){
      throw e;
    }
  }

  public async searchTweet(request:TweetSearchTweetRequest):Promise<TweetResponse[]>{
    try{
      console.log(request.query);
      const results = await this.tweetService.searchTweet(request.query);
      const tweetResponse = results.map(result => {
        return {
          id:result.getId(),
          text:result.getText(),
        }
      });
      return tweetResponse;
    }catch(e){
      throw e;
    }
  }

  public async getFriends():Promise<TweetResponse>{
    try {
      const friends = await this.tweetService.geyFriends();
      return {
        id:0,
        text:"",
      }
    }catch (e) {
      throw e;
    }
  }

  public async participatePrizeCompetition(request:TweetSearchTweetRequest):Promise<TweetResponse[]>{
    try {
      console.log(request.query);
      const results = await this.tweetService.participatePrizeCompetition(request.query);
      return results.map(tweet => {
        return {
          id:tweet.getId(),
          text:tweet.getText(),
        }
      });
    }catch (e) {
      throw e;
    }
  }
}
