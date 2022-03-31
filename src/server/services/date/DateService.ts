import { DateTime } from "luxon";

export interface DateService {
  now(): DateTime;
  nowInFuture(second: number): DateTime;
}
