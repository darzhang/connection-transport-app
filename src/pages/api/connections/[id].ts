import { prisma } from "@/prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

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
