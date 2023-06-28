import HttpService from "./HttpService";

export default class UserService extends HttpService {
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

  async create(data) {
    return this.post("/create", data);
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
