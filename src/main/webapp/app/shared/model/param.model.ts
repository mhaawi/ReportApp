import { IReport } from 'app/shared/model/report.model';

export interface IParam {
    id?: number;
    name?: string;
    value?: string;
    reportParam?: IReport;
}

export class Param implements IParam {
    constructor(public id?: number, public name?: string, public value?: string, public reportParam?: IReport) {}
}
