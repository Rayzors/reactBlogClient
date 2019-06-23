class PostService {
  static async getPost(type = null) {
    const response = await fetch(
      `http://localhost:8080/api/posts/${type || ''}`
    );
    const posts = await response.json();
    return posts;
  }
}

export default PostService;
