import { Component } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { BlogService } from "src/app/services/blog.service";

@Component({
  selector: "blog-post-view",
  templateUrl: "./blog-post-view.component.html",
  styleUrls: ["./blog-post-view.component.scss"]
})
export class BlogPostViewComponent {
  blogPostId: string = null;
  blogPost: BlogPost = null;

  constructor(
    private route: ActivatedRoute,
    private blogService: BlogService
  ) {}

  async ngOnInit() {
    // TODO: How's this going to hold-up when navigating between posts?

    this.blogPostId = this.route.snapshot.paramMap.get("id");
    if (!this.blogPostId) {
      return;
    }

    this.blogPost = await this.blogService.getBlogPostById(this.blogPostId);
  }
}
