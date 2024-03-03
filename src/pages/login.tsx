import LoginForm from "@/components/auth/LoginForm";
import Link from "next/link";
import { MAIN_PAGE, REGISTER_PAGE } from "@/constants/route";
import { GetServerSidePropsContext } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { ReactElement } from "react";
import NonAuthLayout from "@/components/layout/NonAuthLayout";

const LoginPage = () => {
  return (
    <main className="flex h-full w-full flex-col items-center justify-center">
      <div className="flex flex-col space-y-2 text-center">
        <div className="text-2xl font-semibold tracking-tight">
          {"Welcome Back"}
        </div>
        <div className="text-muted-foreground text-sm">
          {"Enter your email and password to login"}
        </div>
      </div>

      <LoginForm />
      <div className="text-muted-foreground px-8 text-sm">
        {"Don't have an account? "}
        <Link href={REGISTER_PAGE}>
          <span className="hover:text-primary underline underline-offset-4">
            {"Register"}
          </span>
        </Link>
      </div>
    </main>
  );
};
export default LoginPage;

LoginPage.getLayout = function getLayout(page: ReactElement) {
  return <NonAuthLayout>{page}</NonAuthLayout>;
};

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session = await getServerSession(context.req, context.res, authOptions);

  // If the user is already logged in, redirect to the main page
  if (session) {
    return {
      redirect: {
        destination: MAIN_PAGE,
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
}
