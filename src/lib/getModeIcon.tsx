import Bus from "@/assets/icons/Bus";
import Train from "@/assets/icons/Train";
import Tram from "@/assets/icons/Tram";
import { Mode } from "@prisma/client";

export const getModeIcon = (mode: Mode) => {
  switch (mode) {
    case Mode.BUS:
      return <Bus />;
    case Mode.TRAM:
      return <Tram />;
    case Mode.TRAIN:
      return <Train />;
    default:
      return <Bus />;
  }
};
