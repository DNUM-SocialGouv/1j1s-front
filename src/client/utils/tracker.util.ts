import { push } from "@socialgouv/matomo-next";

enum TrackerObjectEnum {
  TRACK_EVENT = "trackEvent",
}

function trackEvent(category: string, action: string): void {
  push([TrackerObjectEnum.TRACK_EVENT, category, action]);
}

const Tracker = {
  TrackerObjectEnum,
  trackEvent,
};

export default Tracker;
