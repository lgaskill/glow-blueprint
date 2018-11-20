import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Constants } from "../config/constants";
import { environment } from "../../environments/environment";
import { ApiService } from "./api.service";

@Injectable()
export class BlogService {
  constructor(private apiService: ApiService) {}

  getAllBlogPosts(): Promise<BlogPost[]> {
    return this.apiService.get<BlogPost[]>("/blog_post");
  }

  getBlogPostById(blogPostID: string): Promise<BlogPost> {
    return this.apiService.get<BlogPost>(`/blog_post/${blogPostID}`);
  }

  createBlogPost(blogPost: BlogPost): Promise<BlogPost> {
    return this.apiService.post<BlogPost>("/blog_post", blogPost);
  }

  updateBlogPost(patchObj: any): Promise<BlogPost> {
    return this.apiService.patch<BlogPost>("/blog_post", patchObj);
  }
}
