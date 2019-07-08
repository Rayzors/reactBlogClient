class PostService {
  static baseURL = 'http://localhost:8080';

  static async getPost(type = null) {
    const response = await fetch(`${this.baseURL}/api/posts/${type || ''}`);
    const posts = await response.json();
    return posts;
  }

  static async deletePost(id) {
    const response = await fetch(`${this.baseURL}/api/posts/${id}`, {
      method: 'DELETE',
    });
    const posts = await response.json();
    return posts;
  }

  static async addPost(post) {
    const response = await fetch(`${this.baseURL}/api/posts`, {
      method: 'POST',
      body: post,
    });
    const posts = await response.json();
    return posts;
  }
}

export default PostService;
