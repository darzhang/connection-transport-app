import { Connection, Departure, Stop } from "@prisma/client";

export type ConnWithStops = Connection & {
  stops: Stop[];
};

type StopWithDeps = Stop & {
  departures: Departure[];
};

export type ConnStopsDeps = Connection & {
  stops: StopWithDeps[];
};
