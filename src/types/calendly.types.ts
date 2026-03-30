export interface CalendlyInvitee {
  uuid: string;
  email: string;
  name: string;
  timezone: string;
}

export interface CalendlyEventData {
  uuid: string;
  uri: string;
}

export interface CalendlyPayload {
  event?: CalendlyEventData;
  invitee?: CalendlyInvitee;
}

export interface CalendlyEvent {
  event: string;
  payload?: CalendlyPayload;
  type?: string;
}
