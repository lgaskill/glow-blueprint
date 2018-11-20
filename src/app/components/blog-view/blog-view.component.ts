import { Component } from "@angular/core";
import { BlogService } from "src/app/services/blog.service";

@Component({
  selector: "blog-view",
  templateUrl: "./blog-view.component.html",
  styleUrls: ["./blog-view.component.scss"]
})
export class BlogViewComponent {
  constructor(private blogService: BlogService) {}

  async ngOnInit() {
    let blogPosts: BlogPost[];
    try {
      blogPosts = await this.blogService.getAllBlogPosts();
    } catch (err) {
      console.error("Failed to fetch blog posts ", err);
    }

    console.log("Get BP's response:", blogPosts);
  }
}
