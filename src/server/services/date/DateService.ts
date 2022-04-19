export interface DateService {
  now(): number;
  isDateInPast(second: number): boolean;
}
