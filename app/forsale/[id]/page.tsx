import { getAllPropertyIds } from "@/lib/properties";
import PropertyDetailsWrapper from "./PropertyDetailsWrapper";

export async function generateStaticParams() {
  const ids = await getAllPropertyIds(); // <-- your array above
  return ids.map((id) => ({ id })); // [{ id: "6887cc735299ba7500e96960" }, ...]
}

interface PageProps {
  params: { id: string };
}

export default function Page({ params }: PageProps) {
  return <PropertyDetailsWrapper id={params.id} />;
}
