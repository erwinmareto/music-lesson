import { Suspense } from 'react';

import LessonsPage from '@/components/pages/Lessons';

export default function Lessons() {
  return (
    <main className="overflow-hidden">
      <Suspense>
        <LessonsPage />
      </Suspense>
    </main>
  );
}
