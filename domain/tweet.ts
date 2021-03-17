import {User} from "./user";

export class Tweet{
  private id:string;
  private user:User;
  private text:string;
  private created:Date;
  private mediaUrl:string[];

  constructor(_id:string,_name:string,_screenName:string,_text:string,_created:string,_mediaUrl:string[]){
    this.id = _id;
    this.user = new User(_name,_screenName);
    this.created = new Date(_created);
    this.text = _text;
    this.mediaUrl = _mediaUrl;
  }

  getText(){
    return this.text;
  }
  getCreated(){
    const year = this.created.getFullYear();
    const month = this.created.getMonth() + 1;
    const day = this.created.getDate();
    return year + "-" + month + "-" + day;
  }
  getMediaUrl(){
    return this.mediaUrl;
  }
}
