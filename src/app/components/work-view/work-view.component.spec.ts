import { TestBed, async } from "@angular/core/testing";
import { WorkViewComponent } from "./work-view.component";
describe("WorkViewComponent", () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [WorkViewComponent]
    }).compileComponents();
  }));

  it("should create the component", async(() => {
    const fixture = TestBed.createComponent(WorkViewComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));

  it(`should have as title 'app'`, async(() => {
    const fixture = TestBed.createComponent(WorkViewComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual("app");
  }));
});
