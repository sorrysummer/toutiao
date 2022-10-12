import { userLogin, verification, getUserInfo, getUserList, getUserData, changeUserData, changePhoto } from "./user";
import { newsRecommend, channelAllList, deleteChannel, changeChannel } from '@/api/article.js'
import { getSuggestion, searchResult } from './search'
import {
    newsDetail, followUser, cancelFollow,
    newsCollect,
    cancelCollect,
    goodJob,
    cancelGoodJob,
    getComment
} from "./news";

import { commentLike, cancelCommentLike, comments } from "./comment";
import { get } from "lodash";


export const userLoginApi = userLogin
export const verificationApi = verification
export const getUserInfoApi = getUserInfo
export const getUserListApi = getUserList
export const newsRecommendApi = newsRecommend
export const channelAllListApi = channelAllList
export const deleteChannelApi = deleteChannel
export const changeChannelApi = changeChannel
export const getSuggestionApi = getSuggestion
export const searchResultApi = searchResult
export const newsDetailApi = newsDetail
export const followUserApi = followUser
export const cancelFollowApi = cancelFollow
export const newsCollectApi = newsCollect
export const cancelCollectApi = cancelCollect
export const goodJobApi = goodJob
export const cancelGoodJobApi = cancelGoodJob
export const getCommentApi = getComment
export const commentLikeApi = commentLike
export const cancelCommentLikeApi = cancelCommentLike
export const commentsApi = comments
export const getUserDataApi = getUserData
export const changeUserDataApi = changeUserData
export const changePhotoApi = changePhoto