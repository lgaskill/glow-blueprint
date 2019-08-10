import { TestBed, async } from "@angular/core/testing";
import { GroupEnrollmentRegistrationViewComponent } from "./group-enrollment-registration-view.component";
describe("GroupEnrollmentRegistrationViewComponent", () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [GroupEnrollmentRegistrationViewComponent]
    }).compileComponents();
  }));

  it("should create the component", async(() => {
    const fixture = TestBed.createComponent(
      GroupEnrollmentRegistrationViewComponent
    );
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));

  it(`should have as title 'app'`, async(() => {
    const fixture = TestBed.createComponent(
      GroupEnrollmentRegistrationViewComponent
    );
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual("app");
  }));
});
