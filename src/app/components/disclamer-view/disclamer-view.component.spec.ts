import { TestBed, async } from "@angular/core/testing";
import { DisclamerViewComponent } from "./disclamer-view.component";
describe("CoachingViewComponent", () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DisclamerViewComponent]
    }).compileComponents();
  }));

  it("should create the component", async(() => {
    const fixture = TestBed.createComponent(DisclamerViewComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));

  it(`should have as title 'app'`, async(() => {
    const fixture = TestBed.createComponent(DisclamerViewComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual("app");
  }));
});
