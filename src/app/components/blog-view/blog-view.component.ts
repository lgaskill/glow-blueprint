import { Component } from "@angular/core";
import { BlogService } from "src/app/services/blog.service";
import { ActivatedRoute, Router } from "@angular/router";
import { Observable } from "rxjs";
import { map, startWith } from "rxjs/operators";
import { FormControl } from "@angular/forms";

@Component({
  selector: "blog-view",
  templateUrl: "./blog-view.component.html",
  styleUrls: ["./blog-view.component.scss"]
})
export class BlogViewComponent {
  categories: string[] = [];
  filteredCategories: Observable<string[]>;
  category: string = "";
  searchTerm: string = "";
  searchControl: FormControl = new FormControl();

  constructor(
    private blogService: BlogService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}

  async ngOnInit() {
    const searchTerm = this.activatedRoute.snapshot.queryParams["searchTerm"];
    const category = this.activatedRoute.snapshot.queryParams["category"];
    if (searchTerm) {
      this.searchTerm = searchTerm;
      this.searchControl.setValue(searchTerm);
    } else if (category) {
      this.category = category;
      this.searchTerm = category;
      this.searchControl.setValue(category);
    }

    try {
      this.categories = await this.blogService.getCategories();
    } catch (err) {
      console.error("Failed to get categories");
      return;
    }

    this.filteredCategories = this.searchControl.valueChanges.pipe(
      startWith(""),
      map(value => this.categoryFilter(value))
    );
  }

  private categoryFilter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.categories.filter(option =>
      option.toLowerCase().includes(filterValue)
    );
  }

  private updateQueryParams() {
    const queryParams: any = {
      category: this.category,
      searchTerm: this.searchTerm
    };

    this.router.navigate([], {
      relativeTo: this.activatedRoute,
      queryParams,
      queryParamsHandling: "merge"
    });
  }

  public onSearch() {
    const searchTerm = this.searchControl.value;

    if (this.categories.indexOf(searchTerm) >= 0) {
      this.category = searchTerm;
      this.searchTerm = "";
    } else {
      this.category = "";
      this.searchTerm = searchTerm;
    }

    this.updateQueryParams();
  }

  public onClearSearch() {
    this.searchTerm = "";
    this.category = "";
    this.searchControl.setValue("");

    this.updateQueryParams();
  }
}
