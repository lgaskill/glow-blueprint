import { TestBed, async } from "@angular/core/testing";
import { SubscribeDialogComponent } from "./subscribe-dialog.component";
describe("SubscribeDialogComponent", () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SubscribeDialogComponent]
    }).compileComponents();
  }));

  it("should create the component", async(() => {
    const fixture = TestBed.createComponent(SubscribeDialogComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));

  it(`should have as title 'app'`, async(() => {
    const fixture = TestBed.createComponent(SubscribeDialogComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual("app");
  }));
});
