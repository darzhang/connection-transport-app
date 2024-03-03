import RegistrationForm from "@/components/auth/RegistrationForm";
import NonAuthLayout from "@/components/layout/NonAuthLayout";
import { LOGIN_PAGE, MAIN_PAGE } from "@/constants/route";
import { authOptions } from "@/lib/auth";
import { GetServerSidePropsContext } from "next";
import { getServerSession } from "next-auth";
import Link from "next/link";
import { ReactElement } from "react";

const RegisterPage = () => {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center">
      <div className="flex flex-col space-y-2 text-center">
        <div className="text-2xl font-semibold tracking-tight">
          {"Get started with Connection Transport App"}
        </div>
        <div className="text-muted-foreground text-sm">
          {"Enter your details to get started"}
        </div>
      </div>

      <RegistrationForm />
      <div className="text-muted-foreground px-8 text-sm">
        {"Already Registered? "}
        <Link href={LOGIN_PAGE}>
          <span className="hover:text-primary underline underline-offset-4">
            {"Login"}
          </span>
        </Link>
      </div>
    </div>
  );
};
export default RegisterPage;

RegisterPage.getLayout = function getLayout(page: ReactElement) {
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
