import { TestBed, async } from "@angular/core/testing";
import { BlogPostCreatorComponent } from "./blog-post-creator.component";
describe("BlogPostCreatorComponent", () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [BlogPostCreatorComponent]
    }).compileComponents();
  }));

  it("should create the component", async(() => {
    const fixture = TestBed.createComponent(BlogPostCreatorComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));

  it(`should have as title 'app'`, async(() => {
    const fixture = TestBed.createComponent(BlogPostCreatorComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual("app");
  }));
});
