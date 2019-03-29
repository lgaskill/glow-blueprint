import { TestBed, async } from "@angular/core/testing";
import { ContactInfoPanelComponent } from "./contact-info-panel.component";
describe("ContactInfoPanelComponent", () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ContactInfoPanelComponent]
    }).compileComponents();
  }));

  it("should create the component", async(() => {
    const fixture = TestBed.createComponent(ContactInfoPanelComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));

  it(`should have as title 'app'`, async(() => {
    const fixture = TestBed.createComponent(ContactInfoPanelComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual("app");
  }));
});
