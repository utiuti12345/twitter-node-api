import { ApiHandler } from '../../infra/api/handler/apiHandler';
import { User } from '../../domain/user';

export interface Follower {
  userId:string
  screenName:string
}

export class UserRepository{
  private apiHandler: ApiHandler;

  public constructor(_apiHandler: ApiHandler) {
    this.apiHandler = _apiHandler
  }

  public async getAllFollowers():Promise<User[]>{
    const res = await this.apiHandler.findAll();
    const followers = res.map((i) => new User(i.userId,i.screenName));
    return followers;
  }
}