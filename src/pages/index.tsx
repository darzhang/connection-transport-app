import AuthLayout from "@/components/layout/AuthLayout";
import ConnectionCard from "@/components/main/ConnectionCard";
import { Skeleton } from "@/components/ui/skeleton";
import { CONNECTIONS_API } from "@/constants/route";
import useFetch from "@/hooks/useFetch";
import { ConnectionStopsType } from "@/types";
import Link from "next/link";
import { ReactElement, useEffect } from "react";
import { toast } from "sonner";

const HomePage = () => {
  // Fetch the user's connections
  const { loading, data, error, fetchData } = useFetch<ConnectionStopsType[]>({
    url: CONNECTIONS_API,
  });

  console.log("data", data);

  useEffect(() => {
    fetchData();
  }, []);

  if (error) {
    toast.error("Something went wrong", {
      description: error,
    });
  }

  return (
    <div className="flex h-full w-full flex-col items-center px-4 py-4 md:py-10">
      {/* User Connections List */}
      {loading && <Skeleton className="h-24 w-full rounded-md md:w-[350px]" />}
      {data && (
        <div className="flex w-full flex-col items-center">
          {data.map((connection) => (
            <ConnectionCard
              key={connection.id}
              title={connection.title}
              stops={connection.stops}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default HomePage;

HomePage.getLayout = function getLayout(page: ReactElement) {
  return <AuthLayout>{page}</AuthLayout>;
};
