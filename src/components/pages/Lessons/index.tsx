"use client";

import { useEffect, useState } from "react";

import DataTable from "@/components/parts/DataTable";
import { lessonsColumns } from "@/components/parts/DataTable/columns";
import { useLessonCount, useLessons } from "@/queries/lessons";
import ReactQuery from "@/components/parts/ReactQuery";
import { Card } from "@/components/ui/card";
import { DATA_LIMIT } from "@/lib/constants/datas";
import useDebounce from "@/hooks/useDebounce";
import { combineSearchParams, removeSearchParams } from "@/lib/url";
import { useRouter, useSearchParams } from "next/navigation";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Filters } from "@/lib/filter";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import PaginationControls from "@/components/parts/DataTable/pagination";

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
            <div className="space-y-1">
              <Label htmlFor="teacher">Teacher:</Label>
              <Input
                id="teacher"
                placeholder="Search teacher...."
                value={teacher}
                onChange={(event) => handleTeacher(event.target.value)}
                className="max-w-sm"
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="status">Status:</Label>
            <Select onValueChange={handleStatus} value={status}>
              <SelectTrigger id="status" className="max-w-sm">
                <SelectValue placeholder={status || "Select status"} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="absent">Absent</SelectItem>
                <SelectItem value="attended">Attended</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex flex-col gap-2">
            <Label>Start Date:</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  className={cn(
                    "w-[280px] justify-start text-left font-normal",
                    !startDate && "text-muted-foreground",
                  )}
                >
                  <CalendarIcon />
                  {startDate ? (
                    format(startDate, "PPP")
                  ) : (
                    <span>Pick a date</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={startDate}
                  onSelect={setStartDate}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>
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
