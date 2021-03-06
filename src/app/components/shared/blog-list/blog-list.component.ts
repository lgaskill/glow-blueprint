import { Component, HostListener, Input, SimpleChanges } from "@angular/core";
import { BlogService } from "src/app/services/blog.service";

@Component({
  selector: "blog-list",
  templateUrl: "./blog-list.component.html",
  styleUrls: ["./blog-list.component.scss"]
})
export class BlogListComponent {
  @Input()
  category: string;

  @Input()
  searchTerm: string;

  blogPosts: BlogPost[];
  COLUMN_MAX_WIDTH: number = 400;
  columns: number[] = [];

  constructor(private blogService: BlogService) {
    this.onResize();
  }

  async ngOnInit() {
    this.loadBlogPosts();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (
      (changes.category && !changes.category.firstChange) ||
      (changes.searchTerm && !changes.searchTerm.firstChange)
    ) {
      this.loadBlogPosts();
    }
  }

  async loadBlogPosts() {
    try {
      this.blogPosts = await this.blogService.getAllBlogPosts(
        this.category,
        this.searchTerm
      );
    } catch (err) {
      console.error("Failed to fetch blog posts ", err);
    }
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
