import { Component } from "@angular/core";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: "blog-post-view",
  templateUrl: "./blog-post-view.component.html",
  styleUrls: ["./blog-post-view.component.scss"]
})
export class BlogPostViewComponent {
  blogPostId: string = null;
  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    // TODO: How's this going to hold-up to navigating between posts?
    this.blogPostId = this.route.snapshot.paramMap.get("id");

    // TODO: Get blog post by id
  }
}
