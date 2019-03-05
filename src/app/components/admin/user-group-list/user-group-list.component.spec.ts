import { TestBed, async } from "@angular/core/testing";
import { UserGroupListComponent } from "./user-group-list.component";
describe("UserGroupListComponent", () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [UserGroupListComponent]
    }).compileComponents();
  }));

  it("should create the component", async(() => {
    const fixture = TestBed.createComponent(UserGroupListComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));

  it(`should have as title 'app'`, async(() => {
    const fixture = TestBed.createComponent(UserGroupListComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual("app");
  }));
});
