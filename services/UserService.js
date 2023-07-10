import DevagramApiService from "./DevagramApiService";

export default class UserService extends DevagramApiService {
  async login(credentials) {
    const { data } = await this.post("/login", credentials);

    localStorage.setItem("name", data.name);
    localStorage.setItem("email", data.email);
    localStorage.setItem("token", data.token);

    const user = await this.get("/user");
    
    localStorage.setItem("id", user.data._id);

    if (user.data.avatar) {      
      localStorage.setItem("avatar", user.data.avatar);
    }
  }

  async logout(){
    localStorage.removeItem("name");
    localStorage.removeItem("email");
    localStorage.removeItem("token");
    localStorage.removeItem("id");
    localStorage.removeItem("avatar");
  }

  async create(data) {
    return this.post("/create", data);
  }

  async updateUser(data){
    return this.put(`/user`,data)
  }

  async search(searchParameter) {
    return this.get("/search?filter=" + searchParameter);
  }

  async getUserProfile(userId){
    return this.get("/search?id=" + userId);
  }

  async toggleFollow(userId){
    return this.put(`/follow?id=${userId}`)
  }

  isAuthenticated() {
    return localStorage.getItem("token") !== null;
  }

  getUserLoggedInfo() {
    return {
      id: localStorage.getItem("id"),
      name: localStorage.getItem("name"),
      email: localStorage.getItem("email"),
      avatar: localStorage.getItem("avatar"),
    };
  }

  
}
