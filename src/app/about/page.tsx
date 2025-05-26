import { redirect } from "next/navigation";

const DefaultAboutPage = () => {
  redirect("/about/hello");
  return <></>;
};

export default DefaultAboutPage;
