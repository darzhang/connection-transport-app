import AuthLayout from "@/components/layout/AuthLayout";
import StopCard from "@/components/main/StopCard";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { GET_CONNECTIONS_API, MAIN_PAGE } from "@/constants/route";
import useFetch from "@/hooks/useFetch";
import { ConnStopsDeps } from "@/types";
import { ArrowLeftIcon } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/router";
import { ReactElement, useEffect } from "react";

const ConnectionIdPage = () => {
  const router = useRouter();
  const { id } = router.query;

  const { data, loading, fetchData } = useFetch<ConnStopsDeps>();

  useEffect(() => {
    if (id) {
      fetchData({ url: `${GET_CONNECTIONS_API}/${id}` });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  return (
    <div>
      {/* Title Page and Back Button */}
      <div className="mb-4 flex w-full flex-row items-center gap-2">
        <Button variant={"ghost"} size={"icon"} asChild>
          <Link href={MAIN_PAGE}>
            <ArrowLeftIcon className="h-7 w-7" />
          </Link>
        </Button>
        <h1 className="mr-14 line-clamp-1 text-2xl font-semibold leading-tight sm:w-full sm:text-3xl">
          {data?.title ?? "Connection"}
        </h1>
      </div>

      {/* Stop List */}
      {loading && <Skeleton className="h-48 w-full rounded-md md:w-[350px]" />}
      {data && (
        <div className="flex flex-col items-center gap-4">
          {data.stops.map((stop) => (
            <StopCard key={stop.id} stop={stop} />
          ))}
        </div>
      )}
    </div>
  );
};
export default ConnectionIdPage;

ConnectionIdPage.getLayout = function getLayout(page: ReactElement) {
  return <AuthLayout>{page}</AuthLayout>;
};