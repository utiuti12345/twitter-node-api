import { UserService,FollowersUsecaseResponse,ImageUrlResponse,TweetsImageResponse } from '../../usecase/service/userService';

export type FollowersControllerResponse = FollowersUsecaseResponse
export type TweetsImageConstrollerResponse = TweetsImageResponse
export type ImageConstrollerResponse = ImageUrlResponse

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

  public async getTweetsImage(screenName:string){
    return await this.userService.getTweetsImage(screenName);
  }

  public async getImages(screenName:string){
    return await this.userService.getAllImages(screenName);
  }
}