"use client";

import { useState } from "react";

import DataTable from "@/components/parts/DataTable";
import { columns } from "@/components/parts/DataTable/columns";
import { useLessonCount, useLessons } from "@/queries/lessons";
import ReactQuery from "@/components/parts/ReactQuery";
import { Card } from "@/components/ui/card";
import { DATA_LIMIT } from "@/lib/constants/datas";

const LessonsPage = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const lessonsQuery = useLessons(currentPage);
  const { data: lessonCountData } = useLessonCount();

  const handleCurrentPage = (page: number) => {
    setCurrentPage(page);
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

  return (
    <div className="container mx-auto p-2 md:p-10">
      <Card className="p-2 md:p-4">
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
