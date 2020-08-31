import { NgModule } from "@angular/core";
import { DIRECTIVES } from "./directives";
import { AngularSlideUpDirective } from "./directives";

@NgModule({
    declarations: [...DIRECTIVES],
    imports: [],
    exports: [AngularSlideUpDirective],
})
export class AngularSlideUpModule {}
