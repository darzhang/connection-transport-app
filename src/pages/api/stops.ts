import { prisma } from "@/prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  switch (req.method) {
    case "GET":
      try {
        // User Session Guard
        const session = await getServerSession(req, res, authOptions);
        if (!session) {
          return res.status(401).json({ error: "Unauthorized" });
        }

        // Get all stops
        const stops = await prisma.stop.findMany({});

        // Throw Error if no stops found
        if (stops.length < 1) {
          return res.status(404).json({ error: "No stops found" });
        }

        res.setHeader("Cache-Control", "no-store");
        return res.status(200).json(stops);
      } catch (error: any) {
        console.error(error);

        return res.status(500).json({ error: "Failed to get stops." });
      }
    default:
      res.setHeader("Allow", ["GET"]);
      return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
