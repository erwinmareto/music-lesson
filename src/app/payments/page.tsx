import PaymentsPage from "@/components/pages/Payments";
import { Suspense } from "react";

export default function Lessons() {
  return (
    <main className="overflow-hidden">
      <Suspense>
        <PaymentsPage />
      </Suspense>
    </main>
  );
}
