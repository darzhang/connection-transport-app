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

const DefaultLayout = ({ children }: { children: React.ReactNode }) => {
  const { session, status } = useRequiredAuth();

  const handleLogout = async () => {
    await signOut({
      redirect: false,
      callbackUrl: MAIN_PAGE,
    });
  };

  return (
    status === "authenticated" && (
      <>
        <header className="flex flex-row items-center justify-between">
          {/* Navigation */}
          <nav>
            {/* Logo */}
            <Button variant={"ghost"} asChild>
              <Link
                className="flex flex-row items-start justify-center"
                href={MAIN_PAGE}
              >
                <div className="text-primary-foreground text-lg font-semibold">
                  {"CTA"}
                </div>
                <div className="text-muted-foreground text-xs italic">
                  {"Connection Transport App"}
                </div>
              </Link>
            </Button>
          </nav>

          {/** User Profile */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="relative mr-4 h-14 w-14 p-0 focus-visible:ring-transparent"
              >
                <CircleUserRoundIcon size={32} />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                  {/** Name */}
                  <p className="text-sm font-medium leading-none">
                    {session!.user.name}
                  </p>
                  {/** Email */}
                  <p className="text-muted-foreground text-xs leading-none">
                    {session!.user.email}
                  </p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />

              {/** Logout */}
              <DropdownMenuItem className="p-0">
                <Button onClick={handleLogout}>{"Log out"}</Button>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </header>
        <main>{children}</main>
      </>
    )
  );
};
export default DefaultLayout;
