import { format, startOfWeek, endOfWeek, eachDayOfInterval, isToday, parseISO } from 'date-fns';
import { tr } from 'date-fns/locale';

export const formatDate = (date: Date, formatStr: string = 'dd MMMM, EEEE'): string => {
  return format(date, formatStr, { locale: tr });
};

export const getDateString = (date: Date): string => {
  return format(date, 'yyyy-MM-dd');
};

export const getTodayString = (): string => {
  return getDateString(new Date());
};

export const getWeekDays = (date: Date = new Date(), weekStartsOn: 0 | 1 = 1): Date[] => {
  const start = startOfWeek(date, { weekStartsOn });
  const end = endOfWeek(date, { weekStartsOn });
  return eachDayOfInterval({ start, end });
};

export const getDayName = (date: Date, short: boolean = true): string => {
  return format(date, short ? 'EEE' : 'EEEE', { locale: tr });
};

export const isTodayDate = (dateString: string): boolean => {
  try {
    return isToday(parseISO(dateString));
  } catch {
    return false;
  }
};

export const parseDateString = (dateString: string): Date => {
  return parseISO(dateString);
};
