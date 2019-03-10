import { TestBed, async } from "@angular/core/testing";
import { BlogListComponent } from "./blog-list.component";
describe("BlogListComponent", () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [BlogListComponent]
    }).compileComponents();
  }));
  it("should create the component", async(() => {
    const fixture = TestBed.createComponent(BlogListComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));
  it(`should have as title 'app'`, async(() => {
    const fixture = TestBed.createComponent(BlogListComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual("app");
  }));
});
