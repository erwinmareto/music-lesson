import PackagesPage from "@/components/pages/packages";
import { Suspense } from "react";

export default function Lessons() {
  return (
    <main className="overflow-hidden">
      <Suspense>
        <PackagesPage />
      </Suspense>
    </main>
  );
}
