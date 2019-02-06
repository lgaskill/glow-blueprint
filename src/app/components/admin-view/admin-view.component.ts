import { Component } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { ApiService } from "src/app/services/api.service";
import { BlogService } from "src/app/services/blog.service";

@Component({
  selector: "admin-view",
  templateUrl: "./admin-view.component.html",
  styleUrls: ["./admin-view.component.scss"]
})
export class AdminViewComponent {
  categories: String[] = [];
  form: FormGroup;

  constructor(
    private blogService: BlogService,
    private formBuilder: FormBuilder
  ) {}

  async ngOnInit() {
    this.form = this.formBuilder.group({
      category: ["", Validators.required],
      editor: [""],
      title: ["", Validators.required]
    });

    const blogPosts: BlogPost[] = await this.blogService.getAllBlogPosts();

    // Generate a list of unique categories
    this.categories = Array.from(new Set(blogPosts.map(bp => bp.category)));
  }

  onCreate() {
    // TODO
    console.log(this.form.controls.editor.value);
  }
}
