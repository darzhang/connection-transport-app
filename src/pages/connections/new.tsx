import AuthLayout from "@/components/layout/AuthLayout";
import ConnectionForm from "@/components/main/ConnectionForm";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { GET_STOPS_API, MAIN_PAGE } from "@/constants/route";
import useFetch from "@/hooks/useFetch";
import { Stop } from "@prisma/client";
import { ArrowLeftIcon } from "lucide-react";
import Link from "next/link";
import { ReactElement, useEffect } from "react";

const NewConnectionPage = () => {
  // Get all the stops
  const { data, loading, fetchData } = useFetch<Stop[]>();

  useEffect(() => {
    fetchData({
      url: GET_STOPS_API,
    });
  }, []);

  return (
    <div className="flex flex-col items-center">
      {/* Title Page and Back Button */}
      <div className="flex w-full flex-row items-center gap-2">
        <Button variant={"ghost"} size={"icon"} asChild>
          <Link href={MAIN_PAGE}>
            <ArrowLeftIcon className="h-7 w-7" />
          </Link>
        </Button>
        <h1 className="mr-14 line-clamp-1 text-2xl font-semibold leading-tight sm:w-full sm:text-3xl">
          {"New Connection"}
        </h1>
      </div>

      {/* New Connection Form */}
      {loading && <Skeleton className="h-48 w-full rounded-md md:w-[350px]" />}
      {data && <ConnectionForm stops={data} />}
    </div>
  );
};
export default NewConnectionPage;

NewConnectionPage.getLayout = function getLayout(page: ReactElement) {
  return <AuthLayout>{page}</AuthLayout>;
};
