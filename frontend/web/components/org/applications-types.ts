export type TabId = 'pending' | 'approved' | 'rejected' | 'all';

export interface Counts {
  pending: number;
  approved: number;
  rejected: number;
  all: number;
}
