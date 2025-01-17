"use client";

import DataTable from "@/components/parts/DataTable";
import { packagesColumns } from "@/components/parts/DataTable/columns";
import PaginationControls from "@/components/parts/DataTable/pagination";
import ReactQuery from "@/components/parts/ReactQuery";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import useDebounce from "@/hooks/useDebounce";
import { DATA_LIMIT } from "@/lib/constants/datas";
import { Filters } from "@/lib/filter";
import { combineSearchParams, removeSearchParams } from "@/lib/url";
import { cn } from "@/lib/utils";
import { usePackageCount, usePackages } from "@/queries/packages";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const PackagesPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [packageName, setPackageName] = useState("");
  const [instrument, setInstrument] = useState("");
  const [student, setStudent] = useState("");
  const [startDate, setStartDate] = useState<Date>();
  const [endDate, setEndDate] = useState<Date>();

  const lessonFilters: Filters[] = [
    {
      field: "name",
      query: searchParams.get("packageName"),
      dataType: "search",
    },
    {
      field: "start_datetime",
      query: searchParams.get("start"),
      dataType: "date",
    },
    { field: "end_datetime", query: searchParams.get("end"), dataType: "date" },
    {
      field: ["instrument", "name"],
      query: searchParams.get("instrument"),
      dataType: "search",
    },
    {
      field: ["student", "first_name"],
      query: searchParams.get("student"),
      dataType: "search",
    },
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

  const totalPages = Math.ceil(parseInt(packageCountData || "0") / DATA_LIMIT);
  const hasMorePage = currentPage < totalPages;

  useDebounce(
    () => {
      const newParamsRemoved = removeSearchParams(searchParams, [
        "packageName",
        "instrument",
        "student",
        "start",
        "end",
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
        paramsObject.start = startDate.toISOString().split("T")[0];
      }

      if (endDate) {
        paramsObject.end = endDate.toISOString().split("T")[0];
      }

      const newSearchParams = combineSearchParams(
        newParamsRemoved,
        paramsObject,
      );

      router.push(`?${newSearchParams.toString()}`);
    },
    300,
    [packageName, instrument, student, startDate, endDate],
  );

  useEffect(() => {
    setCurrentPage(1); // reset page to 1 when filters applied
  }, [searchParams]);

  return (
    <div className="container mx-auto p-2 md:p-10">
      <Card className="p-2 md:p-4">
        <div className="flex flex-wrap items-center gap-4 py-4">
          <div className="space-y-1">
            <Label htmlFor="package">Package:</Label>
            <Input
              id="package"
              placeholder="Search package...."
              value={packageName}
              onChange={(event) => handlePackageName(event.target.value)}
              className="max-w-sm"
            />
          </div>
          <div className="space-y-1">
            <Label htmlFor="instrument">Instrument:</Label>
            <Input
              id="instrument"
              placeholder="Search instrument...."
              value={instrument}
              onChange={(event) => handleInstrument(event.target.value)}
              className="max-w-sm"
            />
          </div>
          <div className="space-y-1">
            <Label htmlFor="student">Student:</Label>
            <Input
              id="student"
              placeholder="Search student...."
              value={student}
              onChange={(event) => handleStudent(event.target.value)}
              className="max-w-sm"
            />
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

          <div className="flex flex-col gap-2">
            <Label>End Date:</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  className={cn(
                    "w-[280px] justify-start text-left font-normal",
                    !endDate && "text-muted-foreground",
                  )}
                >
                  <CalendarIcon />
                  {endDate ? format(endDate, "PPP") : <span>Pick a date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={endDate}
                  onSelect={setEndDate}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>
        </div>
        <ReactQuery
          queryResult={packagesQuery}
          render={(data) => (
            <>
              <DataTable
                // @ts-expect-error the type is already correct (what is written down in the docs) but it is still complaining
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
