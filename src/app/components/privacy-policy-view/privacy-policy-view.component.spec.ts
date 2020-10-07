import { TestBed, async } from "@angular/core/testing";
import { PrivacyPolicyViewComponent } from "./privacy-policy-view.component";
describe("CoachingViewComponent", () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PrivacyPolicyViewComponent]
    }).compileComponents();
  }));

  it("should create the component", async(() => {
    const fixture = TestBed.createComponent(PrivacyPolicyViewComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));

  it(`should have as title 'app'`, async(() => {
    const fixture = TestBed.createComponent(PrivacyPolicyViewComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual("app");
  }));
});
