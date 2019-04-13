import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { Param } from 'app/shared/model/param.model';
import { ParamService } from './param.service';
import { ParamComponent } from './param.component';
import { ParamDetailComponent } from './param-detail.component';
import { ParamUpdateComponent } from './param-update.component';
import { ParamDeletePopupComponent } from './param-delete-dialog.component';
import { IParam } from 'app/shared/model/param.model';

@Injectable({ providedIn: 'root' })
export class ParamResolve implements Resolve<IParam> {
    constructor(private service: ParamService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IParam> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<Param>) => response.ok),
                map((param: HttpResponse<Param>) => param.body)
            );
        }
        return of(new Param());
    }
}

export const paramRoute: Routes = [
    {
        path: '',
        component: ParamComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'reportApp.param.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/view',
        component: ParamDetailComponent,
        resolve: {
            param: ParamResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'reportApp.param.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'new',
        component: ParamUpdateComponent,
        resolve: {
            param: ParamResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'reportApp.param.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/edit',
        component: ParamUpdateComponent,
        resolve: {
            param: ParamResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'reportApp.param.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const paramPopupRoute: Routes = [
    {
        path: ':id/delete',
        component: ParamDeletePopupComponent,
        resolve: {
            param: ParamResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'reportApp.param.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
