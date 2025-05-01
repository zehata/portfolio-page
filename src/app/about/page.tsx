import { redirect } from "next/navigation";

const DefaultAboutPage = () => {
  redirect("/about/0");
  return <></>;
};

export default DefaultAboutPage;
