import {
    Directive,
    Inject,
    PLATFORM_ID,
    Renderer2,
    ElementRef,
} from "@angular/core";
import { isPlatformBrowser } from "@angular/common";
import { IntersectionObserverService } from "../services";
import { INTERSECTION_THRESHOLD, INTERSECTION_ROOT_MARGIN } from "../tokens";
import { Subscription } from "rxjs";

@Directive({
    selector: "[angularSlideUp]",
    providers: [
        IntersectionObserverService,
        {
            provide: INTERSECTION_THRESHOLD,
            useValue: 0.2,
        },
        {
            provide: INTERSECTION_ROOT_MARGIN,
            useValue: "0px",
        },
    ],
})
export class AngularSlideUpDirective {
    private sub$: Subscription;

    constructor(
        @Inject(PLATFORM_ID) private platformId: string,
        @Inject(IntersectionObserverService)
        private intersectionObserverService: IntersectionObserverService,
        private renderer: Renderer2,
        private element: ElementRef
    ) {
        if (isPlatformBrowser(this.platformId)) {
            this.renderer.addClass(
                this.element.nativeElement,
                "defaultFadeInUp"
            );
            // Don't forget to unsubscribe
            this.sub$ = this.intersectionObserverService.subscribe(
                (entries) => {
                    if (entries && entries[0] && entries[0].isIntersecting) {
                        this.checkVisibility();
                    }
                }
            );
        }
    }

    private checkVisibility() {
        if (isPlatformBrowser(this.platformId)) {
            this.renderer.addClass(this.element.nativeElement, "fadeInUp");
        }
    }

    ngOnDestroy(): void {
        if (this.sub$) {
            this.sub$.unsubscribe();
        }
    }
}
