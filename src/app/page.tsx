import { Loading } from "@/components/Loading/Loading";

export default function page() {
  return (
    <main className="flex h-screen items-center justify-center p-24">
      <Loading className="border-primary" />
    </main>
  );
}
