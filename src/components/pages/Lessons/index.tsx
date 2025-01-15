"use client";

import { useEffect, useState } from "react";

import DataTable from "@/components/parts/DataTable";
import { columns } from "@/components/parts/DataTable/columns";
import { useLessonCount, useLessons } from "@/queries/lessons";
import ReactQuery from "@/components/parts/ReactQuery";
import { Card } from "@/components/ui/card";
import { DATA_LIMIT } from "@/lib/constants/datas";

const LessonsPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [currentOffset, setCurrentOffset] = useState(0);
  const lessonsQuery = useLessons(currentOffset);
  const { data: lessonCountData } = useLessonCount();

  const handleCurrentPage = (page: number) => {
    setCurrentPage(page);
  };

  const totalPages = Math.ceil(parseInt(lessonCountData || "0") / DATA_LIMIT);

  const hasMorePage = totalPages - currentOffset <= totalPages; // check if offset is bigger than page total

  useEffect(() => {
    // refetch the data every 10th page (fetch 100 data at a time with offset)
    if (currentPage === 9) {
      setCurrentOffset((prevOffset) => prevOffset + 100);
    }
  }, [currentPage]);

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
              handleCurrentPage={handleCurrentPage}
              hasMorePage={hasMorePage}
              offset={currentOffset}
              totalPages={totalPages}
            />
          )}
        />
      </Card>
    </div>
  );
};

export default LessonsPage;
