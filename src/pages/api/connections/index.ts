import { prisma } from "@/prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

type CreateConnectionBodyType = {
  title: string;
  stops: { id: string }[];
};

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
        // Get the user connections
        const user = await prisma.user.findUnique({
          where: { email: session.user.email },
          include: { connections: { include: { stops: true } } },
        });

        // Throw Error if user not found
        if (!user) {
          return res.status(404).json({ error: "User not found" });
        }

        res.setHeader("Cache-Control", "no-store");
        return res.status(200).json(user.connections);
      } catch (error: any) {
        console.error(error);

        return res
          .status(500)
          .json({ error: "Failed to get user's connections." });
      }

    case "POST":
      try {
        // Create a new connection
        const { title, stops }: CreateConnectionBodyType = req.body;
        const newConnection = await prisma.connection.create({
          data: {
            title,
            user: { connect: { email: session.user.email } },
            stops: { connect: stops.map((stop) => ({ id: Number(stop.id) })) },
          },
        });

        // Throw Error if new connection not created
        if (!newConnection) {
          return res
            .status(400)
            .json({ error: "Failed to create a new connection." });
        }

        return res.status(201).json(newConnection);
      } catch (error: any) {
        console.error(error);

        // Throw Duplicate Error
        if (error.code === "P2002") {
          return res
            .status(400)
            .json({ error: "Connection with the same title already exists." });
        }

        return res
          .status(500)
          .json({ error: "Failed to create a new connection." });
      }

    default:
      res.setHeader("Allow", ["GET", "POST"]);
      return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
