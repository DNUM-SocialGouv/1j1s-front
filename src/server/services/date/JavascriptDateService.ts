import { DateService } from "./DateService";

export class JavascriptDateService implements DateService {
  now(): number {
    return Date.now();
  }

  isDateInPast(date: number): boolean {
    return Date.now() < date;
  }
}
