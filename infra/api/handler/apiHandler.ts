import Twitter from 'twitter';
import { Follower } from '../../../interfaces/repository/userRepository'

export class ApiHandler {
  private client:Twitter;
  constructor(){
    this.client = new Twitter({
      consumer_key: "",
      consumer_secret: "",
      access_token_key: "",
      access_token_secret: ""
    });
  }

  async findAll():Promise<Follower[]>{
    var followers:Follower[] = [];
    console.log("0");
    const params = {q: ''};
    const followersData = await this.client.get('followers/list', params);
    // , (error, data, response) => {
    //   if(error) throw error;
    //   //console.log(followers);  // The favorites.
    //   //console.log(response);  // Raw response object.
    //   var count = 0;
    //   console.log("1");
    for (var it in followersData.users){
        const follower = followersData.users[it];
        followers.push({userId:follower.id,screenName:follower.screen_name});
    }
    return followers;
  }
}