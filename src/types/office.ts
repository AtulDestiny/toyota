// src/types/office.ts
import { City } from './concessionaire'; // Re-using City from concessionaire.ts
import { Concessionaire, Schedule, Contact } from './concessionaire'; // Re-using Concessionaire, Schedule, Contact from concessionaire.ts
import { Hour } from './hour'; // Assuming hour.ts defines Hour

export interface Office {
    id: string;
    name: string;
    address: string;
    phone: string;
    appointmentPhone?: string;
    email?: string;
    website?: string;
    cityId: string;
    concessionaireId: string;
    city?: City;
    concessionaire?: Concessionaire;
    schedules?: Schedule[] | string | null; // Can be stringified JSON from backend
    contact?: Contact | string | null;     // Can be stringified JSON from backend
    hours?: Hour[]; // Assuming a relationship to Hour type
}
