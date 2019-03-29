import { TestBed, async } from "@angular/core/testing";
import { HealthHistoryPanelComponent } from "./health-history-panel.component";
describe("HealthHistoryPanelComponent", () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [HealthHistoryPanelComponent]
    }).compileComponents();
  }));

  it("should create the component", async(() => {
    const fixture = TestBed.createComponent(HealthHistoryPanelComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));

  it(`should have as title 'app'`, async(() => {
    const fixture = TestBed.createComponent(HealthHistoryPanelComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual("app");
  }));
});
