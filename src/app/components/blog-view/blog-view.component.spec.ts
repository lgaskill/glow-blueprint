import { TestBed, async } from "@angular/core/testing";
import { BlogViewComponent } from "./blog-view.component";
describe("BlogViewComponent", () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [BlogViewComponent]
    }).compileComponents();
  }));
  it("should create the component", async(() => {
    const fixture = TestBed.createComponent(BlogViewComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));
  it(`should have as title 'app'`, async(() => {
    const fixture = TestBed.createComponent(BlogViewComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual("app");
  }));
});
