# ![primathon logo](https://primathon.in/assets/img/logo-primathon.png) SlideUp Animation Using Directive for Angular

This is a library for declarative use of
[Intersection Observer API](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API)
with Angular For Animation.

<br/>

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 9.0.0.

<br/>

## Install

```
npm i angular-slide-up
```

## Required

```
You must install "IntersectionObserver polyfill" for all browser support
```

## Usage

1. Install [IntersectionObserver polyfill](https://www.npmjs.com/package/intersection-observer) into your project

    > npm i intersection-observer

1. Import [IntersectionObserver polyfill](https://www.npmjs.com/package/intersection-observer) inside `polyfills.ts` into your project

    > import "intersection-observer";

1. Import `AngularSlideUpModule` inside your AppModule (`src/app/app.module.ts`)

1. Import below code snippet inside your root stylesheet(`src/styles.scss`)

```
.defaultFadeInUp {
    opacity: 0;
}

.fadeInUp {
    animation-duration: 1s;
    animation-fill-mode: "both";
    animation-name: fadeInUp;
}

@keyframes fadeInUp {
    from {
        transform: translate3d(0, 40px, 0);
    }

    to {
        transform: translate3d(0, 0, 0);
        opacity: 1;
    }
}
```

## Examples

Apply slideup animation by adding directive:

`Without Stagger`

```html
<section angularSlideUp>
    <div>Angular SlideUp Animation</div>
    <div>Successfully Applied</div>
    <div>On This Text/Section.</div>
</section>
```

`With Stagger`

```html
<section [angularSlideUp]="true">
    <div [attr.stagger]="true">Angular SlideUp Animation</div>
    <div [attr.stagger]="true">Successfully Applied</div>
    <div [attr.stagger]="true">On This Text/Section.</div>
</section>
```

## Services

Alternatively you can use `Observable`-based services:

1. `IntersectionObserverService` can be used to observe single element independently. Provide tokens manually to configure it:

```typescript
@Component({
    selector: "primathon-component",
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
export class PrimathonComponent {
    constructor(
        @Inject(IntersectionObserverService)
        intersectionObserverService$: IntersectionObserverService
    ) {
        intersectionObserverService$.subscribe((entries) => {
            // Don't forget to unsubscribe
            console.log(entries);
        });
    }
}
```

## Demo

Demo url https://primathontech.github.io/angular-slideup/

## See also

Other [Web APIs for Angular](https://primathontech.github.io/) by [@primathontech](https://github.com/primathontech)
