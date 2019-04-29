import { EventType, EventStatus } from 'src/app/members/availability/availability.service';


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
