import AuthLayout from "@/components/layout/AuthLayout";
import ConnectionCard from "@/components/main/ConnectionCard";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import {
  GET_CONNECTIONS_API,
  CREATE_NEW_CONNECTION_PAGE,
  CONNECTIONS_PAGE,
} from "@/constants/route";
import useFetch from "@/hooks/useFetch";
import { ConnWithStops } from "@/types";
import Link from "next/link";
import { ReactElement, useEffect } from "react";

const HomePage = () => {
  // Fetch the user's connections
  const { loading, data, fetchData } = useFetch<ConnWithStops[]>();

  useEffect(() => {
    fetchData({
      url: GET_CONNECTIONS_API,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="flex h-full w-full flex-col items-center">
      {/* User Connections List */}
      {loading && <Skeleton className="h-24 w-full rounded-md md:w-[350px]" />}
      {data && (
        <div className="flex w-full flex-col items-center gap-4">
          {data.map((connection) => (
            <Link
              href={`${CONNECTIONS_PAGE}/${connection.id}`}
              key={connection.id}
              className="w-full md:w-[350px]"
            >
              <ConnectionCard
                title={connection.title}
                stops={connection.stops}
              />
            </Link>
          ))}
        </div>
      )}

      {/* Add New Connection Button */}
      <Link href={CREATE_NEW_CONNECTION_PAGE}>
        <Button className="mt-4 text-accent">Add New Connection</Button>
      </Link>
    </div>
  );
};

export default HomePage;

HomePage.getLayout = function getLayout(page: ReactElement) {
  return <AuthLayout>{page}</AuthLayout>;
};
