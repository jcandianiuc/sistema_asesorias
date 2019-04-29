import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

const mockActiveEvents: ActiveEvent[] = [
    {
        room: '1',
         schedule: {
            from: '10:00',
            to: '11:00'
        },
        status: 'available',
        teacher: 'Prof. Michael',
        teacher_id: 1,
        type: 'general',
        visits: 0
    },
    {
        room: '2',
         schedule: {
            from: '11:00',
            to: '12:00'
        },
        status: 'available',
        teacher: 'Prof. Mike',
        teacher_id: 2,
        type: 'specific',
        visits: 2
    },
];

@Injectable()
export class AvailabilityService {

    constructor(private http: HttpClient) {

    }

    async getActiveEvents(): Promise<ActiveEvent[]> {
        // TODO: quitar esto cuando este el servicio real
        return Promise.resolve(mockActiveEvents);

        // TODO checar como castear la llamada a ActiveEvent[]
        // const url = '';
        // return this.http.get<ActiveEvent[]>(url).toPromise();
    }
}


export interface ActiveEvent {
    teacher: string;
    teacher_id: number;
    room: string;
    type: EventType;
    schedule: {
        from: string;
        to: string;
    };
    visits: number;
    status: EventStatus;
}

export type EventStatus = 'available' | 'closed';
export type EventType = 'general'| 'specific';



