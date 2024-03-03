import AuthLayout from "@/components/layout/AuthLayout";
import { ReactElement } from "react";

const HomePage = () => {
  return <div>Home Page</div>;
};

export default HomePage;

HomePage.getLayout = function getLayout(page: ReactElement) {
  return <AuthLayout>{page}</AuthLayout>;
};
