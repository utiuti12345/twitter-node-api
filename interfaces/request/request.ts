import {FollowersUsecaseResponse, ImageUrlResponse, TweetsImageResponse} from "../../usecase/service/userService";

export type TweetReTweetRequest = {
    id:string,
}

export type TweetTweetRequest = {
    text:string,
}

export type TweetSearchTweetRequest = {
    query:string
}

export type FollowersControllerResponse = FollowersUsecaseResponse
export type TweetsImageConstrollerResponse = TweetsImageResponse
export type ImageConstrollerResponse = ImageUrlResponse
