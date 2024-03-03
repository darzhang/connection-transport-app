import { prisma } from "@/prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { formatTimeToMelbourneAmPm } from "@/lib/formatTime";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  // User Session Guard
  const session = await getServerSession(req, res, authOptions);
  if (!session) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  switch (req.method) {
    case "GET":
      try {
        const { id } = req.query;

        // Get the connection
        const connection = await prisma.connection.findUnique({
          where: { id: Number(id) },
          include: { stops: { include: { departures: true } } },
        });

        // Throw Error if connection not found
        if (!connection) {
          return res.status(404).json({ error: "Connection not found" });
        }

        // Get the current time in 'HH:mm:ss' format in Melbourne Timezone
        const melbourneOffset = 11; // UTC+11 for now (ease of use, should be dynamic in production)
        const nowUtc = new Date();
        const nowMelbourne = new Date(
          nowUtc.getTime() + melbourneOffset * 60 * 60 * 1000,
        );
        const nowMelbourneTime = nowMelbourne.toISOString().substring(11, 19);

        connection.stops.forEach((stop) => {
          // Sort the departures by departureTime
          stop.departures.sort((a, b) =>
            a.departureTime.localeCompare(b.departureTime),
          );

          // Only take the future departure
          const futureDepartures = stop.departures.filter(
            (departure) => departure.departureTime > nowMelbourneTime,
          );

          // If there are less than 3 future departures today, take the earliest ones from the list to make up the numbers
          if (futureDepartures.length < 3) {
            const needed = 3 - futureDepartures.length;
            for (let i = 0; i < needed; i++) {
              if (stop.departures[i]) futureDepartures.push(stop.departures[i]);
            }
          }
          stop.departures = futureDepartures.slice(0, 3);

          // Format the time to 'HH:mm AM/PM' in Melbourne Timezone
          stop.departures.forEach((departure) => {
            departure.departureTime = formatTimeToMelbourneAmPm(
              departure.departureTime,
            );
          });
        });

        res.setHeader("Cache-Control", "no-store");
        return res.status(200).json(connection);
      } catch (error: any) {
        console.error(error);

        return res.status(500).json({ error: "Failed to get the connection." });
      }

    default:
      res.setHeader("Allow", ["GET"]);
      return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
