import { Component, ViewChild, ElementRef } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { BlogService } from "src/app/services/blog.service";
import { AuthService } from "src/app/services/auth.service";
import { FormGroup, Validators, FormBuilder } from "@angular/forms";
import { MatSnackBar } from "@angular/material";
import {
  DropzoneConfigInterface,
  DropzoneComponent
} from "ngx-dropzone-wrapper";
import { environment } from "src/environments/environment";
import { Constants } from "src/app/config/constants";

@Component({
  selector: "blog-post-view",
  templateUrl: "./blog-post-view.component.html",
  styleUrls: ["./blog-post-view.component.scss"]
})
export class BlogPostViewComponent {
  blogPostId: string = null;
  blogPost: BlogPost = null;

  editing: boolean = false;
  isAdmin: boolean = false;
  publishDraft: boolean = false;
  form: FormGroup;
  categories: String[] = [];
  thumbnailLoaded: boolean = false;

  dropzoneConfig: DropzoneConfigInterface = {
    autoProcessQueue: false,
    clickable: true,
    maxFiles: 1,
    maxFilesize: 50000000,
    autoReset: null,
    errorReset: null,
    cancelReset: null,
    addRemoveLinks: true,
    headers: {
      Authorization: this.authService.isAdmin()
        ? `Token ${this.authService.getCurrentUser().token}`
        : undefined
    }
  };

  dropzoneRef?: DropzoneComponent;
  @ViewChild(DropzoneComponent) set content(content: DropzoneComponent) {
    this.dropzoneRef = content;

    // initialize the preview image
    if (
      this.dropzoneRef &&
      this.blogPost &&
      this.blogPost.mainImageId &&
      !this.thumbnailLoaded
    ) {
      const hostUrl: string = environment.production
        ? Constants.API_HOST_PROD
        : Constants.API_HOST_LOCAL;

      const dz = this.dropzoneRef.directiveRef.dropzone();
      const file = {
        name: "Main Image",
        size: 0,
        dataURL: `${hostUrl}/image/${this.blogPost.mainImageId}`
      };

      dz.emit("addedfile", file);
      dz.createThumbnailFromUrl(
        file,
        dz.options.thumbnailWidth,
        dz.options.thumbnailHeight,
        dz.options.thumbnailMethod,
        true,
        function(thumbnail) {
          dz.emit("thumbnail", file, thumbnail);
        },
        "anonymous"
      );
      dz.emit("complete", file);

      this.thumbnailLoaded = true;
    }
  }

  constructor(
    private route: ActivatedRoute,
    private blogService: BlogService,
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar
  ) {}

  async ngOnInit() {
    // TODO: How's this going to hold-up when navigating between posts?

    this.isAdmin = this.authService.isAdmin();
    this.form = this.formBuilder.group({
      category: ["", Validators.required],
      body: ["", Validators.required],
      title: ["", Validators.required]
    });

    this.blogPostId = this.route.snapshot.paramMap.get("id");
    if (!this.blogPostId) {
      return;
    }

    this.blogPost = await this.blogService.getBlogPostById(this.blogPostId);
  }

  async onEdit() {
    if (this.isAdmin) {
      this.editing = true;
      this.form.controls.title.setValue(this.blogPost.title);
      this.form.controls.category.setValue(this.blogPost.category);
      this.form.controls.body.setValue(this.blogPost.body);

      // Get all known categories
      this.categories = await this.blogService.getCategories();
    }
  }

  onCancel() {
    this.editing = false;
    this.thumbnailLoaded = false;
  }

  onSave(publishDraft: boolean = false) {
    if (!this.form.valid) {
      this.snackBar.open("Whoops...You missed a field :b", "", {
        duration: 2000
      });
      return;
    }

    this.publishDraft = publishDraft;

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

    this.saveBlogPost(this.blogPost.mainImageId);
  }

  onUploadSuccess([ev, res]) {
    this.saveBlogPost(res._id);
  }

  async saveBlogPost(imageId: string = null) {
    try {
      await this.blogService.updateBlogPost(this.blogPostId, {
        title: this.form.controls.title.value,
        body: this.form.controls.body.value,
        category: this.form.controls.category.value,
        mainImageId: imageId,
        isDraft: this.blogPost.isDraft && !this.publishDraft
      });
    } catch (err) {
      this.snackBar.open("Dang, something went wrong :/", "", {
        duration: 2000
      });
      console.log(err);
      return;
    }

    location.reload();
  }
}
