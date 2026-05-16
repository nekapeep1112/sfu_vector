import type { OrgCategory, OrgHost } from '@/lib/mock-data';

export interface CreateOrgWizardData {
  name: string;
  short: string;
  description: string;
  hostType: 'institute' | 'dormitory' | 'university';
  instituteAbbr?: string;
  dormNumber?: number;
  category: OrgCategory;
  color: string;
}

export const INITIAL_CREATE_ORG_DATA: CreateOrgWizardData = {
  name: '',
  short: '',
  description: '',
  hostType: 'institute',
  instituteAbbr: 'ИКИТ',
  dormNumber: undefined,
  category: 'club',
  color: '#3B82F6',
};

export const ORG_COLORS = [
  '#3B82F6',
  '#7C3AED',
  '#10B981',
  '#F5A524',
  '#EF4444',
  '#06B6D4',
  '#EC4899',
  '#8B5CF6',
] as const;

export const CREATE_ORG_STEPS = [
  { n: 1, label: 'Основное' },
  { n: 2, label: 'Привязка' },
  { n: 3, label: 'Оформление' },
  { n: 4, label: 'Превью' },
];

export function resolveHost(data: CreateOrgWizardData): OrgHost {
  if (data.hostType === 'institute') {
    return { type: 'institute', instituteAbbr: data.instituteAbbr ?? 'ИКИТ' };
  }
  if (data.hostType === 'dormitory') {
    return { type: 'dormitory', dormNumber: data.dormNumber ?? 7 };
  }
  return { type: 'university' };
}

export function hostLabel(data: CreateOrgWizardData): string {
  if (data.hostType === 'institute')  return data.instituteAbbr ?? '—';
  if (data.hostType === 'dormitory')  return `Общежитие №${data.dormNumber ?? 7}`;
  return 'Общеуниверситетская';
}
