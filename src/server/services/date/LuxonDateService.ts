import { DateTime } from "luxon";

import { DateService } from "./DateService";

export class LuxonDateService implements DateService {
  now(): DateTime {
    return DateTime.now();
  }

  nowInFuture(second: number): DateTime {
    return DateTime.now().plus({ second });
  }
}
