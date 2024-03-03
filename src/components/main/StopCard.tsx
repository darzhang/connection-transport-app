import { Departure, Stop } from "@prisma/client";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { getModeIcon } from "@/lib/getModeIcon";

type StopCardProps = {
  stop: Stop & { departures: Departure[] };
};

const StopCard = ({ stop }: StopCardProps) => {
  const modeIcon = getModeIcon(stop.mode);

  const departureStr = stop.departures
    .map((departure) => departure.departureTime)
    .join(", ");

  return (
    <Card className="flex w-full flex-row justify-between p-4 shadow-lg md:w-[550px]">
      <CardHeader className="flex flex-row items-center gap-2 p-0">
        <div className="h-9 w-8">{modeIcon}</div>
        <CardTitle className="flex flex-row justify-between">
          <div className="flex flex-col">
            <div className="text-base">{stop.title}</div>
            <div className="text-muted-foreground text-sm">
              {`Towards ${stop.direction}`}
            </div>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <div className="text-sm">{departureStr}</div>
      </CardContent>
    </Card>
  );
};
export default StopCard;
