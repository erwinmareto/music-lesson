import { Card } from "@/components/ui/card";
import { BookAudio, CircleDollarSign, Music2, Package } from "lucide-react";
const HomePage = () => {
  return (
    <section className="flex flex-col gap-4 p-4">
      <h1 className="font-semibold text-4xl">Overview</h1>
      <section className="grid grid-cols-12 gap-4">
        <Card className="grid col-span-3 items-end gap-2 p-4">
          <div className="w-10 h-10 flex justify-center items-center bg-slate-200 rounded-lg">
            <Music2 />
          </div>
          <h2 className="text-4xl font-semibold">12</h2>
          <p className="text-xl">Instruments</p>
        </Card>
        <Card className="grid col-span-3 items-end gap-2 p-4">
          <div className="w-10 h-10 flex justify-center items-center bg-slate-200 rounded-lg">
            <BookAudio />
          </div>
          <h2 className="text-4xl font-semibold">12</h2>
          <p className="text-xl">Lessons</p>
        </Card>
        <Card className="grid col-span-3 items-end gap-2 p-4">
          <div className="w-10 h-10 flex justify-center items-center bg-slate-200 rounded-lg">
            <Package />
          </div>
          <h2 className="text-4xl font-semibold">12</h2>
          <p className="text-xl">Packages</p>
        </Card>
        <Card className="grid col-span-3 items-end gap-2 p-4">
          <div className="w-10 h-10 flex justify-center items-center bg-slate-200 rounded-lg">
            <CircleDollarSign />
          </div>
          <h2 className="text-4xl font-semibold">12</h2>
          <p className="text-xl">Payments</p>
        </Card>
      </section>
    </section>
  );
};

export default HomePage;
