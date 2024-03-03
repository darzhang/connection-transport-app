import Link from "next/link";
import { Button } from "../ui/button";
import { MAIN_PAGE } from "@/constants/route";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { CircleUserRoundIcon } from "lucide-react";
import { signOut } from "next-auth/react";
import { useRequiredAuth } from "@/hooks/useRequiredAuth";
import Image from "next/image";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  const { session, status } = useRequiredAuth();

  const handleLogout = async () => {
    await signOut({
      redirect: false,
      callbackUrl: MAIN_PAGE,
    });
  };

  return (
    status === "authenticated" && (
      <div className="flex h-dvh w-full flex-col">
        <header className="flex flex-row items-center justify-between border-b p-2 shadow-md">
          {/* Navigation */}
          <nav>
            {/* Logo */}
            <Link href={MAIN_PAGE}>
              <div className="relative h-12 w-12">
                <Image
                  src={"/icon.png"}
                  alt={"Connection Transport App Logo"}
                  fill
                  style={{ objectFit: "cover" }}
                  sizes="100%"
                />
              </div>
            </Link>
          </nav>

          {/** User Profile */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="relative h-14 w-14 p-0 focus-visible:ring-transparent"
              >
                <CircleUserRoundIcon size={32} />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56 p-2" align="end" forceMount>
              <DropdownMenuLabel className="mb-4 px-0 py-0 font-normal">
                <div className="flex flex-col space-y-1">
                  {/** Name */}
                  <p className="text-sm font-medium leading-none">
                    {session!.user.name}
                  </p>
                  {/** Email */}
                  <p className="text-xs leading-none text-muted-foreground">
                    {session!.user.email}
                  </p>
                </div>
              </DropdownMenuLabel>

              {/** Logout */}
              <DropdownMenuItem className="h-10 p-0">
                <Button
                  onClick={handleLogout}
                  className="h-full w-full"
                  size={"sm"}
                >
                  {"Log out"}
                </Button>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </header>
        <main className="flex-1 px-4 py-4 md:py-10 ">{children}</main>
      </div>
    )
  );
};
export default AuthLayout;
