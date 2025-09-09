"use client"; // this is a client component

import dynamic from "next/dynamic";

const PropertyDetailsPage = dynamic(
  () => import("@/components/property-details-page"),
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

export default function PropertyDetailsWrapper({ id }: Props) {
  return <PropertyDetailsPage id={id} />;
}
