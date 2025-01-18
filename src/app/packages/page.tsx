import { Suspense } from 'react';

import PackagesPage from '@/components/pages/packages';

export default function Lessons() {
  return (
    <main className="overflow-hidden">
      <Suspense>
        <PackagesPage />
      </Suspense>
    </main>
  );
}
