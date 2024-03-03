import DefaultLayout from "@/components/layout/DefaultLayout";
import { ReactElement } from "react";

const HomePage = () => {
  return <div>Home Page</div>;
};

export default HomePage;

HomePage.getLayout = function getLayout(page: ReactElement) {
  return <DefaultLayout>{page}</DefaultLayout>;
};
