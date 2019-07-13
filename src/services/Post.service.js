class PostService {
  static baseURL = 'http://localhost:8080';
  static headers = new Headers();

  static async getPost(type = null) {
    const response = await fetch(`${this.baseURL}/api/posts/${type || ''}`);
    const posts = await response.json();
    return posts;
  }

  static async deletePost(id) {
    const response = await fetch(`${this.baseURL}/api/posts/${id}`, {
      method: 'DELETE',
      headers: this.headers,
    });
    const posts = await response.json();
    return posts;
  }

  static async addPost(post) {
    const response = await fetch(`${this.baseURL}/api/posts`, {
      method: 'POST',
      body: post,
      headers: this.headers,
    });
    const posts = await response.json();
    return posts;
  }
}

export default PostService;
