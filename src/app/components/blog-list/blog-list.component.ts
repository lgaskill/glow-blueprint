import { Component } from "@angular/core";
import { BlogService } from "src/app/services/blog.service";

@Component({
  selector: "blog-list",
  templateUrl: "./blog-list.component.html",
  styleUrls: ["./blog-list.component.scss"]
})
export class BlogListComponent {
  blogPosts: BlogPost[];
  constructor(private blogService: BlogService) {}

  async ngOnInit() {
    try {
      this.blogPosts = await this.blogService.getAllBlogPosts();

      // Sort by create date
      this.blogPosts = this.blogPosts.sort((a, b) => {
        return b.createdAt.getMilliseconds() - a.createdAt.getMilliseconds();
      });
    } catch (err) {
      console.error("Failed to fetch blog posts ", err);
    }
  }
}
