import AuthLayout from "@/components/layout/AuthLayout";
import ConnectionCard from "@/components/main/ConnectionCard";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import {
  GET_CONNECTIONS_API,
  CREATE_NEW_CONNECTION_PAGE,
} from "@/constants/route";
import useFetch from "@/hooks/useFetch";
import { ConnectionStopsType } from "@/types";
import Link from "next/link";
import { ReactElement, useEffect } from "react";
import { toast } from "sonner";

const HomePage = () => {
  // Fetch the user's connections
  const { loading, data, fetchData } = useFetch<ConnectionStopsType[]>();

  useEffect(() => {
    fetchData({
      url: GET_CONNECTIONS_API,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="flex h-full w-full flex-col items-center ">
      {/* User Connections List */}
      {loading && <Skeleton className="h-24 w-full rounded-md md:w-[350px]" />}
      {data && (
        <div className="flex w-full flex-col items-center gap-4">
          {data.map((connection) => (
            <ConnectionCard
              key={connection.id}
              title={connection.title}
              stops={connection.stops}
            />
          ))}
        </div>
      )}

      {/* Add New Connection Button */}
      <Link href={CREATE_NEW_CONNECTION_PAGE}>
        <Button className="text-accent mt-4">Add New Connection</Button>
      </Link>
    </div>
  );
};

export default HomePage;

HomePage.getLayout = function getLayout(page: ReactElement) {
  return <AuthLayout>{page}</AuthLayout>;
};
