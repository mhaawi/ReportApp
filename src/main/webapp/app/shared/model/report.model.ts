import { Moment } from 'moment';
import { IParam } from 'app/shared/model/param.model';

export const enum StatusType {
    UNDER_CONSTRUCTION = 'UNDER_CONSTRUCTION',
    OLD = 'OLD',
    NEW = 'NEW'
}

export interface IReport {
    id?: number;
    name?: string;
    status?: StatusType;
    date?: Moment;
    params?: IParam[];
}

export class Report implements IReport {
    constructor(public id?: number, public name?: string, public status?: StatusType, public date?: Moment, public params?: IParam[]) {}
}
