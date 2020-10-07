import { TestBed, async } from "@angular/core/testing";
import { TermsAndConditionsViewComponent } from "./terms-and-conditions-view.component";
describe("CoachingViewComponent", () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TermsAndConditionsViewComponent]
    }).compileComponents();
  }));

  it("should create the component", async(() => {
    const fixture = TestBed.createComponent(TermsAndConditionsViewComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));

  it(`should have as title 'app'`, async(() => {
    const fixture = TestBed.createComponent(TermsAndConditionsViewComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual("app");
  }));
});
