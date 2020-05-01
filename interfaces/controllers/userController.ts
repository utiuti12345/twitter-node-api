import { UserService,FollowersUsecaseResponse } from '../../usecase/service/userService';

export type FollowersControllerResponse = FollowersUsecaseResponse

export class UserController {
  private userService:UserService;
  constructor(_userService:UserService){
    this.userService = _userService;
  }

  public async getAllFollowers():Promise<FollowersControllerResponse>{
    const res = await this.userService.getAllFollowers();
    console.log(res);
    return res;
  }
}