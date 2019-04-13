import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IParam } from 'app/shared/model/param.model';
import { ParamService } from './param.service';

@Component({
    selector: 'jhi-param-delete-dialog',
    templateUrl: './param-delete-dialog.component.html'
})
export class ParamDeleteDialogComponent {
    param: IParam;

    constructor(protected paramService: ParamService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.paramService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'paramListModification',
                content: 'Deleted an param'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-param-delete-popup',
    template: ''
})
export class ParamDeletePopupComponent implements OnInit, OnDestroy {
    protected ngbModalRef: NgbModalRef;

    constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ param }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(ParamDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
                this.ngbModalRef.componentInstance.param = param;
                this.ngbModalRef.result.then(
                    result => {
                        this.router.navigate(['/param', { outlets: { popup: null } }]);
                        this.ngbModalRef = null;
                    },
                    reason => {
                        this.router.navigate(['/param', { outlets: { popup: null } }]);
                        this.ngbModalRef = null;
                    }
                );
            }, 0);
        });
    }

    ngOnDestroy() {
        this.ngbModalRef = null;
    }
}
