import { allnewDevelopment } from "@/lib/newDevelopments";
import PropertyDetailsWrapper from "./newDevelopmentDetailsWrapper";

export async function generateStaticParams() {
  const ids = await allnewDevelopment(); // <-- your array above
  return ids.map((id) => ({ id })); // [{ id: "6887cc735299ba7500e96960" }, ...]
}

interface PageProps {
  params: { id: string };
}

export default function Page({ params }: PageProps) {
  return <PropertyDetailsWrapper id={params.id} />;
}
