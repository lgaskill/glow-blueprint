import { TestBed, async } from "@angular/core/testing";
import { AppBarComponent } from "./app-bar.component";
describe("AppBarComponent", () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AppBarComponent]
    }).compileComponents();
  }));
  it("should create the component", async(() => {
    const fixture = TestBed.createComponent(AppBarComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));
  it(`should have as title 'app'`, async(() => {
    const fixture = TestBed.createComponent(AppBarComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual("app");
  }));
});
