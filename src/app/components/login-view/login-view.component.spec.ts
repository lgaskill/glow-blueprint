import { TestBed, async } from "@angular/core/testing";
import { LoginViewComponent } from "./login-view.component";
describe("LoginViewComponent", () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [LoginViewComponent]
    }).compileComponents();
  }));

  it("should create the component", async(() => {
    const fixture = TestBed.createComponent(LoginViewComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));

  it(`should have as title 'app'`, async(() => {
    const fixture = TestBed.createComponent(LoginViewComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual("app");
  }));
});
