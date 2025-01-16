"use client";

import { useState } from "react";

import DataTable from "@/components/parts/DataTable";
import { columns } from "@/components/parts/DataTable/columns";
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

const LessonsPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [status, setStatus] = useState("");
  const [teacher, setTeacher] = useState("");
  const lessonFilters: Filters[] = [
    { field: "status", query: searchParams.get("status") },
    { field: ["teacher", "first_name"], query: searchParams.get("teacher") },
  ];
  const [currentPage, setCurrentPage] = useState(0);
  const lessonsQuery = useLessons(currentPage, lessonFilters);
  const { data: lessonCountData } = useLessonCount();

  const handleCurrentPage = (page: number) => {
    setCurrentPage(page);
  };

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
  const hasMorePage = DATA_LIMIT * currentPage < totalPages;

  useDebounce(
    () => {
      const newParamsRemoved = removeSearchParams(searchParams, [
        "status",
        "teacher",
      ]);

      const paramsObject: Record<string, string> = {};

      if (teacher.length) {
        paramsObject.teacher = teacher;
      }

      if (status) {
        paramsObject.status = status;
      }

      const newSearchParams = combineSearchParams(
        newParamsRemoved,
        paramsObject,
      );

      router.push(`?${newSearchParams.toString()}`);
    },
    300,
    [status, teacher],
  );

  return (
    <div className="container mx-auto p-2 md:p-10">
      <Card className="p-2 md:p-4">
        <div className="flex items-center gap-4 py-4">
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
        </div>
        <ReactQuery
          queryResult={lessonsQuery}
          render={(data) => (
            <DataTable
              columns={columns}
              data={data}
              currentPage={currentPage}
              pageHandler={handleCurrentPage}
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

export default LessonsPage;
