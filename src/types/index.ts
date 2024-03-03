import { Connection, Departure, Stop } from "@prisma/client";

export type ConnWithStops = Connection & {
  stops: Stop[];
};

export type StopWithDeps = Stop & {
  departures: Departure[];
};

export type ConnStopsDeps = Connection & {
  stops: StopWithDeps[];
};
