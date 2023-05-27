import HttpService from "./HttpService";

export default class FeedService extends HttpService{
    async loadPosts(userId){
        let url = '/feed';

        if(userId){
            url += `?id=${userId}`;
        }
        return this.get(url)
    }
}