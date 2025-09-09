"use client"; // this is a client component

import dynamic from "next/dynamic";

const NewDevelopmentDetailsPage = dynamic(
  () => import("@/components/new-development-detail"),
  {
    ssr: false,
    loading: () => (
      <div className="min-h-screen flex justify-center items-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
      </div>
    ),
  }
);

interface Props {
  id: string;
}

export default function NewDevelopmentDetailsWrapper({ id }: Props) {
  return <NewDevelopmentDetailsPage id={id} />;
}
