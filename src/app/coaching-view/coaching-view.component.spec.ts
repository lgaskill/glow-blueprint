import { TestBed, async } from "@angular/core/testing";
import { CoachingViewComponent } from "./coaching-view.component";
describe("CoachingViewComponent", () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CoachingViewComponent]
    }).compileComponents();
  }));

  it("should create the component", async(() => {
    const fixture = TestBed.createComponent(CoachingViewComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));

  it(`should have as title 'app'`, async(() => {
    const fixture = TestBed.createComponent(CoachingViewComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual("app");
  }));
});
