import { Injectable } from "@angular/core";
import { ApiService } from "./api.service";

@Injectable()
export class BlogService {
  constructor(private apiService: ApiService) {}

  async getAllBlogPosts(category?: string): Promise<BlogPost[]> {
    const blogPosts: BlogPost[] = await this.apiService.get<BlogPost[]>(
      "/blog_post" + (category ? `?category=${category}` : "")
    );

    if (!blogPosts) {
      return null;
    }

    for (const bp of blogPosts) {
      this.formatBlogPost(bp);
    }
    return blogPosts;
  }

  async getCategories(): Promise<string[]> {
    return this.apiService.get<string[]>("/blog_post/categories");
  }

  async getBlogPostById(blogPostID: string): Promise<BlogPost> {
    return this.apiService.get<BlogPost>(`/blog_post/${blogPostID}`);
  }

  async createBlogPost(blogPost: BlogPost): Promise<BlogPost> {
    return this.apiService.post<BlogPost>("/blog_post", blogPost);
  }

  async updateBlogPost(blogPostID: string, patchObj: any): Promise<BlogPost> {
    return this.apiService.patch<BlogPost>(
      `/blog_post/${blogPostID}`,
      patchObj
    );
  }

  private formatBlogPost(blogPost: BlogPost) {
    blogPost.createdAt = blogPost.createdAt
      ? new Date(blogPost.createdAt)
      : null;
    blogPost.lastUpdatedAt = blogPost.lastUpdatedAt
      ? new Date(blogPost.lastUpdatedAt)
      : null;
  }
}
