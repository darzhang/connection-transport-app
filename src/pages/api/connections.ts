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

        // Get the user connections
        const user = await prisma.user.findUnique({
          where: { email: session.user.email },
          include: { connections: { include: { stops: true } } },
        });

        // Throw Error if user not found
        if (!user) {
          return res.status(404).json({ error: "User not found" });
        }

        return res.status(200).json(user.connections);
      } catch (error: any) {
        console.error(error);

        return res
          .status(500)
          .json({ error: "Failed to get user's connections." });
      }
    default:
      res.setHeader("Allow", ["GET"]);
      return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
