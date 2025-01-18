"use client";

import { useEffect, useState } from "react";

import DataTable from "@/components/parts/DataTable";
import { lessonsColumns } from "@/components/parts/DataTable/columns";
import { useLessonCount, useLessons } from "@/queries/lessons";
import ReactQuery from "@/components/parts/ReactQuery";
import { Card } from "@/components/ui/card";
import { DATA_LIMIT, LESSON_STATUS } from "@/lib/constants/datas";
import useDebounce from "@/hooks/useDebounce";
import { combineSearchParams, removeSearchParams } from "@/lib/url";
import { useRouter, useSearchParams } from "next/navigation";
import { Filters } from "@/lib/filter";
import PaginationControls from "@/components/parts/PaginationControls";
import SearchInput from "@/components/parts/SearchInput";
import DatePicker from "@/components/parts/DatePicker";
import SelectInput from "@/components/parts/SelectInput";

const LessonsPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [status, setStatus] = useState("");
  const [teacher, setTeacher] = useState("");
  const [startDate, setStartDate] = useState<Date>();

  const lessonFilters: Filters[] = [
    { field: "status", query: searchParams.get("status"), dataType: "search" },
    {
      field: ["teacher", "first_name"],
      query: searchParams.get("teacher"),
      dataType: "search",
    },
    {
      field: "start_datetime",
      query: searchParams.get("start"),
      dataType: "date",
    },
  ];
  const [currentPage, setCurrentPage] = useState(1);
  const lessonsQuery = useLessons(currentPage, lessonFilters);
  const { data: lessonCountData } = useLessonCount(lessonFilters);

  const handleStatus = (status: string) => {
    setStatus(status);
  };

  const handleTeacher = (teacher: string) => {
    setTeacher(teacher);
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

  const totalPages = Math.ceil(parseInt(lessonCountData || "0") / DATA_LIMIT);
  const hasMorePage = currentPage < totalPages;

  useDebounce(
    () => {
      const newParamsRemoved = removeSearchParams(searchParams, [
        "status",
        "teacher",
        "start",
      ]);

      const paramsObject: Record<string, string> = {};

      if (teacher.length) {
        paramsObject.teacher = teacher;
      }

      if (status) {
        paramsObject.status = status;
      }

      if (startDate) {
        paramsObject.start = startDate.toISOString().split("T")[0];
      }

      const newSearchParams = combineSearchParams(
        newParamsRemoved,
        paramsObject,
      );

      router.push(`?${newSearchParams.toString()}`);
    },
    300,
    [status, teacher, startDate],
  );

  useEffect(() => {
    setCurrentPage(1); // reset page to 1 when filters applied
  }, [searchParams]);

  return (
    <div className="container mx-auto p-2 md:p-10">
      <Card className="p-2 md:p-4">
        <div className="flex flex-wrap items-center gap-4 py-4">
          <div className="flex flex-col">
            <SearchInput
              id="teacher"
              label="Teacher"
              placeholder="Search teacher...."
              value={teacher}
              onChange={handleTeacher}
            />
          </div>
          <SelectInput
            id="status"
            label="Status"
            options={LESSON_STATUS}
            value={status}
            onChange={handleStatus}
          />
          <DatePicker
            selectedDate={startDate}
            onSelectDate={setStartDate}
            label="Start Date"
          />
        </div>
        <ReactQuery
          queryResult={lessonsQuery}
          render={(data) => (
            <>
              <DataTable
                // @ts-expect-error the type is already correct (what is written down in the docs) but it is still complaining
                columns={lessonsColumns}
                data={data}
                currentPage={currentPage}
                prevPageHandler={handlePreviousPage}
                nextPageHandler={handleNextPage}
                hasMorePage={hasMorePage}
                totalPages={totalPages}
              />
              <PaginationControls
                currentPage={currentPage}
                handlePreviousPage={handlePreviousPage}
                handleNextPage={handleNextPage}
                hasMorePage={hasMorePage}
                totalPages={totalPages}
              />
            </>
          )}
        />
      </Card>
    </div>
  );
};

export default LessonsPage;
