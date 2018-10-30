import { Component, Input, HostListener, ElementRef } from "@angular/core";
import {
  trigger,
  state,
  style,
  animate,
  transition
} from "@angular/animations";

const enum Direction {
  LEFT = "left",
  RIGHT = "right"
}

@Component({
  selector: "scroll-animation",
  templateUrl: "./scroll-animation.component.html",
  styleUrls: ["./scroll-animation.component.scss"],
  animations: [
    trigger("scrollAnimation", [
      //
      // Left
      //
      state(
        "show-left",
        style({
          opacity: 1,
          transform: "translateX(0)"
        })
      ),
      state(
        "hide-left",
        style({
          opacity: 0,
          transform: "translateX(100%)"
        })
      ),
      transition("show-left => hide-left", animate("700ms ease-out")),
      transition("hide-left => show-left", animate("700ms ease-in")),

      //
      // Right
      //
      state(
        "show-right",
        style({
          opacity: 1,
          transform: "translateX(0)"
        })
      ),
      state(
        "hide-right",
        style({
          opacity: 0,
          transform: "translateX(-100%)"
        })
      ),
      transition("show-right => hide-right", animate("700ms ease-out")),
      transition("hide-right => show-right", animate("700ms ease-in"))
    ])
  ]
})
export class ScrollAnimationComponent {
  @Input()
  direction: Direction = Direction.LEFT;

  state: string = `hide-${this.direction}`;

  constructor(private el: ElementRef) {}
  ngOnInit() {
    this.checkScroll();
  }

  @HostListener("window:scroll", ["$event"])
  checkScroll() {
    const componentPosition = this.el.nativeElement.offsetTop;
    const scrollBottom = window.innerHeight + window.pageYOffset;

    this.state =
      scrollBottom >= componentPosition
        ? `show-${this.direction}`
        : `hide-${this.direction}`;
  }
}
