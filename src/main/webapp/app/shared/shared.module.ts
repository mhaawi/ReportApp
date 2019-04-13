import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { NgbDateAdapter } from '@ng-bootstrap/ng-bootstrap';

import { NgbDateMomentAdapter } from './util/datepicker-adapter';
import { ReportAppSharedLibsModule, ReportAppSharedCommonModule, HasAnyAuthorityDirective } from './';

@NgModule({
    imports: [ReportAppSharedLibsModule, ReportAppSharedCommonModule],
    declarations: [HasAnyAuthorityDirective],
    providers: [{ provide: NgbDateAdapter, useClass: NgbDateMomentAdapter }],
    exports: [ReportAppSharedCommonModule, HasAnyAuthorityDirective],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ReportAppSharedModule {
    static forRoot() {
        return {
            ngModule: ReportAppSharedModule
        };
    }
}
