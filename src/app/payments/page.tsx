import { Suspense } from 'react';

import PaymentsPage from '@/components/pages/Payments';

export default function Lessons() {
  return (
    <main className="overflow-hidden">
      <Suspense>
        <PaymentsPage />
      </Suspense>
    </main>
  );
}
