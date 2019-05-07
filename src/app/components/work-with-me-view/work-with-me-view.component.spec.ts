import { TestBed, async } from "@angular/core/testing";
import { WorkWithMeViewComponent } from "./work-with-me-view.component";
describe("WorkWithMeViewComponent", () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [WorkWithMeViewComponent]
    }).compileComponents();
  }));
  it("should create the component", async(() => {
    const fixture = TestBed.createComponent(WorkWithMeViewComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));
  it(`should have as title 'app'`, async(() => {
    const fixture = TestBed.createComponent(WorkWithMeViewComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual("app");
  }));
});
