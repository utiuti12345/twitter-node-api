import {User} from "./user";

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

  getId(){
    return this.id;
  }

  getidStr(){
    return this.idStr;
  }

  getText(){
    return this.text;
  }
}
