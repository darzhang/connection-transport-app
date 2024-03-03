import * as bcrypt from "bcryptjs";
import { prisma } from "./client";
import { DataSet } from "./seedData";

const pickRandomItems = <T extends unknown>(arr: T[], n: number): T[] => {
  const shuffled = Array.from(arr).sort(() => 0.5 - Math.random());
  return shuffled.slice(0, n);
};

const seedUsers = async () => {
  try {
    await prisma.user.create({
      data: {
        name: "Test User",
        email: "test@gmail.com",
        password: bcrypt.hashSync(process.env.SEED_USER_PASSWORD ?? "password"),
      },
    });

    console.log("Users seeded");
  } catch (error) {
    console.error(error);
  }
};

const seedStops = async () => {
  try {
    const stopsData = DataSet.stops.map((stop) => {
      return {
        id: stop.id,
        mode: stop.mode,
        title: stop.title,
        direction: stop.direction,
      };
    });

    await prisma.stop.createMany({
      data: stopsData,
    });

    console.log("Stops seeded");
  } catch (error) {
    console.error(error);
  }
};

const seedDepartureTimes = async () => {
  try {
    const departureTimesData = [] as {
      departureTime: string;
      stopId: number;
    }[];

    const stops = await prisma.stop.findMany();

    // Seed departure times for each stop
    for (const stop of stops) {
      const depTimes = pickRandomItems(DataSet.departures, 70).map((time) => ({
        departureTime: time,
        stopId: stop.id,
      }));
      departureTimesData.push(...depTimes);
    }

    await prisma.departure.createMany({
      data: departureTimesData,
    });

    console.log("Departure times seeded");
  } catch (error) {
    console.error(error);
  }
};

const seedConnections = async () => {
  try {
    // Seed connections
    const stops = await prisma.stop.findMany();

    // Pick 3 random stops to use for the connection
    const choosenStops = pickRandomItems(stops, 3).map((stop) => ({
      id: stop.id,
    }));

    const user = await prisma.user.findFirst();

    if (!user) {
      throw new Error("No User Found.");
    }

    await prisma.connection.create({
      data: {
        title: "Test Connection",
        userId: user.id,
        stops: {
          connect: choosenStops,
        },
      },
    });

    console.log("Connections seeded");
  } catch (error) {
    console.error(error);
  }
};

async function main() {
  // Clear the database
  await prisma.departure.deleteMany();
  await prisma.stop.deleteMany();
  await prisma.connection.deleteMany();
  await prisma.user.deleteMany();

  // Seed the database
  await seedUsers();
  await seedStops();
  await seedDepartureTimes();
  await seedConnections();
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
