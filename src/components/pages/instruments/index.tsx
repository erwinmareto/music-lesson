'use client';

import { useState } from 'react';

import { useRouter, useSearchParams } from 'next/navigation';

import InstrumentRatioChart from '@/components/parts/Charts/InstrumentRatioChart';
import DataTable from '@/components/parts/DataTable';
import { instrumentsColumns } from '@/components/parts/DataTable/columns';
import PaginationControls from '@/components/parts/PaginationControls';
import ReactQuery from '@/components/parts/ReactQuery';
import SearchInput from '@/components/parts/SearchInput';
import { Card } from '@/components/ui/card';
import useDebounce from '@/hooks/useDebounce';
import { DATA_LIMIT } from '@/lib/constants/datas';
import { Filters } from '@/lib/filter';
import { combineSearchParams, removeSearchParams } from '@/lib/url';
import { useInstrumentCount, useInstruments } from '@/queries/instruments';

const InstrumentsPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [instrumentName, setInstrumentName] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  const instrumentsFilters: Filters[] = [
    {
      field: 'name',
      query: searchParams.get('instrumentName'),
      dataType: 'search'
    }
  ];
  const instrumentsQuery = useInstruments(currentPage, instrumentsFilters);
  const { data: instrumentCountData } = useInstrumentCount();

  const handleNextPage = () => {
    if (hasMorePage) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 0) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  const handleInstrumentName = (instrumentName: string) => {
    setInstrumentName(instrumentName);
  };

  const totalPages = Math.ceil(parseInt(instrumentCountData || '0') / DATA_LIMIT);
  const hasMorePage = currentPage < totalPages;

  useDebounce(
    () => {
      const newParamsRemoved = removeSearchParams(searchParams, ['instrumentName']);

      const paramsObject: Record<string, string> = {};

      if (instrumentName.length) {
        paramsObject.instrumentName = instrumentName;
      }

      const newSearchParams = combineSearchParams(newParamsRemoved, paramsObject);

      router.push(`?${newSearchParams.toString()}`);
    },
    300,
    [instrumentName]
  );

  return (
    <div className="container mx-auto p-2 md:p-10">
      <Card className="p-2 md:p-4">
        <div className="flex flex-wrap items-center gap-4 py-4">
          <div className="flex flex-col">
            <SearchInput
              id="instrumentName"
              label="Instrument Name"
              placeholder="Search instrument...."
              value={instrumentName}
              onChange={handleInstrumentName}
            />
          </div>
        </div>
        <ReactQuery
          queryResult={instrumentsQuery}
          render={(data) => (
            <>
              <DataTable
                // @ts-expect-error
                // the type is already correct (what is written down in the docs) but it is still complaining
                columns={instrumentsColumns}
                data={data}
                currentPage={currentPage}
                prevPageHandler={handlePreviousPage}
                nextPageHandler={handleNextPage}
                hasMorePage={hasMorePage}
                totalPages={totalPages}
              />
              <PaginationControls
                currentPage={currentPage}
                totalPages={totalPages}
                hasMorePage={hasMorePage}
                handleNextPage={handleNextPage}
                handlePreviousPage={handlePreviousPage}
              />
            </>
          )}
        />
      </Card>

      <InstrumentRatioChart />
    </div>
  );
};

export default InstrumentsPage;
