import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IParam } from 'app/shared/model/param.model';
import { AccountService } from 'app/core';
import { ParamService } from './param.service';

@Component({
    selector: 'jhi-param',
    templateUrl: './param.component.html'
})
export class ParamComponent implements OnInit, OnDestroy {
    params: IParam[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        protected paramService: ParamService,
        protected jhiAlertService: JhiAlertService,
        protected eventManager: JhiEventManager,
        protected accountService: AccountService
    ) {}

    loadAll() {
        this.paramService
            .query()
            .pipe(
                filter((res: HttpResponse<IParam[]>) => res.ok),
                map((res: HttpResponse<IParam[]>) => res.body)
            )
            .subscribe(
                (res: IParam[]) => {
                    this.params = res;
                },
                (res: HttpErrorResponse) => this.onError(res.message)
            );
    }

    ngOnInit() {
        this.loadAll();
        this.accountService.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInParams();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IParam) {
        return item.id;
    }

    registerChangeInParams() {
        this.eventSubscriber = this.eventManager.subscribe('paramListModification', response => this.loadAll());
    }

    protected onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
