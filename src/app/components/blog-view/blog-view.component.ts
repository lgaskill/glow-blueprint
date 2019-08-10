import { Component } from "@angular/core";
import { BlogService } from "src/app/services/blog.service";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: "blog-view",
  templateUrl: "./blog-view.component.html",
  styleUrls: ["./blog-view.component.scss"]
})
export class BlogViewComponent {
  categories: string[] = [];
  category: string = "";

  constructor(
    private blogService: BlogService,
    private activatedRoute: ActivatedRoute
  ) {}

  async ngOnInit() {
    const category = this.activatedRoute.snapshot.queryParams["category"];
    if (category) {
      this.category = category;
    }

    this.categories = await this.blogService.getCategories();
  }
}
