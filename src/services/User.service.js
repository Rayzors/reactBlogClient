class UserService {
  static baseURL = 'http://localhost:8080';

  static async register(data) {
    const response = await fetch(`${this.baseURL}/api/user/register`, {
      method: 'POST',
      body: data,
    });
    const posts = await response.json();
    return posts;
  }

  static async login(data) {
    const response = await fetch(`${this.baseURL}/api/user/login`, {
      method: 'POST',
      body: data,
    });
    const posts = await response.json();
    return posts;
  }
}

export default UserService;
