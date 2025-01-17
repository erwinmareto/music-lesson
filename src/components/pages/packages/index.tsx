"use client";

import DataTable from "@/components/parts/DataTable";
import { packagesColumns } from "@/components/parts/DataTable/columns";
import ReactQuery from "@/components/parts/ReactQuery";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import useDebounce from "@/hooks/useDebounce";
import { DATA_LIMIT } from "@/lib/constants/datas";
import { Filters } from "@/lib/filter";
import { combineSearchParams, removeSearchParams } from "@/lib/url";
import { usePackageCount, usePackages } from "@/queries/packages";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

const PackagesPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [packageName, setPackageName] = useState("");
  const [instrument, setInstrument] = useState("");
  const [student, setStudent] = useState("");
  //   const [startTime, setStartTime] = useState("");
  //   const [endTime, setEndTime] = useState("");

  const lessonFilters: Filters[] = [
    { field: "name", query: searchParams.get("packageName") },
    { field: "start_datetime", query: searchParams.get("start") },
    { field: "end_datetime", query: searchParams.get("end") },
    { field: ["instrument", "name"], query: searchParams.get("instrument") },
    { field: ["student", "first_name"], query: searchParams.get("student") },
  ];

  const [currentPage, setCurrentPage] = useState(0);
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

  //   const handleStartTime = (start: string) => {
  //     setStartTime(start);
  //   };

  //   const handleEndTime = (end: string) => {
  //     setEndTime(end);
  //   };

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
  const hasMorePage = currentPage <= totalPages - 1; // reduce page total by 1 because current page start from 0

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

      //   if (startTime) {
      //     paramsObject.start = startTime;
      //   }

      //   if (endTime) {
      //     paramsObject.end = endTime;
      //   }

      const newSearchParams = combineSearchParams(
        newParamsRemoved,
        paramsObject,
      );

      router.push(`?${newSearchParams.toString()}`);
    },
    300,
    [
      packageName,
      instrument,
      student,
      //  startTime, endTime
    ],
  );

  return (
    <div className="container mx-auto p-2 md:p-10">
      <Card className="p-2 md:p-4">
        <div className="flex items-center gap-4 py-4">
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
          {/* <div className="space-y-2">
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
          </div> */}
        </div>
        <ReactQuery
          queryResult={packagesQuery}
          render={(data) => (
            <DataTable
              columns={packagesColumns}
              data={data}
              currentPage={currentPage}
              prevPageHandler={handlePreviousPage}
              nextPageHandler={handleNextPage}
              hasMorePage={hasMorePage}
              totalPages={totalPages}
            />
          )}
        />
      </Card>
    </div>
  );
};

export default PackagesPage;
