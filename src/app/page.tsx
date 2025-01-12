"use client";

import { useState } from "react";

import ReactQuery from "@/components/parts/ReactQuery";
import { useLessons } from "@/queries/lessons";

export default function Home() {
  const [page, setPage] = useState(1);
  const lessonsQuery = useLessons(page);

  return (
    <main className="bg-blue-400">
      <section className="flex justify-center items-center text-center bg-purple-300 gap-12">
        <div className="flex flex-col items-center gap-4">
          <button onClick={() => setPage(page + 1)}>Add Page</button>
          <h1 className="text-2xl">Page: {page}</h1>
          <h1 className="text-6xl">Teachers:</h1>
          <ReactQuery
            queryResult={lessonsQuery}
            render={(data) =>
              data.map((lesson) => <p key={lesson.id}>{lesson.teacher}</p>)
            }
          />
        </div>
        <div className="flex flex-col items-center gap-4">
          <h1 className="text-6xl">Lesson Status:</h1>
          {lessonsQuery?.data?.map((lesson) => (
            <p key={lesson.id}>{lesson.status}</p>
          ))}
        </div>
      </section>
    </main>
  );
}
