import React from "react";
import Dialog from "@/components/about/Dialog";
import { dialogs } from "@/lib/dialogs";

export const generateStaticParams = async () => {
  return Object.keys(dialogs).map((id) => ({ id: [id] }));
};

const AboutPage = async ({
  params,
}: {
  params: Promise<{
    id: string;
  }>;
}) => {
  const { id } = await params;

  return <Dialog id={id} />;
};

export default AboutPage;
