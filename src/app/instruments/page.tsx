import { Suspense } from 'react';

import InstrumentsPage from '@/components/pages/instruments';

export default function Instruments() {
  return (
    <main className="overflow-hidden">
      <Suspense>
        <InstrumentsPage />
      </Suspense>
    </main>
  );
}
