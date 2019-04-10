import { TestBed, async } from "@angular/core/testing";
import { GroupEnrollmentViewComponent } from "./group-enrollment-view.component";
describe("GroupEnrollmentViewComponent", () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [GroupEnrollmentViewComponent]
    }).compileComponents();
  }));

  it("should create the component", async(() => {
    const fixture = TestBed.createComponent(GroupEnrollmentViewComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));

  it(`should have as title 'app'`, async(() => {
    const fixture = TestBed.createComponent(GroupEnrollmentViewComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual("app");
  }));
});
