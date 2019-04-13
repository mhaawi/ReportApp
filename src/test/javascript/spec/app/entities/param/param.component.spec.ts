/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { ReportAppTestModule } from '../../../test.module';
import { ParamComponent } from 'app/entities/param/param.component';
import { ParamService } from 'app/entities/param/param.service';
import { Param } from 'app/shared/model/param.model';

describe('Component Tests', () => {
    describe('Param Management Component', () => {
        let comp: ParamComponent;
        let fixture: ComponentFixture<ParamComponent>;
        let service: ParamService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [ReportAppTestModule],
                declarations: [ParamComponent],
                providers: []
            })
                .overrideTemplate(ParamComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(ParamComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ParamService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new Param(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.params[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
