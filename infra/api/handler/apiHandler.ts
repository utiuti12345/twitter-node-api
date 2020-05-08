import Twitter from 'twitter';
import Long from "long";
import { Follower,UserTimeLine } from '../../../interfaces/repository/userRepository';

export class ApiHandler {
  private client:Twitter;
  constructor(config:any){
    this.client = new Twitter({
      consumer_key: config.consumer_key,
      consumer_secret: config.consumer_secret,
      access_token_key: config.access_token_key,
      access_token_secret: config.access_token_secret
    });
  }

  async findFollowers():Promise<Follower[]>{
    var followers:Follower[] = [];
    console.log("0");
    const params = {q: ''};
    const followersData = await this.client.get('followers/list', params);
    if (followersData.length === 0) {
			return [];
		}
    for (var it in followersData.users){
        const follower = followersData.users[it];
        followers.push({userId:follower.id,screenName:follower.screen_name});
    }
    return followers;
  }

  async findUserTimeLine(screenName:string):Promise<UserTimeLine[]>{
    var minId;
    var userTimeLines:UserTimeLine[] = [];
    // 最大 3200ツイートまでしか取得できないので、16*200で3200
    const LOOP:number = 16;
    for(var loop:number = 1; loop <= LOOP; loop++){
      // params 作り直し(本当はmax_idだけ書き換えたい)
      var params = {
        screen_name : screenName,
        count : 200,
        max_id : minId,
        exclude_replies : false,
        trim_user : true,
        include_rts : true
      };
      const data = await this.client.get('statuses/user_timeline', params);
      for(var i = 0; i < data.length; i++) {
        var d = data[i];
        var medias:string[] = [];
        if(d.extended_entities){
          d.extended_entities.media.forEach((e: any) => {
            medias.push(e.media_url);
          });
        }

        userTimeLines.push({
          id:d.id,
          text:d.text,
          created:d.created_at,
          screenName:screenName,
          medias:medias
        });
        var longId = Long.fromString(d.id_str);
		    var longIdSub = longId.subtract(1);
        minId = longIdSub.toString();
      }
    }
    return userTimeLines;
  }
}