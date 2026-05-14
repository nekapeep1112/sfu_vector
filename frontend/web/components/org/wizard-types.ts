import type { ApplicationQuestion, EventType } from '@/lib/mock-data';

export type WizardCover =
  | { type: 'generated' }
  | { type: 'uploaded'; url: string };

export interface WizardData {
  type: EventType | null;
  title: string;
  shortDesc: string;
  longDesc: string;
  cover: WizardCover;
  date: { d: number; m: string; wd: string; full: string } | null;
  time: string;
  duration: string;
  format: 'offline' | 'online' | 'hybrid' | null;
  building: string;
  room: string;
  address: string;
  visibility: 'all' | 'institute' | 'org-only' | null;
  capacity: number | null;
  regMode: 'open' | 'application' | null;
  regDeadline: 'day' | 'hour' | 'custom' | null;
  hours: number | null;
  notifyOnRegister: boolean;
  qrTicket: boolean;
  allowCancel: boolean;
  applicationQuestions: ApplicationQuestion[];
}

export const INITIAL_WIZARD_DATA: WizardData = {
  type: null,
  title: '',
  shortDesc: '',
  longDesc: '',
  cover: { type: 'generated' },
  date: null,
  time: '',
  duration: '',
  format: null,
  building: '',
  room: '',
  address: '',
  visibility: null,
  capacity: null,
  regMode: null,
  regDeadline: null,
  hours: null,
  notifyOnRegister: true,
  qrTicket: true,
  allowCancel: true,
  applicationQuestions: [],
};
