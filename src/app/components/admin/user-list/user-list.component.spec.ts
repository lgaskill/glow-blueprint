import { TestBed, async } from "@angular/core/testing";
import { UserListComponent } from "./user-list.component";
describe("UserListComponent", () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [UserListComponent]
    }).compileComponents();
  }));

  it("should create the component", async(() => {
    const fixture = TestBed.createComponent(UserListComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));

  it(`should have as title 'app'`, async(() => {
    const fixture = TestBed.createComponent(UserListComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual("app");
  }));
});
