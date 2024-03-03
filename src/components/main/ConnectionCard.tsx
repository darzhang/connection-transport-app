import { Stop } from "@prisma/client";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { cn } from "@/lib/utils";
import { RouteIcon } from "lucide-react";

type ConnectionCardProps = {
  title: string;
  stops: Stop[];
};

const ConnectionCard = ({ title, stops }: ConnectionCardProps) => {
  return (
    <Card className="hover:bg-accent flex w-full flex-col p-4 shadow-lg hover:cursor-pointer md:w-[350px]">
      <CardHeader className="mb-4 flex flex-row items-center gap-2 p-0">
        <RouteIcon size={24} />
        <CardTitle className="text-lg font-semibold">{title}</CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <div className="text-sm">{`Number of Stops: ${stops.length}`}</div>
      </CardContent>
    </Card>
  );
};
export default ConnectionCard;
