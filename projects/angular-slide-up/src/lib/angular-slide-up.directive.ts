import {
    OnDestroy,
    Input,
    OnChanges,
    SimpleChanges,
    AfterViewInit,
} from '@angular/core';
import {
    Directive,
    Inject,
    PLATFORM_ID,
    Renderer2,
    ElementRef,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { INTERSECTION_THRESHOLD, INTERSECTION_ROOT_MARGIN } from './tokens';
import { Subscription } from 'rxjs';
import { IntersectionObserverService } from './intersection-observer.service';

@Directive({
    selector: '[angularSlideUp]',
    providers: [
        IntersectionObserverService,
        {
            provide: INTERSECTION_THRESHOLD,
            useValue: 0.2,
        },
        {
            provide: INTERSECTION_ROOT_MARGIN,
            useValue: '0px',
        },
    ],
})
export class AngularSlideUpDirective implements AfterViewInit, OnDestroy {
    @Input() angularSlideUp: boolean = false;

    private childrenNode = [];
    private timeOut = [];

    private sub$: Subscription;

    constructor(
        @Inject(PLATFORM_ID) private platformId: string,
        @Inject(IntersectionObserverService)
        private intersectionObserverService: IntersectionObserverService,
        private renderer: Renderer2,
        private element: ElementRef
    ) {}

    ngAfterViewInit(): void {
        this.initSlideup();
    }

    initSlideup() {
        if (isPlatformBrowser(this.platformId)) {
            this.renderer.addClass(
                this.element.nativeElement,
                'defaultFadeInUp'
            );

            // Check For Stagger
            if (this.angularSlideUp) {
                this.childrenNode = this.element.nativeElement.querySelectorAll(
                    '[stagger=true]'
                );

                if (this.childrenNode) {
                    for (const elem of this.childrenNode) {
                        this.renderer.addClass(elem, 'defaultFadeInUp');
                    }
                }
            }

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
            this.renderer.addClass(this.element.nativeElement, 'fadeInUp');

            if (this.angularSlideUp) {
                let timerVal = 0;

                for (const elem of this.childrenNode) {
                    const timeout = setTimeout(() => {
                        this.renderer.addClass(elem, 'fadeInUp');
                    }, timerVal);

                    this.timeOut.push(timeout);

                    timerVal += 300;
                }
            }
        }
    }

    ngOnDestroy(): void {
        if (this.sub$) {
            this.sub$.unsubscribe();
        }

        this.timeOut.forEach((timer) => {
            clearTimeout(timer);
        });
    }
}
