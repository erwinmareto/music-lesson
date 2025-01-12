"use client";

import ReactQuery from "@/components/parts/ReactQuery";
import { useUsers } from "@/queries/user";

export default function Home() {
  const usersQuery = useUsers();
  return (
    <main className="bg-blue-400">
      <section className="flex justify-center items-center text-center bg-purple-300 gap-12">
        <div className="flex flex-col items-center gap-4">
          <h1 className="text-6xl">Names:</h1>
          <ReactQuery
            queryResult={usersQuery}
            render={(data) =>
              data.map((user) => <p key={user.id}>{user.name}</p>)
            }
          />
        </div>
        <div className="flex flex-col items-center gap-4">
          <h1 className="text-6xl">Emails:</h1>
          {usersQuery.data?.map((user) => <p key={user.id}>{user.email}</p>)}
        </div>
      </section>
    </main>
  );
}
