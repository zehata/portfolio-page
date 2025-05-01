import React from "react";
import Dialog from "@/components/about/Dialog";
import { dialogs } from "@/lib/dialogs";
import DynamicBackground from "@/components/backgrounds/DynamicBackground";

export const generateStaticParams = async () => {
  return Object.keys(dialogs).map((id) => [id]);
};

const MePage = async ({
  params,
}: {
  params: Promise<{
    id: string;
  }>;
}) => {
  const { id } = await params;

  return <>
    <DynamicBackground name="about"/>
    <Dialog id={id} />
  </>;
};

export default MePage;
