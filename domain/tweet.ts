export class Tweet{
  private name:string;
  private screenName:string;
  private text:string;
  private created:Date;
  private mediaUrl:string[];
  constructor(_name:string,_screenName:string,_text:string,_created:string,_mediaUrl:string[]){
    this.name = _name;
    this.screenName = _screenName;
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