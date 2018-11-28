import { TestBed, async } from "@angular/core/testing";
import { BlogPostViewComponent } from "./blog-post-view.component";
describe("BlogPostViewComponent", () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [BlogPostViewComponent]
    }).compileComponents();
  }));

  it("should create the component", async(() => {
    const fixture = TestBed.createComponent(BlogPostViewComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));

  it(`should have as title 'app'`, async(() => {
    const fixture = TestBed.createComponent(BlogPostViewComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual("app");
  }));
});
