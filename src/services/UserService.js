import HttpService from "./HttpService";

export default class UserService extends HttpService {
  async login(credentials) {
    const { data } = await this.post("/login", credentials);

    localStorage.setItem("name:", data.name);
    localStorage.setItem("email:", data.email);
    localStorage.setItem("token:", data.token);
    if (data.avatar) localStorage.setItem("avatar:", data.avatar);
    
  }

  async create(data) {
    return this.post("/create", data);
  }
}
