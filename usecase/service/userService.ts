import { UserRepository } from '../../interfaces/repository/userRepository';

export type FollowerData = {
  user_id:string
  screen_name:string
}

export type FollowersUsecaseResponse = {
  followers: FollowerData[]
}

export class UserService {
  private userRepository:UserRepository;
  constructor(_userRepository:UserRepository){
    this.userRepository = _userRepository;
  }

  public async getAllFollowers():Promise<FollowersUsecaseResponse>{
    let result = await this.userRepository.getAllFollowers();
    const followers = result.map((e):FollowerData => ({
      user_id:e.getUserId(),
      screen_name:e.getScreenName()
    }));
    return { followers };
  }
} 