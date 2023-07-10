import DevagramApiService from "./DevagramApiService";

export default class FeedService extends DevagramApiService{
    async loadPosts(userId){
        let url = '/feed';

        if(userId){
            url += `?id=${userId}`;
        }
        return this.get(url);
    }

    async addComment(postId, comment){
        return this.put(`/comment?id=${postId}`,{comment});
    }

    async like(postId){
        return this.put(`/like?id=${postId}`);
    }

    async addPost(payload){
        return this.post(`/publication`, payload);
    }
}