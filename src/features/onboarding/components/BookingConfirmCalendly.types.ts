import type { CalendlyEvent } from '@/types/calendly.types';

export interface BookingConfirmCalendlyProps {
  url: string;
  name?: string;
  email?: string;
  phoneNumber?: string;
  onEventScheduled?: (data: CalendlyEvent) => void;
}
