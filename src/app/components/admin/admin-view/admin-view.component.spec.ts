import { TestBed, async } from "@angular/core/testing";
import { AdminViewComponent } from "./admin-view.component";
describe("AdminViewComponent", () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AdminViewComponent]
    }).compileComponents();
  }));

  it("should create the component", async(() => {
    const fixture = TestBed.createComponent(AdminViewComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));

  it(`should have as title 'app'`, async(() => {
    const fixture = TestBed.createComponent(AdminViewComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual("app");
  }));
});
