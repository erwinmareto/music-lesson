'use client';
import { useEffect, useState } from 'react';

import { useRouter, useSearchParams } from 'next/navigation';

import DataTable from '@/components/parts/DataTable';
import { packagesColumns } from '@/components/parts/DataTable/columns';
import DatePicker from '@/components/parts/DatePicker';
import PaginationControls from '@/components/parts/PaginationControls';
import ReactQuery from '@/components/parts/ReactQuery';
import SearchInput from '@/components/parts/SearchInput';
import { Card } from '@/components/ui/card';
import useDebounce from '@/hooks/useDebounce';
import { DATA_LIMIT } from '@/lib/constants/datas';
import { Filters } from '@/lib/filter';
import { combineSearchParams, removeSearchParams } from '@/lib/url';
import { usePackageCount, usePackages } from '@/queries/packages';

const PackagesPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [packageName, setPackageName] = useState('');
  const [instrument, setInstrument] = useState('');
  const [student, setStudent] = useState('');
  const [startDate, setStartDate] = useState<Date>();
  const [endDate, setEndDate] = useState<Date>();

  const lessonFilters: Filters[] = [
    {
      field: 'name',
      query: searchParams.get('packageName'),
      dataType: 'search'
    },
    {
      field: 'start_datetime',
      query: searchParams.get('start'),
      dataType: 'date'
    },
    { field: 'end_datetime', query: searchParams.get('end'), dataType: 'date' },
    {
      field: ['instrument', 'name'],
      query: searchParams.get('instrument'),
      dataType: 'search'
    },
    {
      field: ['student', 'first_name'],
      query: searchParams.get('student'),
      dataType: 'search'
    }
  ];

  const [currentPage, setCurrentPage] = useState(1);
  const packagesQuery = usePackages(currentPage, lessonFilters);
  const { data: packageCountData } = usePackageCount(lessonFilters);

  const handlePackageName = (packageName: string) => {
    setPackageName(packageName);
  };

  const handleInstrument = (instrument: string) => {
    setInstrument(instrument);
  };

  const handleStudent = (student: string) => {
    setStudent(student);
  };

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

  const totalPages = Math.ceil(parseInt(packageCountData || '0') / DATA_LIMIT);
  const hasMorePage = currentPage < totalPages;

  useDebounce(
    () => {
      const newParamsRemoved = removeSearchParams(searchParams, [
        'packageName',
        'instrument',
        'student',
        'start',
        'end'
      ]);

      const paramsObject: Record<string, string> = {};

      if (packageName) {
        paramsObject.packageName = packageName;
      }

      if (instrument) {
        paramsObject.instrument = instrument;
      }

      if (student) {
        paramsObject.student = student;
      }

      if (startDate) {
        paramsObject.start = startDate.toISOString().split('T')[0];
      }

      if (endDate) {
        paramsObject.end = endDate.toISOString().split('T')[0];
      }

      const newSearchParams = combineSearchParams(newParamsRemoved, paramsObject);

      router.push(`?${newSearchParams.toString()}`);
    },
    300,
    [packageName, instrument, student, startDate, endDate]
  );

  useEffect(() => {
    setCurrentPage(1); // reset page to 1 when filters applied
  }, [searchParams]);

  return (
    <div className="container mx-auto p-2 md:p-10">
      <Card className="p-2 md:p-4">
        <div className="flex flex-wrap items-center gap-4 py-4">
          <SearchInput
            id="packageName"
            value={packageName}
            label="Package Name"
            onChange={handlePackageName}
            placeholder="Package Name"
          />

          <SearchInput
            id="instrument"
            value={instrument}
            label="Instrument"
            onChange={handleInstrument}
            placeholder="Instrument"
          />

          <SearchInput id="student" value={student} label="Student" onChange={handleStudent} placeholder="Student" />
          <DatePicker label="Start Date" selectedDate={startDate} onSelectDate={setStartDate} />
          <DatePicker label="End Date" selectedDate={endDate} onSelectDate={setEndDate} />
        </div>
        <ReactQuery
          queryResult={packagesQuery}
          render={(data) => (
            <>
              <DataTable
                // @ts-expect-error
                // the type is already correct (what is written down in the docs) but it is still complaining
                columns={packagesColumns}
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
    </div>
  );
};

export default PackagesPage;
