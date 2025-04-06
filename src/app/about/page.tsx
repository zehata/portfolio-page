import { redirect } from "next/navigation";

export const DefaultAboutPage = () => {
  redirect("/about/0");
  return <></>;
};

export default DefaultAboutPage;
