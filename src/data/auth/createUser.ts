import { prisma } from "@/prisma/client";
import * as bcrypt from "bcryptjs";

type CreateUserType = {
  name: string;
  email: string;
  password: string;
};

export const createUser = async (data: CreateUserType) => {
  try {
    await prisma.user.create({
      data: {
        name: data.name,
        email: data.email,
        password: bcrypt.hashSync(data.password),
      },
    });
  } catch (error: any) {
    console.error(error);
    if (error.code === "P2002") {
      throw new Error("Email has been used.");
    }
    throw new Error("Failed to create user.");
  }
};
