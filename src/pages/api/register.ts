import { prisma } from "@/prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";
import * as bcrypt from "bcryptjs";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  switch (req.method) {
    case "POST":
      try {
        const { name, email, password } = req.body;

        // Create user
        await prisma.user.create({
          data: {
            name: name,
            email: email,
            password: bcrypt.hashSync(password),
          },
        });

        // Return success message if there are no errors
        return res.status(201).json({ message: "User created successfully" });
      } catch (error: any) {
        console.error(error);

        // Check if email already exists
        if (error.code === "P2002") {
          return res.status(409).json({ error: "Email has been used." });
        }

        return res.status(500).json({ error: "Failed to create user." });
      }

    default:
      res.setHeader("Allow", ["POST"]);
      return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
