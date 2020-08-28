import {
  Directive,
  Inject,
  PLATFORM_ID,
  Renderer2,
  ElementRef,
} from "@angular/core";
import { isPlatformBrowser } from "@angular/common";

@Directive({
  selector: "[angularSlideUp]",
})
export class AngularSlideUpDirective {
  private observer: IntersectionObserver;

  constructor(
    @Inject(PLATFORM_ID) private platformId: string,
    private renderer: Renderer2,
    private element: ElementRef
  ) {}

  private checkVisibility() {
    this.renderer.addClass(this.element.nativeElement, "fadeInUp");
  }

  ngAfterViewInit() {
    // this.checkVisibility();

    console.log("%cAngularSlideUpDirective", "color:green");

    const option = {
      root: null,
      rootMargin: "0px",
      threshold: 0.2,
    };

    if (isPlatformBrowser(this.platformId)) {
      console.log(this.platformId);

      this.observer = new IntersectionObserver((enteries) => {
        enteries.forEach((entry) => {
          if (entry.isIntersecting) {
            this.checkVisibility();
          }
        });
      }, option);
    }
  }

  ngOnDestroy(): void {
    if (this.observer) {
      this.observer.disconnect();
    }
  }
}
