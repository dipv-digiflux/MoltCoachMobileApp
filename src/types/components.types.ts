export interface ApplicationNotApprovedMessageProps {
  title: string;
  description: string;
}

export interface BookingConfirmCalendlyProps {
  url: string;
  onEventScheduled?: () => void;
  name?: string;
  email?: string;
}
