interface TwitterReTweetResponse {
    statuses:any
}
interface TwitterTweetResponse {
    id:number,
    id_str:string,
    text:string,
    user:TwitterUserResponse | null,
    favorite_count:number,
    retweet_count:number,
    favorited:boolean,
    retweeted:boolean,
}
interface TwitterUserResponse{
    id:number | undefined,
    id_str:string | undefined,
    name:string | undefined,
    screen_name:string | undefined,
    location:string | undefined,
    url:string | undefined,
    description:string | undefined,
    followers_count:number | undefined,
    friends_count:number | undefined,
    listed_count:number | undefined,
    favourites_count:number | undefined,
    created_at:string | undefined,
    profile_image_url_https:string | undefined,
}
interface TwitterFollowerResponse {
    statuses:any
}

export {TwitterReTweetResponse,TwitterTweetResponse,TwitterFollowerResponse,TwitterUserResponse};
