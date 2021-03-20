import {User} from "./user";
import {Constants} from "../constants/constants";
import EXPRESSION_FIND_FOLLOWERS = Constants.EXPRESSION_FIND_FOLLOWERS;

export class Tweet{
  private id:number;
  private idStr:string;
  private text:string;
  private user:User | null;
  private favoriteCount:number;
  private retweetCount:number;
  private favorited:boolean;
  private retweeted:boolean;

  constructor(_id:number,_idStr:string,_text:string,_user:User | null,
              _favoriteCount:number,_retweetCount:number,_favorited:boolean,_retweeted:boolean){
    this.id = _id;
    this.idStr = _idStr;
    this.text = _text;
    this.user = _user;
    this.favoriteCount = _favoriteCount;
    this.retweetCount = _retweetCount;
    this.favorited = _favorited;
    this.retweeted = _retweeted;
  }

  public getId(){
    return this.id;
  }

  public getidStr(){
    return this.idStr;
  }

  public getText(){
    return this.text;
  }

  public getUser(){
    return this.user;
  }

  // 投稿内から正規表現を使ってフォローするユーザーを取り出す
  public findFollowersByText():string[] | undefined {
    const followers = this.text.match(EXPRESSION_FIND_FOLLOWERS);
    return followers?.map(follower => {
      return follower.replace('@','');
    })
  }
}
