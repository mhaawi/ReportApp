import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiAlertService } from 'ng-jhipster';
import { IParam } from 'app/shared/model/param.model';
import { ParamService } from './param.service';
import { IReport } from 'app/shared/model/report.model';
import { ReportService } from 'app/entities/report';

@Component({
    selector: 'jhi-param-update',
    templateUrl: './param-update.component.html'
})
export class ParamUpdateComponent implements OnInit {
    param: IParam;
    isSaving: boolean;

    reports: IReport[];

    constructor(
        protected jhiAlertService: JhiAlertService,
        protected paramService: ParamService,
        protected reportService: ReportService,
        protected activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ param }) => {
            this.param = param;
        });
        this.reportService
            .query()
            .pipe(
                filter((mayBeOk: HttpResponse<IReport[]>) => mayBeOk.ok),
                map((response: HttpResponse<IReport[]>) => response.body)
            )
            .subscribe((res: IReport[]) => (this.reports = res), (res: HttpErrorResponse) => this.onError(res.message));
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.param.id !== undefined) {
            this.subscribeToSaveResponse(this.paramService.update(this.param));
        } else {
            this.subscribeToSaveResponse(this.paramService.create(this.param));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<IParam>>) {
        result.subscribe((res: HttpResponse<IParam>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    protected onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    protected onSaveError() {
        this.isSaving = false;
    }

    protected onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }

    trackReportById(index: number, item: IReport) {
        return item.id;
    }
}
