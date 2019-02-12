import { Component, ViewChild } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { ApiService } from "src/app/services/api.service";
import { BlogService } from "src/app/services/blog.service";
import {
  DropzoneConfigInterface,
  DropzoneComponent
} from "ngx-dropzone-wrapper";
import { MatSnackBar } from "@angular/material";
import { Router } from "@angular/router";

@Component({
  selector: "admin-view",
  templateUrl: "./admin-view.component.html",
  styleUrls: ["./admin-view.component.scss"]
})
export class AdminViewComponent {
  categories: String[] = [];
  form: FormGroup;

  dropzoneConfig: DropzoneConfigInterface = {
    autoProcessQueue: false,
    clickable: true,
    maxFiles: 1,
    autoReset: null,
    errorReset: null,
    cancelReset: null,
    addRemoveLinks: true
  };

  @ViewChild(DropzoneComponent) dropzoneRef?: DropzoneComponent;

  constructor(
    private blogService: BlogService,
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar,
    private router: Router
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

    this.dropzoneRef.directiveRef.dropzone().on("remove", ev => {
      console.log("lol", ev);
    });
  }

  onUploadSuccess([ev, res]) {
    this.postBlogPost(res._id);
  }

  onReset(ev: any) {
    console.log(ev);
  }

  async onCreate() {
    if (!this.form.valid) {
      this.snackBar.open("Whoops...You missed a field :b", "", {
        duration: 2000
      });
      return;
    }

    // Upload image if one is specified
    const files = this.dropzoneRef.directiveRef.dropzone().getQueuedFiles();

    if (files && files.length) {
      this.dropzoneRef.directiveRef.dropzone().processQueue();

      // This kicks-off a processing event in the dropzone component.
      // When the upload completes, it will trigger "onUploadSuccess()"
      // which will call the post method and complete the creation.
      // (Doing it this way because dropzone doesn't beleive in callbacks or Promises :/)
      return;
    }

    this.postBlogPost();
  }

  async postBlogPost(imageId: string = null) {
    try {
      const res = await this.blogService.createBlogPost({
        active: true,
        title: this.form.controls.title.value,
        body: this.form.controls.editor.value,
        category: this.form.controls.category.value,
        mainImageId: imageId
      });

      this.router.navigate([`/blog/${res._id}`]);
    } catch (err) {
      this.snackBar.open("Dang, something went wrong :/", "", {
        duration: 2000
      });
      console.log(err);
    }
  }
}
