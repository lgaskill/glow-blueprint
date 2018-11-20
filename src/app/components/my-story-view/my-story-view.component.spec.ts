import { TestBed, async } from "@angular/core/testing";
import { MyStoryViewComponent } from "./my-story-view.component";
describe("CoachingViewComponent", () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MyStoryViewComponent]
    }).compileComponents();
  }));

  it("should create the component", async(() => {
    const fixture = TestBed.createComponent(MyStoryViewComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));

  it(`should have as title 'app'`, async(() => {
    const fixture = TestBed.createComponent(MyStoryViewComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual("app");
  }));
});
