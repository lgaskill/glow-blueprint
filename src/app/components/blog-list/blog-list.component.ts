import { Component } from "@angular/core";
import { BlogService } from "src/app/services/blog.service";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: "blog-list",
  templateUrl: "./blog-list.component.html",
  styleUrls: ["./blog-list.component.scss"]
})
export class BlogListComponent {
  blogPosts: BlogPost[];
  constructor(
    private blogService: BlogService,
    private activatedRoute: ActivatedRoute
  ) {}

  async ngOnInit() {
    // Determine if posts should be filtered by category
    const category = this.activatedRoute.snapshot.queryParams["category"];

    try {
      this.blogPosts = await this.blogService.getAllBlogPosts(category);
    } catch (err) {
      console.error("Failed to fetch blog posts ", err);
    }

    // Sort by create date
    this.blogPosts = this.blogPosts.sort((a, b) => {
      return b.createdAt.getMilliseconds() - a.createdAt.getMilliseconds();
    });
  }
}
