import Image from "next/image";
import React from "react";

const NonAuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex h-dvh w-full flex-col">
      <header className="flex flex-row items-center justify-between border-b p-2 shadow-md">
        {/* Navigation */}
        <nav>
          {/* Logo */}
          <div className="relative h-12 w-12">
            <Image
              src={"/icon.png"}
              alt={"Connection Transport App Logo"}
              fill
              style={{ objectFit: "cover" }}
              sizes="100%"
            />
          </div>
        </nav>
      </header>
      <main className="flex-1">{children}</main>
    </div>
  );
};
export default NonAuthLayout;
