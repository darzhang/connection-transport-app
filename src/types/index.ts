import { Connection, Stop } from "@prisma/client";

export type ConnectionStopsType = Connection & {
  stops: Stop[];
};
