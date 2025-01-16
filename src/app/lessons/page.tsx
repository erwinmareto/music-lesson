import LessonsPage from "@/components/pages/Lessons";
import { Suspense } from "react";

export default function Lessons() {
  return (
    <main className="overflow-hidden">
      <Suspense>
        <LessonsPage />
      </Suspense>
    </main>
  );
}
