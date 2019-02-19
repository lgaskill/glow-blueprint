import { TestBed, async } from "@angular/core/testing";
import { CustomViewComponent } from "./custom-view.component";
describe("CustomViewComponent", () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CustomViewComponent]
    }).compileComponents();
  }));

  it("should create the component", async(() => {
    const fixture = TestBed.createComponent(CustomViewComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));

  it(`should have as title 'app'`, async(() => {
    const fixture = TestBed.createComponent(CustomViewComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual("app");
  }));
});
