export type Calendar = {
  uid: string;
  name: string;
  userIds: string[];
  entries: string[];
};

export const SUPER_HAPPY = 'SUPER_HAPPY';
export const HAPPY = 'HAPPY';
export const NORMAL = 'NORMAL';
export const BLUE = 'BLUE';
export const SUPER_BLUE = 'SUPER_BLUE';
export type Emotion = 'SUPER_HAPPY' | 'HAPPY' | 'NORMAL' | 'BLUE' | 'SUPER_BLUE';
export type CalendarReport = {
  uid: string;
  calendarId: string;
  userId: string;
  date: Date;
  emotion: Emotion;
  comment: string;
};
