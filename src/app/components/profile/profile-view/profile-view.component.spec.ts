import { TestBed, async } from "@angular/core/testing";
import { ProfileViewComponent } from "./profile-view.component";
describe("ProfileViewComponent", () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ProfileViewComponent]
    }).compileComponents();
  }));

  it("should create the component", async(() => {
    const fixture = TestBed.createComponent(ProfileViewComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));

  it(`should have as title 'app'`, async(() => {
    const fixture = TestBed.createComponent(ProfileViewComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual("app");
  }));
});
