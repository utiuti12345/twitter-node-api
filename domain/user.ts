export class User {
  private userId:string;
  private screenName:string;
  constructor(_userId:string,_screenName:string){
    this.userId = _userId;
    this.screenName = _screenName;
  }

  getUserId(){
    return this.userId;
  }

  getScreenName(){
    return this.screenName;
  }
}