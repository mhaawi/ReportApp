import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { JhiLanguageService } from 'ng-jhipster';
import { JhiLanguageHelper } from 'app/core';

import { ReportAppSharedModule } from 'app/shared';
import {
    ParamComponent,
    ParamDetailComponent,
    ParamUpdateComponent,
    ParamDeletePopupComponent,
    ParamDeleteDialogComponent,
    paramRoute,
    paramPopupRoute
} from './';

const ENTITY_STATES = [...paramRoute, ...paramPopupRoute];

@NgModule({
    imports: [ReportAppSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [ParamComponent, ParamDetailComponent, ParamUpdateComponent, ParamDeleteDialogComponent, ParamDeletePopupComponent],
    entryComponents: [ParamComponent, ParamUpdateComponent, ParamDeleteDialogComponent, ParamDeletePopupComponent],
    providers: [{ provide: JhiLanguageService, useClass: JhiLanguageService }],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ReportAppParamModule {
    constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
        this.languageHelper.language.subscribe((languageKey: string) => {
            if (languageKey !== undefined) {
                this.languageService.changeLanguage(languageKey);
            }
        });
    }
}
