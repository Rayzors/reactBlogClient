class PostService {
  static async getPost(type = null) {
    const response = await fetch(
      `http://localhost:8080/api/posts/${type || ''}`
    );
    const posts = await response.json();
    return posts;
  }

  static async deletePost(id) {
    const response = await fetch(`http://localhost:8080/api/posts/${id}`, {
      method: 'DELETE',
    });
    const posts = await response.json();
    return posts;
  }
}

export default PostService;
