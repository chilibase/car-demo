import type {User} from "@chilibase/frontend/administration";

export interface Client {
    id: number;
    name: string | null;
    birthDate: Date | null;
    contact: string | null;
    address: string | null;

    // technical attributes
    modifDate: Date | null;
    modifUser: User | null;
    version: number;
}
