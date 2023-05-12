import HttpService from "./HttpService";

export default class UserService extends HttpService {
  async login(user, password) {
    
  }

  async create(data) {
    
    return this.post("/create", data);
  }
}
