import { UserRepository } from '../../interfaces/repository/userRepository';

export type FollowerData = {
  user_id:string
  screen_name:string
}

export type FollowersUsecaseResponse = {
  followers: FollowerData[]
}

export type TweetsImageData = {
  text:string;
  created:string;
  mediaUrl:string[];
}

export type TweetsImageResponse = {
  TweetsImage:TweetsImageData[]
}

export type ImageUrlResponse = {
  urls:string[]
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

  public async getTweetsImage(screenName:string){
    const tweets = await this.userRepository.getTweetsImage(screenName);
    const tweetsImage = tweets.map((e):TweetsImageData => ({
      text:e.getText(),
      created:e.getCreated(),
      mediaUrl:e.getMediaUrl()
    }));
    return { tweetsImage };
  }

  public async getAllImages(screenName:string){
    const urls = await this.userRepository.getAllImages(screenName);
    return { urls };
  }
} 