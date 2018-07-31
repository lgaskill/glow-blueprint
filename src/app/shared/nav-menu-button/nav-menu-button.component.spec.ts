import { TestBed, async } from "@angular/core/testing";
import { NavMenuButtonComponent } from "./nav-menu-button.component";
describe("NavMenuButtonComponent", () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [NavMenuButtonComponent]
    }).compileComponents();
  }));
  it("should create the component", async(() => {
    const fixture = TestBed.createComponent(NavMenuButtonComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));
  it(`should have as title 'app'`, async(() => {
    const fixture = TestBed.createComponent(NavMenuButtonComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual("app");
  }));
});
