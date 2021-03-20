export class User {
  private readonly id:number | undefined;
  private idStr:string | undefined;
  private name:string | undefined;
  private readonly screenName:string | undefined;
  private location:string | undefined;
  private url:string | undefined;
  private description:string | undefined;
  private followersCount:number | undefined;
  private friendsCount:number | undefined;
  private listedCount:number | undefined;
  private favouritesCount:number | undefined;
  private createdAt:string | undefined;
  private profileImageUrlHttps:string | undefined;

  constructor(_id: number | undefined, _idStr: string | undefined, _name: string | undefined, _screenName: string | undefined, _location: string | undefined,
              _url: string | undefined, _description: string | undefined, _followersCount: number | undefined, _friendsCount: number | undefined,
              _listedCount: number | undefined, _favouritesCount: number | undefined, _createdAt: string | undefined, _profileImageUrlHttps: string | undefined) {
    this.id = _id;
    this.idStr = _idStr;
    this.name = _name;
    this.screenName = _screenName;
    this.location = _location;
    this.url = _url;
    this.description = _description;
    this.followersCount = _followersCount;
    this.friendsCount = _friendsCount;
    this.listedCount = _listedCount;
    this.favouritesCount = _favouritesCount;
    this.createdAt = _createdAt;
    this.profileImageUrlHttps = _profileImageUrlHttps;
  }

  getId(){
    return this.id;
  }

  getScreenName(){
    return this.screenName;
  }
}
