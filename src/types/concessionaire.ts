// src/types/concessionaire.ts

// Define the structure for individual schedule entries (e.g., daily hours)
export interface Schedule {
  day: string;
  open: string;
  close: string;
  type?: string;
  week?: boolean;
  weekEnd?: boolean;
}

// Define the structure for contact information
export interface Contact {
  phone1: string;
  phone2?: string;
  email: string;
}

// Define the structure for an Office, strictly matching your updated backend 'office.ts' model
export interface Office {
  id: string;
  name: string;
  address: string;
  phone: string;
  appointmentPhone?: string;
  email?: string;
  website?: string;
  cityId: string;
  hours?: {
    items : {
      id?: string;
      name?: string;
      start_hour?: string;
      end_hour?: string;
      type?: string;
    }[]
  }
  concessionaireId: string;
  schedules?: Schedule[] | string | null; // Can be stringified JSON from backend
  contact?: Contact | string | null;     // Can be stringified JSON from backend
  // Assuming these relationships are resolved on the client side or via GraphQL joins
  city?: City;
  idVitrina?:string;
  concessionaire?: Concessionaire;
}

// Define the structure for a Concessionaire
export interface Concessionaire {
  id: string;
  name: string;
  offices?: Office[]; // A concessionaire can have multiple offices
}

// Define the structure for a City
export interface City {
  id: string;
  name: string;
  externalId?: string;
}
