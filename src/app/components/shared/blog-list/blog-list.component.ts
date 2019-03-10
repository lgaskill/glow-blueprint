import { Component, HostListener } from "@angular/core";
import { BlogService } from "src/app/services/blog.service";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: "blog-list",
  templateUrl: "./blog-list.component.html",
  styleUrls: ["./blog-list.component.scss"]
})
export class BlogListComponent {
  blogPosts: BlogPost[];
  COLUMN_MAX_WIDTH: number = 400;
  columns: number[] = [];

  constructor(
    private blogService: BlogService,
    private activatedRoute: ActivatedRoute
  ) {
    this.onResize();
  }

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

  truncate(val: number): number {
    return Math.trunc(val);
  }

  @HostListener("window:resize", ["$event"])
  onResize() {
    const screenWidth = window.innerWidth;

    // Determine the number of columns based on the current window width
    this.columns = Array(
      this.truncate(screenWidth / this.COLUMN_MAX_WIDTH) + 1
    ).fill(true);
  }
}
